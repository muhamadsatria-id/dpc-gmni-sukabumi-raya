const { faker } = require('@faker-js/faker');
const { jalankan, ambilKoneksi } = require('../../config/db');

const NAMA_KADER = [
  'Ahmad Ibrahim Maqbul',
  'Siti Rahmawati',
  'Budi Santoso',
  'Dewi Lestari',
  'Rizky Pratama',
  'Nur Aisyah',
  'Fajar Nugroho',
  'Intan Permata',
  'Hendra Wijaya',
  'Maya Kusuma',
  'Yoga Saputra',
  'Lina Marlina',
];

const KAMPUS = [
  'Universitas Indonesia',
  'Universitas Gadjah Mada',
  'Institut Teknologi Bandung',
  'Universitas Airlangga',
  'Universitas Hasanuddin',
  'Universitas Diponegoro',
];

const JURUSAN = [
  'Ilmu Hukum',
  'Ilmu Politik',
  'Sosiologi',
  'Manajemen',
  'Teknik Informatika',
  'Ilmu Komunikasi',
  'Ekonomi Pembangunan',
];

const PROFESI = [
  'Mahasiswa',
  'Advokat',
  'Peneliti',
  'Jurnalis',
  'Karyawan Swasta',
  'Wirausaha',
  'Guru',
];

const JABATAN_GMNI = ['Ketua', 'Sekretaris', 'Bendahara', 'Koordinator Bidang', 'Anggota'];
const JABATAN_KAMPUS = ['Ketua BEM', 'Sekretaris BEM', 'Ketua Himpunan', 'Anggota Senat'];

function tanggalLahir() {
  return faker.date.birthdate({ min: 19, max: 32, mode: 'age' }).toISOString().slice(0, 10);
}

function tahunMasuk() {
  return faker.number.int({ min: 2015, max: 2024 });
}

module.exports = {
  nama: 'anggotaSeeder',
  async jalankan() {
    const [baris] = await jalankan('SELECT COUNT(*) AS total FROM `anggota`');
    if (baris[0].total > 0) {
      console.log('  -> dilewati, tabel anggota sudah berisi data.');
      return;
    }

    const [komisariat] = await jalankan('SELECT id FROM `komisariat` ORDER BY id ASC');
    if (komisariat.length === 0) {
      throw new Error('Data komisariat kosong. Jalankan komisariatSeeder terlebih dahulu.');
    }

    const koneksi = await ambilKoneksi();

    try {
      await koneksi.beginTransaction();

      for (let i = 0; i < NAMA_KADER.length; i += 1) {
        const komisariatId = komisariat[i % komisariat.length].id;

        const [hasil] = await koneksi.query('INSERT INTO `anggota` SET ?', [
          {
            komisariat_id: komisariatId,
            nama_lengkap: NAMA_KADER[i],
            nama_panggilan: NAMA_KADER[i].split(' ')[0],
            tempat_lahir: faker.location.city(),
            tanggal_lahir: tanggalLahir(),
            alamat: faker.location.streetAddress({ useFullAddress: true }),
            tahun_masuk_gmni: tahunMasuk(),
            profesi_saat_ini: faker.helpers.arrayElement(PROFESI),
          },
        ]);

        const anggotaId = hasil.insertId;

        await koneksi.query('INSERT INTO `anggota_pendidikan` SET ?', [
          {
            anggota_id: anggotaId,
            jenjang: faker.helpers.arrayElement(['S1', 'S1', 'S2', 'D4']),
            nama_kampus: faker.helpers.arrayElement(KAMPUS),
            jurusan: faker.helpers.arrayElement(JURUSAN),
            tahun_masuk: tahunMasuk(),
            tahun_lulus: faker.helpers.maybe(() => tahunMasuk(), { probability: 0.6 }),
          },
        ]);

        await koneksi.query('INSERT INTO `anggota_pengalaman_organisasi` SET ?', [
          {
            anggota_id: anggotaId,
            kategori: 'GMNI',
            nama_organisasi: 'GMNI',
            jabatan: faker.helpers.arrayElement(JABATAN_GMNI),
            periode_mulai: tahunMasuk(),
            periode_selesai: faker.helpers.maybe(() => tahunMasuk(), { probability: 0.5 }),
          },
        ]);

        if (faker.datatype.boolean()) {
          await koneksi.query('INSERT INTO `anggota_pengalaman_organisasi` SET ?', [
            {
              anggota_id: anggotaId,
              kategori: 'KAMPUS',
              nama_organisasi: faker.helpers.arrayElement(['BEM', 'Himpunan Mahasiswa', 'Senat Mahasiswa']),
              jabatan: faker.helpers.arrayElement(JABATAN_KAMPUS),
              periode_mulai: tahunMasuk(),
              periode_selesai: faker.helpers.maybe(() => tahunMasuk(), { probability: 0.5 }),
            },
          ]);
        }
      }

      await koneksi.commit();
      console.log(`  -> ${NAMA_KADER.length} anggota dummy ditambahkan.`);
    } catch (err) {
      await koneksi.rollback();
      throw err;
    } finally {
      koneksi.release();
    }
  },
};
