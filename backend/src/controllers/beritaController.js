const model = require('../models/beritaModel');
const buatController = require('./baseCrudController');
const { hapusFile } = require('../utils/fileHelper');

function validasiStatus(data) {
  if (data.status && !['DRAFT', 'PUBLISHED'].includes(data.status)) {
    const err = new Error('Status berita harus DRAFT atau PUBLISHED.');
    err.status = 400;
    throw err;
  }
}

module.exports = buatController({
  model,
  label: 'Berita',
  wajib: ['judul', 'deskripsi', 'isi'],
  async sebelumSimpan(data, req) {
    validasiStatus(data);
    if (!data.slug && data.judul) data.slug = await model.slugUnik(data.judul);
    if (req.file) data.file = `/uploads/${req.file.filename}`;
    if (!data.penulis && req.user) data.penulis = req.user.nama;
  },
  async sebelumUbah(data, req, lama) {
    validasiStatus(data);
    if (data.judul && !data.slug) data.slug = await model.slugUnik(data.judul, lama.id);
    if (req.file) {
      data.file = `/uploads/${req.file.filename}`;
      await hapusFile(lama.file);
    }
  },
  async sebelumHapus(lama) {
    await hapusFile(lama.file);
  },
});
