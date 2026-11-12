const buatModel = require('./baseCrudModel');

module.exports = buatModel({
  tabel: 'komisariat',
  kolom: ['nama'],
  urut: 'id ASC',
  cari: ['nama'],
});
