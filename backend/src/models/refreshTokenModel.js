const { jalankan } = require('../config/db');

async function buat({ userId, token, expiresAt }) {
  const [hasil] = await jalankan(
    'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
    [userId, token, expiresAt]
  );
  return hasil.insertId;
}

async function cari(token) {
  const [baris] = await jalankan(
    `SELECT rt.*, u.id AS uid, u.nama, u.email, u.role, u.status_aktif
     FROM refresh_tokens rt
     JOIN users u ON rt.user_id = u.id
     WHERE rt.token = ? AND rt.expires_at > NOW()
     LIMIT 1`,
    [token]
  );
  return baris[0] || null;
}

async function hapus(token) {
  await jalankan('DELETE FROM refresh_tokens WHERE token = ?', [token]);
}

async function hapusUntukUser(userId) {
  await jalankan('DELETE FROM refresh_tokens WHERE user_id = ?', [userId]);
}

async function hapusKedaluwarsa() {
  await jalankan('DELETE FROM refresh_tokens WHERE expires_at <= NOW()');
}

module.exports = { buat, cari, hapus, hapusUntukUser, hapusKedaluwarsa };
