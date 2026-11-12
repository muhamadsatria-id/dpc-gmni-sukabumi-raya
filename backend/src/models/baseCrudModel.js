const { jalankan } = require('../config/db');
const { pilih, kosong } = require('../utils/dataHelper');

// Factory model CRUD sederhana untuk tabel yang tidak punya relasi khusus.
function buatModel({ tabel, kolom, urut = 'id ASC', cari = [] }) {
  async function semua({ q } = {}) {
    let sql = `SELECT * FROM \`${tabel}\``;
    const nilai = [];

    if (q && cari.length > 0) {
      sql += ` WHERE ${cari.map((nama) => `\`${nama}\` LIKE ?`).join(' OR ')}`;
      for (let i = 0; i < cari.length; i += 1) nilai.push(`%${q}%`);
    }

    sql += ` ORDER BY ${urut}`;

    const [baris] = await jalankan(sql, nilai);
    return baris;
  }

  async function cariById(id) {
    const [baris] = await jalankan(`SELECT * FROM \`${tabel}\` WHERE id = ?`, [id]);
    return baris[0] || null;
  }

  async function buat(data) {
    const isi = pilih(data, kolom);
    if (kosong(isi)) {
      const err = new Error('Tidak ada data yang dapat disimpan.');
      err.status = 400;
      throw err;
    }

    const [hasil] = await jalankan(`INSERT INTO \`${tabel}\` SET ?`, [isi]);
    return cariById(hasil.insertId);
  }

  async function ubah(id, data) {
    const isi = pilih(data, kolom);
    if (kosong(isi)) return cariById(id);

    await jalankan(`UPDATE \`${tabel}\` SET ? WHERE id = ?`, [isi, id]);
    return cariById(id);
  }

  async function hapus(id) {
    const [hasil] = await jalankan(`DELETE FROM \`${tabel}\` WHERE id = ?`, [id]);
    return hasil.affectedRows > 0;
  }

  async function hitung() {
    const [baris] = await jalankan(`SELECT COUNT(*) AS total FROM \`${tabel}\``);
    return baris[0].total;
  }

  return { semua, cariById, buat, ubah, hapus, hitung };
}

module.exports = buatModel;
