const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');
const otpModel = require('../models/otpModel');
const refreshTokenModel = require('../models/refreshTokenModel');
const emailService = require('../services/emailService');
const whatsappService = require('../services/whatsappService');
const { buatAccessToken, rahasiaJwt } = require('../middlewares/authMiddleware');
const { bungkus } = require('../utils/asyncHandler');
const { gagal, wajibIsi, normalisasiWa } = require('../utils/validasi');

const MAKS_PERCOBAAN = Number(process.env.OTP_MAX_PERCOBAAN) || 5;
const MENIT_LOGIN = Number(process.env.OTP_LOGIN_EXPIRES_MINUTES) || 5;
const MENIT_RESET = Number(process.env.OTP_RESET_EXPIRES_MINUTES) || 15;
const HARI_REFRESH = Number(process.env.REFRESH_TOKEN_DAYS) || 7;
const JEDA_KIRIM_ULANG_DETIK = 60;

function buatKodeOtp() {
  return String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
}

function tambahMenit(menit) {
  return new Date(Date.now() + menit * 60_000);
}

function tambahHari(hari) {
  return new Date(Date.now() + hari * 86_400_000);
}

function buatRefreshToken() {
  return crypto.randomBytes(48).toString('hex');
}

function identifierLogin(body) {
  const mentah = String(body.identifier ?? body.email ?? body.no_wa ?? '').trim();
  if (!mentah) return '';
  return mentah.includes('@') ? mentah.toLowerCase() : normalisasiWa(mentah);
}

function validasiEmail(email) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) gagal(400, 'Format email tidak valid.');
}

async function buatDanKirimOtp(user, tujuan, jalur) {
  const menit = tujuan === 'RESET_PASSWORD' ? MENIT_RESET : MENIT_LOGIN;
  const kode = buatKodeOtp();
  const kodeHash = await bcrypt.hash(kode, 10);
  const expiresAt = tambahMenit(menit);

  await otpModel.hapusUntuk(user.id, tujuan);
  await otpModel.buat({
    userId: user.id,
    kodeHash,
    tujuan,
    jalur,
    expiresAt,
  });

  const layanan = jalur === 'WHATSAPP' ? whatsappService : emailService;
  const alamat = jalur === 'WHATSAPP' ? user.no_wa : user.email;
  const pengiriman = await layanan.kirimOtp({
    tujuan: alamat,
    kode,
    nama: user.nama,
    berlakuMenit: menit,
  });

  return { expiresAt, menit, pengiriman };
}

const daftar = bungkus(async (req, res) => {
  wajibIsi(req.body, ['nama', 'email', 'no_wa', 'password']);

  const email = String(req.body.email).trim().toLowerCase();
  const noWa = normalisasiWa(req.body.no_wa);
  const password = String(req.body.password);

  validasiEmail(email);
  if (noWa.length < 9) gagal(400, 'Nomor WhatsApp tidak valid.');
  if (password.length < 8) gagal(400, 'Password minimal 8 karakter.');

  if (await userModel.cariByEmail(email)) gagal(409, 'Email sudah terdaftar.');
  if (await userModel.cariByNoWa(noWa)) gagal(409, 'Nomor WhatsApp sudah terdaftar.');

  const user = await userModel.buat({
    anggota_id: null,
    nama: String(req.body.nama).trim(),
    email,
    no_wa: noWa,
    password: await bcrypt.hash(password, 10),
    role: 'anggota',
    metode_otp: 'EMAIL',
    status_aktif: 0,
  });

  res.status(201).json({
    message: 'Pendaftaran berhasil. Tunggu verifikasi admin sebelum dapat login.',
    user,
  });
});

const masuk = bungkus(async (req, res) => {
  const identifier = identifierLogin(req.body);
  const password = String(req.body.password ?? '');

  if (!identifier || !password) gagal(400, 'Email/nomor WhatsApp dan password wajib diisi.');

  const user = await userModel.cariUntukLogin(identifier);
  const cocok = user ? await bcrypt.compare(password, user.password) : false;

  if (!user || !cocok) {
    gagal(401, 'Email/nomor WhatsApp atau password salah.');
  }
  if (user.status_aktif !== 1) {
    gagal(403, 'Akun belum aktif. Tunggu verifikasi admin terlebih dahulu.');
  }

  const hasil = await buatDanKirimOtp(user, 'LOGIN_2FA', user.metode_otp);

  res.json({
    message: `Kode OTP dikirim melalui ${user.metode_otp}.`,
    user_id: user.id,
    jalur: user.metode_otp,
    expires_at: hasil.expiresAt,
    berlaku_menit: hasil.menit,
  });
});

const verifikasiOtp = bungkus(async (req, res) => {
  const userId = Number(req.body.user_id);
  const kode = String(req.body.kode_otp ?? req.body.kode ?? '').trim();
  const tujuan = req.body.tujuan === 'RESET_PASSWORD' ? 'RESET_PASSWORD' : 'LOGIN_2FA';

  if (!userId || !kode) gagal(400, 'user_id dan kode OTP wajib diisi.');

  const otp = await otpModel.aktifTerbaru(userId, tujuan);
  if (!otp) gagal(400, 'Kode OTP tidak ditemukan atau sudah kedaluwarsa.');
  if (otp.percobaan >= MAKS_PERCOBAAN) {
    gagal(429, 'Terlalu banyak percobaan. Silakan minta kode OTP baru.');
  }

  const cocok = await bcrypt.compare(kode, otp.kode_otp);
  if (!cocok) {
    await otpModel.tambahPercobaan(otp.id);
    const sisa = Math.max(MAKS_PERCOBAAN - otp.percobaan - 1, 0);
    gagal(400, `Kode OTP salah. Sisa percobaan: ${sisa}.`);
  }

  await otpModel.tandaiDigunakan(otp.id);

  const user = await userModel.cariById(otp.user_id);
  if (!user) gagal(404, 'Akun tidak ditemukan.');

  if (tujuan === 'RESET_PASSWORD') {
    const resetToken = jwt.sign({ sub: user.id, scope: 'reset_password' }, rahasiaJwt(), {
      expiresIn: '10m',
    });
    return res.json({
      message: 'Kode OTP valid. Silakan atur password baru.',
      reset_token: resetToken,
    });
  }

  if (user.status_aktif !== 1) gagal(403, 'Akun belum aktif.');

  await userModel.catatLogin(user.id);

  const accessToken = buatAccessToken(user);
  const refreshToken = buatRefreshToken();
  await refreshTokenModel.buat({
    userId: user.id,
    token: refreshToken,
    expiresAt: tambahHari(HARI_REFRESH),
  });

  return res.json({
    message: 'Login berhasil.',
    access_token: accessToken,
    refresh_token: refreshToken,
    user,
  });
});

const kirimUlangOtp = bungkus(async (req, res) => {
  const userId = Number(req.body.user_id);
  const tujuan = req.body.tujuan === 'RESET_PASSWORD' ? 'RESET_PASSWORD' : 'LOGIN_2FA';
  if (!userId) gagal(400, 'user_id wajib diisi.');

  const user = await userModel.cariById(userId);
  if (!user) gagal(404, 'Akun tidak ditemukan.');
  if (tujuan === 'LOGIN_2FA' && user.status_aktif !== 1) gagal(403, 'Akun belum aktif.');

  const terakhir = await otpModel.terakhir(user.id, tujuan);
  if (terakhir && terakhir.detik_terakhir < JEDA_KIRIM_ULANG_DETIK) {
    const tunggu = JEDA_KIRIM_ULANG_DETIK - terakhir.detik_terakhir;
    gagal(429, `Tunggu ${tunggu} detik sebelum meminta kode OTP baru.`);
  }

  const jalur =
    req.body.jalur === 'WHATSAPP' || req.body.jalur === 'EMAIL'
      ? req.body.jalur
      : user.metode_otp;

  const hasil = await buatDanKirimOtp(user, tujuan, jalur);

  res.json({
    message: `Kode OTP dikirim melalui ${jalur}.`,
    user_id: user.id,
    jalur,
    expires_at: hasil.expiresAt,
    berlaku_menit: hasil.menit,
  });
});

const lupaPassword = bungkus(async (req, res) => {
  const identifier = identifierLogin(req.body);
  if (!identifier) gagal(400, 'Email atau nomor WhatsApp wajib diisi.');

  const user = await userModel.cariUntukLogin(identifier);

  if (user) {
    const terakhir = await otpModel.terakhir(user.id, 'RESET_PASSWORD');
    const bolehKirim = !terakhir || terakhir.detik_terakhir >= JEDA_KIRIM_ULANG_DETIK;

    if (bolehKirim) {
      const jalur =
        req.body.jalur === 'WHATSAPP' || req.body.jalur === 'EMAIL'
          ? req.body.jalur
          : user.metode_otp;
      await buatDanKirimOtp(user, 'RESET_PASSWORD', jalur);
    }
  }

  // Respons tetap sama agar keberadaan akun tidak bocor.
  res.json({
    message: 'Jika akun terdaftar, kode OTP reset password telah dikirim.',
  });
});

const resetPassword = bungkus(async (req, res) => {
  wajibIsi(req.body, ['reset_token', 'password_baru']);

  const passwordBaru = String(req.body.password_baru);
  if (passwordBaru.length < 8) gagal(400, 'Password minimal 8 karakter.');

  let payload;
  try {
    payload = jwt.verify(String(req.body.reset_token), rahasiaJwt());
  } catch {
    gagal(401, 'Token reset password tidak valid atau sudah kedaluwarsa.');
  }

  if (payload.scope !== 'reset_password') gagal(401, 'Token tidak valid untuk reset password.');

  const user = await userModel.cariById(payload.sub);
  if (!user) gagal(404, 'Akun tidak ditemukan.');

  await userModel.ubahPassword(user.id, await bcrypt.hash(passwordBaru, 10));
  await refreshTokenModel.hapusUntukUser(user.id);

  res.json({ message: 'Password berhasil diperbarui. Silakan login kembali.' });
});

const segarkanToken = bungkus(async (req, res) => {
  const token = String(req.body.refresh_token ?? '').trim();
  if (!token) gagal(400, 'refresh_token wajib diisi.');

  const data = await refreshTokenModel.cari(token);
  if (!data) gagal(401, 'Refresh token tidak valid atau sudah kedaluwarsa.');
  if (data.status_aktif !== 1) gagal(403, 'Akun tidak aktif.');

  await refreshTokenModel.hapus(token);

  const user = { id: data.uid, role: data.role, nama: data.nama, email: data.email };
  const accessToken = buatAccessToken(user);
  const refreshTokenBaru = buatRefreshToken();
  await refreshTokenModel.buat({
    userId: user.id,
    token: refreshTokenBaru,
    expiresAt: tambahHari(HARI_REFRESH),
  });

  res.json({
    access_token: accessToken,
    refresh_token: refreshTokenBaru,
    user,
  });
});

const keluar = bungkus(async (req, res) => {
  const token = String(req.body.refresh_token ?? '').trim();
  if (token) await refreshTokenModel.hapus(token);
  res.status(204).end();
});

const saya = bungkus(async (req, res) => {
  const user = await userModel.cariById(req.user.id);
  if (!user) return res.status(404).json({ message: 'Akun tidak ditemukan.' });
  return res.json(user);
});

module.exports = {
  daftar,
  masuk,
  verifikasiOtp,
  kirimUlangOtp,
  lupaPassword,
  resetPassword,
  segarkanToken,
  keluar,
  saya,
};
