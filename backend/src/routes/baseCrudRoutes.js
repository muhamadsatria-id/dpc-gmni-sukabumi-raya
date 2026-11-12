const express = require('express');
const { cekAuth } = require('../middlewares/authMiddleware');
const { cekRole } = require('../middlewares/roleMiddleware');

function buatRoutes({ controller, unggah, roleTulis = ['admin', 'superadmin'] }) {
  const router = express.Router();
  const penjagaTulis = [cekAuth, cekRole(...roleTulis)];
  const middlewareUnggah = unggah || ((req, res, next) => next());

  router.get('/', controller.daftar);
  router.get('/:id', controller.detail);
  router.post('/', ...penjagaTulis, middlewareUnggah, controller.tambah);
  router.put('/:id', ...penjagaTulis, middlewareUnggah, controller.ubah);
  router.delete('/:id', ...penjagaTulis, controller.hapus);

  return router;
}

module.exports = buatRoutes;
