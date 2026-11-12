module.exports = {
  async up(koneksi) {
    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`berita\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        judul VARCHAR(200) NOT NULL,
        slug VARCHAR(220) NOT NULL UNIQUE,
        deskripsi TEXT NOT NULL,
        isi LONGTEXT NOT NULL,
        referensi TEXT NULL,
        file VARCHAR(255) NULL,
        penulis VARCHAR(100) NULL,
        status ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'PUBLISHED',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`timeline_kalender\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        nama_kegiatan VARCHAR(200) NOT NULL,
        waktu_mulai DATETIME NOT NULL,
        waktu_selesai DATETIME NULL,
        lokasi VARCHAR(150) NULL,
        deskripsi TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_timeline_waktu (waktu_mulai)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`galeri\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        judul VARCHAR(150) NOT NULL,
        ringkasan TEXT NULL,
        file VARCHAR(255) NOT NULL,
        tanggal_kegiatan DATE NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`tentang_kami\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        gambar VARCHAR(255) NULL,
        deskripsi LONGTEXT NOT NULL,
        visi TEXT NOT NULL,
        misi LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`karya_ilmiah\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        judul VARCHAR(200) NOT NULL,
        slug VARCHAR(220) NOT NULL UNIQUE,
        penulis VARCHAR(150) NOT NULL,
        ringkasan TEXT NOT NULL,
        isi LONGTEXT NOT NULL,
        referensi TEXT NULL,
        gambar VARCHAR(255) NULL,
        file VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  },
};
