const buatModel = require('./baseCrudModel');
const { jalankan } = require('../config/db');
const { buatSlugUnik } = require('../utils/slugHelper');

const model = buatModel({
  tabel: 'berita',
  kolom: ['judul', 'slug', 'deskripsi', 'isi', 'referensi', 'file', 'penulis', 'status'],
  urut: 'created_at DESC',
  cari: ['judul', 'deskripsi'],
});

model.slugUnik = (judul, idAbaikan = null) =>
  buatSlugUnik(judul, async (slug) => {
    const [baris] = await jalankan(
      idAbaikan
        ? 'SELECT id FROM berita WHERE slug = ? AND id <> ? LIMIT 1'
        : 'SELECT id FROM berita WHERE slug = ? LIMIT 1',
      idAbaikan ? [slug, idAbaikan] : [slug]
    );
    return baris[0] || null;
  });

module.exports = model;
