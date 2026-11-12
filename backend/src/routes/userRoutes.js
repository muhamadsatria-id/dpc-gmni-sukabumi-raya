const express = require('express');
const controller = require('../controllers/userController');
const { cekAuth } = require('../middlewares/authMiddleware');
const { cekRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Seluruh manajemen akun hanya untuk Superadmin.
router.use(cekAuth, cekRole('superadmin'));

router.get('/', controller.daftar);
router.get('/:id', controller.detail);
router.post('/', controller.tambah);
router.put('/:id', controller.ubah);
router.delete('/:id', controller.hapus);

module.exports = router;
