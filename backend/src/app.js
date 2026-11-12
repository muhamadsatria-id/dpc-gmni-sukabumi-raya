require('dotenv').config({ quiet: true });

const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
const { tidakDitemukan, penangananError } = require('./middlewares/errorMiddleware');
const { cekKoneksi, tutupPool } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// File upload dapat diakses lewat /uploads/<nama-file>.
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/', (req, res) => {
  res.json({
    nama: 'API GMNI',
    status: 'aktif',
    dokumentasi: '/api/health',
  });
});

app.use('/api', routes);

app.use(tidakDitemukan);
app.use(penangananError);

async function mulai() {
  try {
    await cekKoneksi();
  } catch (err) {
    console.error('Gagal terhubung ke MySQL:', err.message);
    console.error('Pastikan MySQL menyala dan database sudah dibuat.');
    console.error('Jalankan `npm run migrate` untuk menyiapkan database.');
    process.exit(1);
  }

  const server = app.listen(PORT, () => {
    console.log(`API GMNI berjalan di http://localhost:${PORT}`);
  });

  const hentikan = async () => {
    server.close(async () => {
      await tutupPool();
      process.exit(0);
    });
  };

  process.on('SIGINT', hentikan);
  process.on('SIGTERM', hentikan);
}

if (require.main === module) mulai();

module.exports = app;
