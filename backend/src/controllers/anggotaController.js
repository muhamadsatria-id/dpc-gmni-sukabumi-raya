const model = require('../models/anggotaModel');
const { bungkus } = require('../utils/asyncHandler');
const { normalisasiTanggal } = require('../utils/dataHelper');

// Memvalidasi dan merapikan input anggota beserta relasinya.
function periksa(body) {
  const anggota = {
    komisariat_id: Number(body.komisariat_id) || null,
    nama_lengkap: String(body.nama_lengkap ?? '').trim(),
    nama_panggilan: String(body.nama_panggilan ?? '').trim() || null,
    tempat_lahir: String(body.tempat_lahir ?? '').trim(),
    tanggal_lahir: normalisasiTanggal(String(body.tanggal_lahir ?? '').trim()),
    alamat: String(body.alamat ?? '').trim(),
    tahun_masuk_gmni: Number(body.tahun_masuk_gmni) || null,
    profesi_saat_ini: String(body.profesi_saat_ini ?? '').trim() || null,
  };

  if (!anggota.komisariat_id) return { pesan: 'Asal komisariat wajib dipilih.' };
  if (!anggota.nama_lengkap) return { pesan: 'Nama lengkap wajib diisi.' };
  if (!anggota.tempat_lahir) return { pesan: 'Tempat lahir wajib diisi.' };
  if (!anggota.tanggal_lahir) return { pesan: 'Tanggal lahir wajib diisi.' };
  if (!anggota.alamat) return { pesan: 'Alamat wajib diisi.' };
  if (!anggota.tahun_masuk_gmni) return { pesan: 'Tahun masuk GMNI wajib diisi.' };

  const daftarPendidikan = Array.isArray(body.pendidikan) ? body.pendidikan : [];
  const pendidikan = [];
  for (const item of daftarPendidikan) {
    const nama_kampus = String(item.nama_kampus ?? '').trim();
    const jurusan = String(item.jurusan ?? '').trim();
    const tahun_masuk = Number(item.tahun_masuk) || null;
    if (!nama_kampus && !jurusan) continue;

    if (!nama_kampus || !jurusan || !tahun_masuk) {
      return { pesan: 'Data pendidikan wajib mencantumkan nama kampus, jurusan, dan tahun masuk.' };
    }

    pendidikan.push({
      jenjang: ['D3', 'D4', 'S1', 'S2', 'S3', 'Lainnya'].includes(item.jenjang) ? item.jenjang : 'S1',
      nama_kampus,
      jurusan,
      tahun_masuk,
      tahun_lulus: Number(item.tahun_lulus) || null,
    });
  }

  const daftarOrganisasi = Array.isArray(body.pengalaman_organisasi)
    ? body.pengalaman_organisasi
    : [];
  const pengalaman_organisasi = [];
  for (const item of daftarOrganisasi) {
    const nama_organisasi = String(item.nama_organisasi ?? '').trim();
    const jabatan = String(item.jabatan ?? '').trim();
    const periode_mulai = Number(item.periode_mulai) || null;
    if (!nama_organisasi && !jabatan) continue;

    if (!nama_organisasi || !jabatan || !periode_mulai) {
      return {
        pesan: 'Pengalaman organisasi wajib mencantumkan nama organisasi, jabatan, dan tahun mulai.',
      };
    }

    pengalaman_organisasi.push({
      kategori: item.kategori === 'KAMPUS' ? 'KAMPUS' : 'GMNI',
      nama_organisasi,
      jabatan,
      periode_mulai,
      periode_selesai: Number(item.periode_selesai) || null,
    });
  }

  return { isi: { anggota, pendidikan, pengalaman_organisasi } };
}

const daftar = bungkus(async (req, res) => {
  const cari = String(req.query.q ?? '').trim();
  const komisariatId = Number(req.query.komisariat_id) || null;
  res.json(await model.semua({ cari, komisariatId }));
});

const detail = bungkus(async (req, res) => {
  const anggota = await model.cariLengkap(req.params.id);
  if (!anggota) return res.status(404).json({ message: 'Data anggota tidak ditemukan.' });
  return res.json(anggota);
});

const tambah = bungkus(async (req, res) => {
  const { isi, pesan } = periksa(req.body);
  if (pesan) return res.status(400).json({ message: pesan });
  return res.status(201).json(await model.buat(isi));
});

const ubah = bungkus(async (req, res) => {
  const { isi, pesan } = periksa(req.body);
  if (pesan) return res.status(400).json({ message: pesan });

  const hasil = await model.ubah(req.params.id, isi);
  if (!hasil) return res.status(404).json({ message: 'Data anggota tidak ditemukan.' });
  return res.json(hasil);
});

const hapus = bungkus(async (req, res) => {
  const terhapus = await model.hapus(req.params.id);
  if (!terhapus) return res.status(404).json({ message: 'Data anggota tidak ditemukan.' });
  return res.status(204).end();
});

module.exports = { daftar, detail, tambah, ubah, hapus };
