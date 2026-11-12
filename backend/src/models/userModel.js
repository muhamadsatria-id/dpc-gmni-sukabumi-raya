const { jalankan } = require('../config/db');
const { pilih, kosong } = require('../utils/dataHelper');

const KOLOM_AMAN =
  'id, anggota_id, nama, email, no_wa, role, metode_otp, status_aktif, last_login, created_at, updated_at';

const KOLOM_SIMPAN = [
  'anggota_id',
  'nama',
  'email',
  'no_wa',
  'password',
  'role',
  'metode_otp',
  'status_aktif',
  'last_login',
];

const KOLOM_UBAH = [
  'anggota_id',
  'nama',
  'email',
  'no_wa',
  'role',
  'metode_otp',
  'status_aktif',
];

async function semua({ role, status, q } = {}) {
  const kondisi = [];
  const nilai = [];

  if (role) {
    kondisi.push('role = ?');
    nilai.push(role);
  }
  if (status !== undefined && status !== '') {
    const statusAngka = Number(status);
    if (Number.isInteger(statusAngka)) {
      kondisi.push('status_aktif = ?');
      nilai.push(statusAngka);
    }
  }
  if (q) {
    kondisi.push('(nama LIKE ? OR email LIKE ? OR no_wa LIKE ?)');
    nilai.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }

  let sql = `SELECT ${KOLOM_AMAN} FROM users`;
  if (kondisi.length > 0) sql += ` WHERE ${kondisi.join(' AND ')}`;
  sql += ' ORDER BY id ASC';

  const [baris] = await jalankan(sql, nilai);
  return baris;
}

async function cariById(id) {
  const [baris] = await jalankan(`SELECT ${KOLOM_AMAN} FROM users WHERE id = ?`, [id]);
  return baris[0] || null;
}

// Khusus proses login: menyertakan kolom password.
async function cariUntukLogin(identifier) {
  const [baris] = await jalankan(
    'SELECT * FROM users WHERE email = ? OR no_wa = ? LIMIT 1',
    [identifier, identifier]
  );
  return baris[0] || null;
}

async function cariByEmail(email) {
  const [baris] = await jalankan(`SELECT ${KOLOM_AMAN} FROM users WHERE email = ? LIMIT 1`, [
    email,
  ]);
  return baris[0] || null;
}

async function cariByNoWa(noWa) {
  const [baris] = await jalankan(`SELECT ${KOLOM_AMAN} FROM users WHERE no_wa = ? LIMIT 1`, [
    noWa,
  ]);
  return baris[0] || null;
}

async function buat(data) {
  const isi = pilih(data, KOLOM_SIMPAN);
  if (kosong(isi)) {
    const err = new Error('Tidak ada data akun yang dapat disimpan.');
    err.status = 400;
    throw err;
  }

  const [hasil] = await jalankan('INSERT INTO users SET ?', [isi]);
  return cariById(hasil.insertId);
}

async function ubah(id, data) {
  const isi = pilih(data, KOLOM_UBAH);
  if (kosong(isi)) return cariById(id);

  await jalankan('UPDATE users SET ? WHERE id = ?', [isi, id]);
  return cariById(id);
}

async function ubahPassword(id, passwordHash) {
  await jalankan('UPDATE users SET password = ? WHERE id = ?', [passwordHash, id]);
}

async function ubahStatus(id, statusAktif) {
  await jalankan('UPDATE users SET status_aktif = ? WHERE id = ?', [statusAktif, id]);
  return cariById(id);
}

async function catatLogin(id) {
  await jalankan('UPDATE users SET last_login = NOW() WHERE id = ?', [id]);
}

async function hapus(id) {
  const [hasil] = await jalankan('DELETE FROM users WHERE id = ?', [id]);
  return hasil.affectedRows > 0;
}

module.exports = {
  semua,
  cariById,
  cariUntukLogin,
  cariByEmail,
  cariByNoWa,
  buat,
  ubah,
  ubahPassword,
  ubahStatus,
  catatLogin,
  hapus,
};
