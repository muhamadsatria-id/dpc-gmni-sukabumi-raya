const fs = require('fs/promises');
const path = require('path');
const mysql = require('mysql2/promise');
const { pengaturan, NAMA_DATABASE } = require('../config/db');

const FOLDER_MIGRASI = path.join(__dirname, 'migrations');
const FRESH = process.argv.includes('--fresh');

async function siapkanDatabase() {
  const server = await mysql.createConnection(pengaturan);

  try {
    if (FRESH) {
      await server.query(`DROP DATABASE IF EXISTS \`${NAMA_DATABASE}\``);
      console.log(`[migrate] Database ${NAMA_DATABASE} dihapus (mode fresh).`);
    }

    await server.query(
      `CREATE DATABASE IF NOT EXISTS \`${NAMA_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
  } finally {
    await server.end();
  }
}

async function jalankanMigrasi() {
  await siapkanDatabase();

  const koneksi = await mysql.createConnection({
    ...pengaturan,
    database: NAMA_DATABASE,
    dateStrings: true,
  });

  try {
    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`migrations\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(255) NOT NULL UNIQUE,
        dijalankan_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    const [sudahDijalankan] = await koneksi.query('SELECT nama FROM `migrations`');
    const riwayat = new Set(sudahDijalankan.map((baris) => baris.nama));

    const daftarFile = (await fs.readdir(FOLDER_MIGRASI))
      .filter((file) => file.endsWith('.js'))
      .sort();

    if (daftarFile.length === 0) {
      console.log('[migrate] Tidak ada file migrasi.');
      return;
    }

    for (const file of daftarFile) {
      if (riwayat.has(file)) {
        console.log(`[migrate] lewati ${file} (sudah dijalankan)`);
        continue;
      }

      const migrasi = require(path.join(FOLDER_MIGRASI, file));
      if (typeof migrasi.up !== 'function') {
        throw new Error(`Migrasi ${file} tidak memiliki fungsi up().`);
      }

      console.log(`[migrate] menjalankan ${file}`);
      await migrasi.up(koneksi);
      await koneksi.query('INSERT INTO `migrations` (nama) VALUES (?)', [file]);
    }

    console.log('[migrate] Selesai.');
  } finally {
    await koneksi.end();
  }
}

jalankanMigrasi().catch((err) => {
  console.error('[migrate] Gagal:', err.message);
  process.exit(1);
});
