const { jalankan } = require('../config/db');

async function buat({ userId, kodeHash, tujuan, jalur, expiresAt }) {
  const [hasil] = await jalankan(
    'INSERT INTO user_otps (user_id, kode_otp, tujuan, jalur, expires_at) VALUES (?, ?, ?, ?, ?)',
    [userId, kodeHash, tujuan, jalur, expiresAt]
  );
  return hasil.insertId;
}

async function aktifTerbaru(userId, tujuan) {
  const [baris] = await jalankan(
    `SELECT * FROM user_otps
     WHERE user_id = ? AND tujuan = ? AND digunakan = 0 AND expires_at > NOW()
     ORDER BY id DESC LIMIT 1`,
    [userId, tujuan]
  );
  return baris[0] || null;
}

async function terakhir(userId, tujuan) {
  const [baris] = await jalankan(
    `SELECT *, TIMESTAMPDIFF(SECOND, created_at, NOW()) AS detik_terakhir
     FROM user_otps
     WHERE user_id = ? AND tujuan = ?
     ORDER BY id DESC LIMIT 1`,
    [userId, tujuan]
  );
  return baris[0] || null;
}

async function tambahPercobaan(id) {
  await jalankan('UPDATE user_otps SET percobaan = percobaan + 1 WHERE id = ?', [id]);
}

async function tandaiDigunakan(id) {
  await jalankan('UPDATE user_otps SET digunakan = 1 WHERE id = ?', [id]);
}

async function hapusUntuk(userId, tujuan) {
  await jalankan('DELETE FROM user_otps WHERE user_id = ? AND tujuan = ?', [userId, tujuan]);
}

module.exports = {
  buat,
  aktifTerbaru,
  terakhir,
  tambahPercobaan,
  tandaiDigunakan,
  hapusUntuk,
};
