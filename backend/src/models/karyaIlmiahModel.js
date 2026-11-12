const buatModel = require('./baseCrudModel');
const { jalankan } = require('../config/db');
const { buatSlugUnik } = require('../utils/slugHelper');

const model = buatModel({
  tabel: 'karya_ilmiah',
  kolom: ['judul', 'slug', 'penulis', 'ringkasan', 'isi', 'referensi', 'gambar', 'file'],
  urut: 'created_at DESC',
  cari: ['judul', 'penulis'],
});

model.slugUnik = (judul, idAbaikan = null) =>
  buatSlugUnik(judul, async (slug) => {
    const [baris] = await jalankan(
      idAbaikan
        ? 'SELECT id FROM karya_ilmiah WHERE slug = ? AND id <> ? LIMIT 1'
        : 'SELECT id FROM karya_ilmiah WHERE slug = ? LIMIT 1',
      idAbaikan ? [slug, idAbaikan] : [slug]
    );
    return baris[0] || null;
  });

module.exports = model;
