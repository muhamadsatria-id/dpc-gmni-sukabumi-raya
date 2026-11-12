module.exports = {
  async up(koneksi) {
    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`users\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        anggota_id INT UNSIGNED NULL,
        nama VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        no_wa VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('anggota', 'admin', 'superadmin') NOT NULL DEFAULT 'anggota',
        metode_otp ENUM('EMAIL', 'WHATSAPP') NOT NULL DEFAULT 'EMAIL',
        status_aktif TINYINT(1) NOT NULL DEFAULT 0,
        last_login DATETIME NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uq_users_anggota (anggota_id),
        INDEX idx_users_role (role),
        INDEX idx_users_status_aktif (status_aktif),
        CONSTRAINT fk_users_anggota
          FOREIGN KEY (anggota_id) REFERENCES anggota(id)
          ON UPDATE CASCADE ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`user_otps\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED NOT NULL,
        kode_otp VARCHAR(255) NOT NULL,
        tujuan ENUM('LOGIN_2FA', 'RESET_PASSWORD') NOT NULL,
        jalur ENUM('EMAIL', 'WHATSAPP') NOT NULL,
        percobaan TINYINT UNSIGNED NOT NULL DEFAULT 0,
        expires_at DATETIME NOT NULL,
        digunakan TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_otp_user_aktif (user_id, tujuan, digunakan),
        INDEX idx_otp_expires (expires_at),
        CONSTRAINT fk_otp_user
          FOREIGN KEY (user_id) REFERENCES users(id)
          ON UPDATE CASCADE ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`refresh_tokens\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED NOT NULL,
        token VARCHAR(512) NOT NULL UNIQUE,
        expires_at DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_refresh_user (user_id),
        INDEX idx_refresh_expires (expires_at),
        CONSTRAINT fk_refresh_user
          FOREIGN KEY (user_id) REFERENCES users(id)
          ON UPDATE CASCADE ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await koneksi.query(`
      CREATE TABLE IF NOT EXISTS \`activity_logs\` (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED NULL,
        aksi VARCHAR(100) NOT NULL,
        keterangan TEXT NULL,
        ip_address VARCHAR(45) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_log_user (user_id),
        INDEX idx_log_created (created_at),
        CONSTRAINT fk_log_user
          FOREIGN KEY (user_id) REFERENCES users(id)
          ON UPDATE CASCADE ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  },
};
