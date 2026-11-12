const express = require('express');
const controller = require('../controllers/authController');
const { cekAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/daftar', controller.daftar);
router.post('/masuk', controller.masuk);
router.post('/verifikasi-otp', controller.verifikasiOtp);
router.post('/kirim-ulang-otp', controller.kirimUlangOtp);
router.post('/lupa-password', controller.lupaPassword);
router.post('/reset-password', controller.resetPassword);
router.post('/segarkan-token', controller.segarkanToken);
router.post('/keluar', controller.keluar);
router.get('/saya', cekAuth, controller.saya);

module.exports = router;
