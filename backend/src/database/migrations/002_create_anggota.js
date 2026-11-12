module.exports = {
  async up(koneksi) {
    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`anggota\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        komisariat_id INT UNSIGNED NOT NULL,
        nama_lengkap VARCHAR(150) NOT NULL,
        nama_panggilan VARCHAR(50) NULL,
        tempat_lahir VARCHAR(100) NOT NULL,
        tanggal_lahir DATE NOT NULL,
        alamat TEXT NOT NULL,
        tahun_masuk_gmni YEAR NOT NULL,
        profesi_saat_ini VARCHAR(100) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_anggota_nama (nama_lengkap),
        INDEX idx_anggota_tahun_masuk (tahun_masuk_gmni),
        CONSTRAINT fk_anggota_komisariat
          FOREIGN KEY (komisariat_id) REFERENCES komisariat(id)
          ON UPDATE CASCADE ON DELETE RESTRICT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`anggota_pendidikan\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        anggota_id INT UNSIGNED NOT NULL,
        jenjang ENUM('D3', 'D4', 'S1', 'S2', 'S3', 'Lainnya') NOT NULL DEFAULT 'S1',
        nama_kampus VARCHAR(150) NOT NULL,
        jurusan VARCHAR(150) NOT NULL,
        tahun_masuk YEAR NOT NULL,
        tahun_lulus YEAR NULL,
        CONSTRAINT fk_pendidikan_anggota
          FOREIGN KEY (anggota_id) REFERENCES anggota(id)
          ON UPDATE CASCADE ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`anggota_pengalaman_organisasi\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        anggota_id INT UNSIGNED NOT NULL,
        kategori ENUM('GMNI', 'KAMPUS') NOT NULL,
        nama_organisasi VARCHAR(150) NOT NULL,
        jabatan VARCHAR(100) NOT NULL,
        periode_mulai YEAR NOT NULL,
        periode_selesai YEAR NULL,
        INDEX idx_org_kategori (kategori),
        CONSTRAINT fk_organisasi_anggota
          FOREIGN KEY (anggota_id) REFERENCES anggota(id)
          ON UPDATE CASCADE ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  },
};
