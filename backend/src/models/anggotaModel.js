const { jalankan, ambilKoneksi } = require('../config/db');

async function semua({ cari, komisariatId } = {}) {
  let sql = `
    SELECT a.*, k.nama AS nama_komisariat
    FROM anggota a
    JOIN komisariat k ON a.komisariat_id = k.id
  `;
  const kondisi = [];
  const nilai = [];

  if (cari) {
    kondisi.push(
      '(a.nama_lengkap LIKE ? OR a.nama_panggilan LIKE ? OR a.profesi_saat_ini LIKE ? OR k.nama LIKE ?)'
    );
    nilai.push(`%${cari}%`, `%${cari}%`, `%${cari}%`, `%${cari}%`);
  }

  if (komisariatId) {
    kondisi.push('a.komisariat_id = ?');
    nilai.push(komisariatId);
  }

  if (kondisi.length > 0) sql += ` WHERE ${kondisi.join(' AND ')}`;
  sql += ' ORDER BY a.nama_lengkap ASC';

  const [baris] = await jalankan(sql, nilai);
  return baris;
}

async function cariLengkap(id) {
  const [baris] = await jalankan(
    `SELECT a.*, k.nama AS nama_komisariat
     FROM anggota a
     JOIN komisariat k ON a.komisariat_id = k.id
     WHERE a.id = ?`,
    [id]
  );

  if (!baris[0]) return null;

  const [pendidikan] = await jalankan(
    'SELECT id, jenjang, nama_kampus, jurusan, tahun_masuk, tahun_lulus FROM anggota_pendidikan WHERE anggota_id = ? ORDER BY tahun_masuk DESC',
    [id]
  );

  const [pengalaman] = await jalankan(
    'SELECT id, kategori, nama_organisasi, jabatan, periode_mulai, periode_selesai FROM anggota_pengalaman_organisasi WHERE anggota_id = ? ORDER BY periode_mulai DESC',
    [id]
  );

  return { ...baris[0], pendidikan, pengalaman_organisasi: pengalaman };
}

async function buat(isi) {
  const koneksi = await ambilKoneksi();

  try {
    await koneksi.beginTransaction();

    const [hasil] = await koneksi.query('INSERT INTO anggota SET ?', [isi.anggota]);
    const anggotaId = hasil.insertId;

    await simpanRelasi(koneksi, anggotaId, isi);

    await koneksi.commit();
    return cariLengkap(anggotaId);
  } catch (err) {
    await koneksi.rollback();
    throw err;
  } finally {
    koneksi.release();
  }
}

async function ubah(id, isi) {
  const koneksi = await ambilKoneksi();

  try {
    await koneksi.beginTransaction();

    const [cek] = await koneksi.query('SELECT id FROM anggota WHERE id = ?', [id]);
    if (!cek[0]) {
      await koneksi.rollback();
      return null;
    }

    await koneksi.query('UPDATE anggota SET ? WHERE id = ?', [isi.anggota, id]);

    await koneksi.query('DELETE FROM anggota_pendidikan WHERE anggota_id = ?', [id]);
    await koneksi.query('DELETE FROM anggota_pengalaman_organisasi WHERE anggota_id = ?', [id]);
    await simpanRelasi(koneksi, id, isi);

    await koneksi.commit();
    return cariLengkap(id);
  } catch (err) {
    await koneksi.rollback();
    throw err;
  } finally {
    koneksi.release();
  }
}

async function hapus(id) {
  const [hasil] = await jalankan('DELETE FROM anggota WHERE id = ?', [id]);
  return hasil.affectedRows > 0;
}

async function hitung() {
  const [baris] = await jalankan('SELECT COUNT(*) AS total FROM anggota');
  return baris[0].total;
}

async function simpanRelasi(koneksi, anggotaId, isi) {
  if (isi.pendidikan.length > 0) {
    const nilaiPendidikan = isi.pendidikan.map((p) => [
      anggotaId,
      p.jenjang,
      p.nama_kampus,
      p.jurusan,
      p.tahun_masuk,
      p.tahun_lulus,
    ]);
    await koneksi.query(
      'INSERT INTO anggota_pendidikan (anggota_id, jenjang, nama_kampus, jurusan, tahun_masuk, tahun_lulus) VALUES ?',
      [nilaiPendidikan]
    );
  }

  if (isi.pengalaman_organisasi.length > 0) {
    const nilaiOrganisasi = isi.pengalaman_organisasi.map((o) => [
      anggotaId,
      o.kategori,
      o.nama_organisasi,
      o.jabatan,
      o.periode_mulai,
      o.periode_selesai,
    ]);
    await koneksi.query(
      'INSERT INTO anggota_pengalaman_organisasi (anggota_id, kategori, nama_organisasi, jabatan, periode_mulai, periode_selesai) VALUES ?',
      [nilaiOrganisasi]
    );
  }
}

module.exports = { semua, cariLengkap, buat, ubah, hapus, hitung };
