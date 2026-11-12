const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const { bungkus } = require('../utils/asyncHandler');
const { gagal, wajibIsi, normalisasiWa } = require('../utils/validasi');

const ROLE_VALID = ['anggota', 'admin', 'superadmin'];

const daftar = bungkus(async (req, res) => {
  res.json(
    await userModel.semua({
      role: req.query.role,
      status: req.query.status,
      q: String(req.query.q ?? '').trim() || undefined,
    })
  );
});

const detail = bungkus(async (req, res) => {
  const user = await userModel.cariById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Akun tidak ditemukan.' });
  return res.json(user);
});

const tambah = bungkus(async (req, res) => {
  wajibIsi(req.body, ['nama', 'email', 'no_wa', 'password', 'role']);

  const email = String(req.body.email).trim().toLowerCase();
  const noWa = normalisasiWa(req.body.no_wa);
  const role = String(req.body.role);
  const password = String(req.body.password);

  if (!ROLE_VALID.includes(role)) gagal(400, 'Role harus anggota, admin, atau superadmin.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) gagal(400, 'Format email tidak valid.');
  if (password.length < 8) gagal(400, 'Password minimal 8 karakter.');
  if (await userModel.cariByEmail(email)) gagal(409, 'Email sudah terdaftar.');
  if (await userModel.cariByNoWa(noWa)) gagal(409, 'Nomor WhatsApp sudah terdaftar.');

  const metodeOtp = req.body.metode_otp === 'WHATSAPP' ? 'WHATSAPP' : 'EMAIL';

  const user = await userModel.buat({
    anggota_id: req.body.anggota_id ? Number(req.body.anggota_id) : null,
    nama: String(req.body.nama).trim(),
    email,
    no_wa: noWa,
    password: await bcrypt.hash(password, 10),
    role,
    metode_otp: metodeOtp,
    status_aktif: req.body.status_aktif === 0 || req.body.status_aktif === '0' ? 0 : 1,
  });

  res.status(201).json(user);
});

const ubah = bungkus(async (req, res) => {
  const lama = await userModel.cariById(req.params.id);
  if (!lama) return res.status(404).json({ message: 'Akun tidak ditemukan.' });

  const data = {};

  if (req.body.nama !== undefined) data.nama = String(req.body.nama).trim();
  if (req.body.email !== undefined) data.email = String(req.body.email).trim().toLowerCase();
  if (req.body.no_wa !== undefined) data.no_wa = normalisasiWa(req.body.no_wa);
  if (req.body.anggota_id !== undefined) {
    data.anggota_id = req.body.anggota_id ? Number(req.body.anggota_id) : null;
  }
  if (req.body.metode_otp !== undefined) {
    data.metode_otp = req.body.metode_otp === 'WHATSAPP' ? 'WHATSAPP' : 'EMAIL';
  }
  if (req.body.status_aktif !== undefined) {
    data.status_aktif = Number(req.body.status_aktif) === 1 ? 1 : 0;
  }
  if (req.body.role !== undefined) {
    if (!ROLE_VALID.includes(req.body.role)) {
      gagal(400, 'Role harus anggota, admin, atau superadmin.');
    }
    data.role = req.body.role;
  }

  if (data.nama !== undefined && !data.nama) gagal(400, 'Nama wajib diisi.');
  if (data.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    gagal(400, 'Format email tidak valid.');
  }
  if (data.no_wa !== undefined && data.no_wa.length < 9) {
    gagal(400, 'Nomor WhatsApp tidak valid.');
  }

  if (data.email && data.email !== lama.email) {
    const bentrok = await userModel.cariByEmail(data.email);
    if (bentrok && bentrok.id !== lama.id) gagal(409, 'Email sudah terdaftar.');
  }
  if (data.no_wa && data.no_wa !== lama.no_wa) {
    const bentrok = await userModel.cariByNoWa(data.no_wa);
    if (bentrok && bentrok.id !== lama.id) gagal(409, 'Nomor WhatsApp sudah terdaftar.');
  }

  if (lama.role === 'superadmin' && data.role && data.role !== 'superadmin') {
    const semuaSuperadmin = await userModel.semua({ role: 'superadmin' });
    if (semuaSuperadmin.length <= 1) {
      gagal(400, 'Tidak dapat mengubah role superadmin terakhir.');
    }
  }

  res.json(await userModel.ubah(lama.id, data));
});

const hapus = bungkus(async (req, res) => {
  const id = Number(req.params.id);
  const user = await userModel.cariById(id);
  if (!user) return res.status(404).json({ message: 'Akun tidak ditemukan.' });

  if (id === req.user.id) gagal(400, 'Anda tidak dapat menghapus akun sendiri.');

  if (user.role === 'superadmin') {
    const semuaSuperadmin = await userModel.semua({ role: 'superadmin' });
    if (semuaSuperadmin.length <= 1) gagal(400, 'Tidak dapat menghapus superadmin terakhir.');
  }

  await userModel.hapus(id);
  res.status(204).end();
});

module.exports = { daftar, detail, tambah, ubah, hapus };
