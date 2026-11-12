const buatModel = require('./baseCrudModel');

module.exports = buatModel({
  tabel: 'galeri',
  kolom: ['judul', 'ringkasan', 'file', 'tanggal_kegiatan'],
  urut: 'tanggal_kegiatan DESC, id DESC',
  cari: ['judul'],
});
