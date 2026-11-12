const jwt = require('jsonwebtoken');
const { bungkus } = require('../utils/asyncHandler');

function rahasiaJwt() {
  if (!process.env.JWT_SECRET) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET wajib diisi di environment production.');
    }
    return 'gmni-dev-secret-ganti-sebelum-production';
  }
  return process.env.JWT_SECRET;
}

function buatAccessToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role, nama: user.nama, email: user.email },
    rahasiaJwt(),
    { expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m' }
  );
}

const cekAuth = bungkus(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const [skema, token] = header.split(' ');

  if (skema !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Token autentikasi tidak ditemukan.' });
  }

  try {
    const payload = jwt.verify(token, rahasiaJwt());

    // Token reset password tidak boleh dipakai untuk mengakses endpoint biasa.
    if (payload.scope) {
      return res.status(401).json({ message: 'Token tidak valid untuk akses ini.' });
    }

    req.user = {
      id: payload.sub,
      role: payload.role,
      nama: payload.nama,
      email: payload.email,
    };
    return next();
  } catch (err) {
    const pesan =
      err.name === 'TokenExpiredError'
        ? 'Sesi telah berakhir, silakan login ulang.'
        : 'Token autentikasi tidak valid.';
    return res.status(401).json({ message: pesan });
  }
});

module.exports = { cekAuth, buatAccessToken, rahasiaJwt };
