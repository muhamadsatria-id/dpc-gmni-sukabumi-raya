// Contoh pemakaian: router.delete('/:id', cekAuth, cekRole('superadmin'), ...)
function cekRole(...roleDiizinkan) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: 'Autentikasi diperlukan.' });
    }

    if (!roleDiizinkan.includes(req.user.role)) {
      return res.status(403).json({ message: 'Anda tidak memiliki akses ke aksi ini.' });
    }

    return next();
  };
}

module.exports = { cekRole };
