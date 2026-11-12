const model = require('../models/tentangKamiModel');
const buatController = require('./baseCrudController');
const { hapusFile } = require('../utils/fileHelper');

module.exports = buatController({
  model,
  label: 'Tentang Kami',
  wajib: ['deskripsi', 'visi', 'misi'],
  sebelumSimpan(data, req) {
    if (req.file) data.gambar = `/uploads/${req.file.filename}`;
  },
  async sebelumUbah(data, req, lama) {
    if (req.file) {
      data.gambar = `/uploads/${req.file.filename}`;
      await hapusFile(lama.gambar);
    }
  },
  async sebelumHapus(lama) {
    await hapusFile(lama.gambar);
  },
});
