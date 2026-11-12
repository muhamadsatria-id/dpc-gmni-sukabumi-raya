const { faker } = require('@faker-js/faker');
const { jalankan } = require('../../config/db');
const { buatSlug } = require('../../utils/slugHelper');

const JUDUL_BERITA = [
  'GMNI Gelar Diskusi Publik tentang Pendidikan Gratis',
  'Rilis Sikap GMNI Menanggapi Kebijakan Kampus',
  'Kader GMNI Ikuti Pelatihan Kepemimpinan Nasional',
];

const JUDUL_KARYA = [
  'Menakar Arah Politik Pendidikan di Indonesia',
  'Peran Mahasiswa dalam Pengawasan Anggaran Daerah',
];

function waktuMendatang(hari) {
  const tanggal = new Date();
  tanggal.setDate(tanggal.getDate() + hari);
  return tanggal;
}

function formatDatetime(tanggal) {
  return tanggal.toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = {
  nama: 'kontenSeeder',
  async jalankan() {
    const [berita] = await jalankan('SELECT COUNT(*) AS total FROM `berita`');
    if (berita[0].total === 0) {
      for (const judul of JUDUL_BERITA) {
        await jalankan('INSERT INTO `berita` SET ?', [
          {
            judul,
            slug: buatSlug(judul),
            deskripsi: faker.lorem.sentence({ min: 12, max: 20 }),
            isi: faker.lorem.paragraphs({ min: 3, max: 5 }, '\n\n'),
            referensi: faker.internet.url(),
            penulis: 'Redaksi GMNI',
            status: 'PUBLISHED',
          },
        ]);
      }
      console.log(`  -> ${JUDUL_BERITA.length} berita dummy ditambahkan.`);
    }

    const [timeline] = await jalankan('SELECT COUNT(*) AS total FROM `timeline_kalender`');
    if (timeline[0].total === 0) {
      const agenda = [
        'Rapat Kerja Cabang',
        'Diskusi Publik Bulanan',
        'Pendidikan Kader Dasar',
      ];

      for (let i = 0; i < agenda.length; i += 1) {
        const mulai = waktuMendatang(7 + i * 14);
        await jalankan('INSERT INTO `timeline_kalender` SET ?', [
          {
            nama_kegiatan: agenda[i],
            waktu_mulai: formatDatetime(mulai),
            waktu_selesai: formatDatetime(new Date(mulai.getTime() + 3 * 60 * 60 * 1000)),
            lokasi: faker.location.city(),
            deskripsi: faker.lorem.sentence(),
          },
        ]);
      }
      console.log(`  -> ${agenda.length} agenda dummy ditambahkan.`);
    }

    const [galeri] = await jalankan('SELECT COUNT(*) AS total FROM `galeri`');
    if (galeri[0].total === 0) {
      for (let i = 0; i < 4; i += 1) {
        await jalankan('INSERT INTO `galeri` SET ?', [
          {
            judul: `Dokumentasi Kegiatan ${i + 1}`,
            ringkasan: faker.lorem.sentence(),
            file: `https://picsum.photos/seed/gmni-galeri-${i + 1}/1200/800`,
            tanggal_kegiatan: faker.date.past({ years: 2 }).toISOString().slice(0, 10),
          },
        ]);
      }
      console.log('  -> 4 foto galeri dummy ditambahkan.');
    }

    const [tentang] = await jalankan('SELECT COUNT(*) AS total FROM `tentang_kami`');
    if (tentang[0].total === 0) {
      await jalankan('INSERT INTO `tentang_kami` SET ?', [
        {
          deskripsi:
            'Gerakan Mahasiswa Nasional Indonesia (GMNI) adalah organisasi kemahasiswaan yang berlandaskan Marhaenisme dan berkomitmen memperjuangkan kepentingan rakyat.',
          visi:
            'Mewujudkan Indonesia yang berdaulat, mandiri, dan berkeadilan sosial bagi seluruh rakyat.',
          misi:
            'Membangun kader yang kritis dan berintegritas; memperkuat pendidikan politik rakyat; serta mendorong kebijakan publik yang berpihak pada kelompok marjinal.',
        },
      ]);
      console.log('  -> profil tentang_kami ditambahkan.');
    }

    const [karya] = await jalankan('SELECT COUNT(*) AS total FROM `karya_ilmiah`');
    if (karya[0].total === 0) {
      for (let i = 0; i < JUDUL_KARYA.length; i += 1) {
        await jalankan('INSERT INTO `karya_ilmiah` SET ?', [
          {
            judul: JUDUL_KARYA[i],
            slug: buatSlug(JUDUL_KARYA[i]),
            penulis: faker.person.fullName(),
            ringkasan: faker.lorem.sentence({ min: 15, max: 25 }),
            isi: faker.lorem.paragraphs({ min: 4, max: 6 }, '\n\n'),
            referensi: faker.internet.url(),
            gambar: `https://picsum.photos/seed/gmni-karya-${i + 1}/1200/800`,
          },
        ]);
      }
      console.log(`  -> ${JUDUL_KARYA.length} karya ilmiah dummy ditambahkan.`);
    }
  },
};
