const express = require('express');
const controller = require('../controllers/anggotaController');
const { cekAuth } = require('../middlewares/authMiddleware');
const { cekRole } = require('../middlewares/roleMiddleware');

const router = express.Router();
const penjagaTulis = [cekAuth, cekRole('admin', 'superadmin')];

router.get('/', controller.daftar);
router.get('/:id', controller.detail);
router.post('/', ...penjagaTulis, controller.tambah);
router.put('/:id', ...penjagaTulis, controller.ubah);
router.delete('/:id', ...penjagaTulis, controller.hapus);

module.exports = router;
