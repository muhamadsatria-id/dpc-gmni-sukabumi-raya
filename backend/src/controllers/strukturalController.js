const model = require('../models/strukturalModel');
const buatController = require('./baseCrudController');
const { hapusFile } = require('../utils/fileHelper');

module.exports = buatController({
  model,
  label: 'Struktural',
  wajib: ['nama_pengurus', 'jabatan', 'periode'],
  sebelumSimpan(data, req) {
    if (req.file) data.foto = `/uploads/${req.file.filename}`;
  },
  async sebelumUbah(data, req, lama) {
    if (req.file) {
      data.foto = `/uploads/${req.file.filename}`;
      await hapusFile(lama.foto);
    }
  },
  async sebelumHapus(lama) {
    await hapusFile(lama.foto);
  },
});
