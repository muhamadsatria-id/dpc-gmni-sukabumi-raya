const model = require('../models/karyaIlmiahModel');
const buatController = require('./baseCrudController');
const { hapusFile } = require('../utils/fileHelper');

function fileDariRequest(req) {
  const files = req.files || {};
  return {
    gambar: files.gambar?.[0] ? `/uploads/${files.gambar[0].filename}` : null,
    file: files.file?.[0] ? `/uploads/${files.file[0].filename}` : null,
  };
}

module.exports = buatController({
  model,
  label: 'Karya Ilmiah',
  wajib: ['judul', 'penulis', 'ringkasan', 'isi'],
  async sebelumSimpan(data, req) {
    if (!data.slug && data.judul) data.slug = await model.slugUnik(data.judul);

    const file = fileDariRequest(req);
    if (file.gambar) data.gambar = file.gambar;
    if (file.file) data.file = file.file;
  },
  async sebelumUbah(data, req, lama) {
    if (data.judul && !data.slug) data.slug = await model.slugUnik(data.judul, lama.id);

    const file = fileDariRequest(req);
    if (file.gambar) {
      data.gambar = file.gambar;
      await hapusFile(lama.gambar);
    }
    if (file.file) {
      data.file = file.file;
      await hapusFile(lama.file);
    }
  },
  async sebelumHapus(lama) {
    await hapusFile(lama.gambar);
    await hapusFile(lama.file);
  },
});
