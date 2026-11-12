const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', waktu: new Date().toISOString() });
});

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/komisariat', require('./komisariatRoutes'));
router.use('/anggota', require('./anggotaRoutes'));
router.use('/struktural', require('./strukturalRoutes'));
router.use('/berita', require('./beritaRoutes'));
router.use('/timeline', require('./timelineRoutes'));
router.use('/galeri', require('./galeriRoutes'));
router.use('/tentang-kami', require('./tentangKamiRoutes'));
router.use('/karya-ilmiah', require('./karyaIlmiahRoutes'));

module.exports = router;
