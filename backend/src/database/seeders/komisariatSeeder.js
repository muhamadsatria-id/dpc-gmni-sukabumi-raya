const { jalankan } = require('../../config/db');

module.exports = {
  nama: 'komisariatSeeder',
  async jalankan() {
    const daftar = Array.from({ length: 10 }, (_, i) => [`Komisariat ${i + 1}`]);
    await jalankan('INSERT IGNORE INTO `komisariat` (nama) VALUES ?', [daftar]);
  },
};
