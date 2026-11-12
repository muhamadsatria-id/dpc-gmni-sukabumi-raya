require('dotenv').config({ quiet: true });

const mysql = require('mysql2/promise');

// Pengaturan koneksi MySQL (default XAMPP/Laragon: user root, tanpa password).
const pengaturan = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
};

const NAMA_DATABASE = process.env.DB_NAME || 'gmni_db';

let poolKoneksi;

// Pool dibuat lazy agar file ini aman di-require oleh CLI (migrate/seed)
// yang perlu menyambung tanpa memilih database terlebih dahulu.
function dapatkanPool() {
  if (!poolKoneksi) {
    poolKoneksi = mysql.createPool({
      ...pengaturan,
      database: NAMA_DATABASE,
      dateStrings: true,
      connectionLimit: 10,
      waitForConnections: true,
    });
  }
  return poolKoneksi;
}

function jalankan(sql, nilai) {
  return dapatkanPool().query(sql, nilai);
}

function ambilKoneksi() {
  return dapatkanPool().getConnection();
}

async function cekKoneksi() {
  await jalankan('SELECT 1');
}

async function tutupPool() {
  if (poolKoneksi) {
    await poolKoneksi.end();
    poolKoneksi = undefined;
  }
}

module.exports = {
  pengaturan,
  NAMA_DATABASE,
  jalankan,
  ambilKoneksi,
  cekKoneksi,
  tutupPool,
};
