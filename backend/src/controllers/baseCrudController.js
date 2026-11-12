const { bungkus } = require('../utils/asyncHandler');

function validasiWajib(data, daftarWajib, label) {
  const kurang = daftarWajib.filter(
    (nama) => data[nama] === undefined || data[nama] === null || data[nama] === ''
  );

  if (kurang.length > 0) {
    const err = new Error(`${label} membutuhkan field: ${kurang.join(', ')}.`);
    err.status = 400;
    throw err;
  }
}

function buatController({ model, label, wajib = [], sebelumSimpan, sebelumUbah, sebelumHapus }) {
  const daftar = bungkus(async (req, res) => {
    res.json(await model.semua({ q: req.query.q }));
  });

  const detail = bungkus(async (req, res) => {
    const data = await model.cariById(req.params.id);
    if (!data) return res.status(404).json({ message: `${label} tidak ditemukan.` });
    return res.json(data);
  });

  const tambah = bungkus(async (req, res) => {
    const data = { ...req.body };
    if (sebelumSimpan) await sebelumSimpan(data, req);
    validasiWajib(data, wajib, label);

    const hasil = await model.buat(data);
    res.status(201).json(hasil);
  });

  const ubah = bungkus(async (req, res) => {
    const lama = await model.cariById(req.params.id);
    if (!lama) return res.status(404).json({ message: `${label} tidak ditemukan.` });

    const data = { ...req.body };
    if (sebelumUbah) await sebelumUbah(data, req, lama);

    const hasil = await model.ubah(req.params.id, data);
    if (!hasil) return res.status(404).json({ message: `${label} tidak ditemukan.` });
    return res.json(hasil);
  });

  const hapus = bungkus(async (req, res) => {
    const lama = await model.cariById(req.params.id);
    if (!lama) return res.status(404).json({ message: `${label} tidak ditemukan.` });

    if (sebelumHapus) await sebelumHapus(lama, req);
    await model.hapus(req.params.id);
    res.status(204).end();
  });

  return { daftar, detail, tambah, ubah, hapus };
}

module.exports = buatController;
