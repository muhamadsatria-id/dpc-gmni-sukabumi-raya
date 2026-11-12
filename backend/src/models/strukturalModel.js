const buatModel = require('./baseCrudModel');

module.exports = buatModel({
  tabel: 'struktural',
  kolom: [
    'anggota_id',
    'komisariat_id',
    'tingkat',
    'nama_pengurus',
    'jabatan',
    'periode',
    'foto',
    'urutan',
  ],
  urut: 'urutan ASC, id ASC',
  cari: ['nama_pengurus', 'jabatan'],
});
