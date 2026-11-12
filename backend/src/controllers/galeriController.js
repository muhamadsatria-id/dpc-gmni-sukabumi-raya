const model = require('../models/galeriModel');
const buatController = require('./baseCrudController');
const { hapusFile } = require('../utils/fileHelper');
const { normalisasiTanggal } = require('../utils/dataHelper');

function rapikan(data) {
  if (data.tanggal_kegiatan !== undefined) {
    data.tanggal_kegiatan = normalisasiTanggal(data.tanggal_kegiatan);
  }
}

module.exports = buatController({
  model,
  label: 'Galeri',
  wajib: ['judul', 'file'],
  sebelumSimpan(data, req) {
    if (req.file) data.file = `/uploads/${req.file.filename}`;
    rapikan(data);
  },
  async sebelumUbah(data, req, lama) {
    if (req.file) {
      data.file = `/uploads/${req.file.filename}`;
      await hapusFile(lama.file);
    }
    rapikan(data);
  },
  async sebelumHapus(lama) {
    await hapusFile(lama.file);
  },
});
