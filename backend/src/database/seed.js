const { jalankan, tutupPool } = require('../config/db');

const daftarSeeder = [
  require('./seeders/komisariatSeeder'),
  require('./seeders/anggotaSeeder'),
  require('./seeders/userSeeder'),
  require('./seeders/kontenSeeder'),
];

async function jalankanSeed() {
  try {
    await jalankan('SELECT 1 FROM `migrations` LIMIT 1');
  } catch (err) {
    throw new Error(
      'Tabel migrations belum ada. Jalankan `npm run migrate` terlebih dahulu.'
    );
  }

  for (const seeder of daftarSeeder) {
    console.log(`[seed] ${seeder.nama}`);
    await seeder.jalankan();
  }

  console.log('[seed] Selesai.');
}

jalankanSeed()
  .catch((err) => {
    console.error('[seed] Gagal:', err.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await tutupPool();
  });
