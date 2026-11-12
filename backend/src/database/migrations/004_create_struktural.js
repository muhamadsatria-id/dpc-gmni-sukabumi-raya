module.exports = {
  async up(koneksi) {
    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`struktural\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        anggota_id INT UNSIGNED NULL,
        komisariat_id INT UNSIGNED NULL,
        tingkat ENUM('DPC', 'KOMISARIAT') NOT NULL DEFAULT 'DPC',
        nama_pengurus VARCHAR(150) NOT NULL,
        jabatan VARCHAR(100) NOT NULL,
        periode VARCHAR(20) NOT NULL,
        foto VARCHAR(255) NULL,
        urutan TINYINT UNSIGNED NOT NULL DEFAULT 99,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_struktural_anggota
          FOREIGN KEY (anggota_id) REFERENCES anggota(id)
          ON UPDATE CASCADE ON DELETE SET NULL,
        CONSTRAINT fk_struktural_komisariat
          FOREIGN KEY (komisariat_id) REFERENCES komisariat(id)
          ON UPDATE CASCADE ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  },
};
