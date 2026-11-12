const bcrypt = require('bcryptjs');
const { jalankan } = require('../../config/db');

const AKUN_DEFAULT = [
  {
    nama: 'Super Admin GMNI',
    email: 'superadmin@gmni.local',
    no_wa: '6280000000001',
    password: 'Superadmin123!',
    role: 'superadmin',
    anggotaIndex: null,
  },
  {
    nama: 'Admin Pengurus GMNI',
    email: 'admin@gmni.local',
    no_wa: '6280000000002',
    password: 'Admin123!',
    role: 'admin',
    anggotaIndex: 0,
  },
  {
    nama: 'Anggota GMNI',
    email: 'anggota@gmni.local',
    no_wa: '6280000000003',
    password: 'Anggota123!',
    role: 'anggota',
    anggotaIndex: 1,
  },
];

module.exports = {
  nama: 'userSeeder',
  async jalankan() {
    const [anggota] = await jalankan('SELECT id FROM `anggota` ORDER BY id ASC');

    for (const akun of AKUN_DEFAULT) {
      const [sudahAda] = await jalankan('SELECT id FROM `users` WHERE email = ? LIMIT 1', [
        akun.email,
      ]);
      if (sudahAda.length > 0) {
        console.log(`  -> ${akun.email} sudah ada, dilewati.`);
        continue;
      }

      const anggotaId =
        akun.anggotaIndex === null ? null : anggota[akun.anggotaIndex]?.id ?? null;

      await jalankan('INSERT INTO `users` SET ?', [
        {
          anggota_id: anggotaId,
          nama: akun.nama,
          email: akun.email,
          no_wa: akun.no_wa,
          password: await bcrypt.hash(akun.password, 10),
          role: akun.role,
          metode_otp: 'EMAIL',
          status_aktif: 1,
        },
      ]);

      console.log(`  -> akun ${akun.role}: ${akun.email} / ${akun.password}`);
    }
  },
};
