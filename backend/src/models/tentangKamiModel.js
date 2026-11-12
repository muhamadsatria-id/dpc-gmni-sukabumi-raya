const buatModel = require('./baseCrudModel');

module.exports = buatModel({
  tabel: 'tentang_kami',
  kolom: ['gambar', 'deskripsi', 'visi', 'misi'],
  urut: 'id ASC',
  cari: ['deskripsi'],
});
