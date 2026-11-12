function tidakDitemukan(req, res) {
  res.status(404).json({
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan.`,
  });
}

function penangananError(err, req, res, next) {
  if (res.headersSent) return next(err);

  // Error umum dari MySQL.
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ message: 'Data sudah terdaftar (duplikat).' });
  }
  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({ message: 'Data relasi yang dipilih tidak valid.' });
  }
  if (err.code === 'ER_ROW_IS_REFERENCED_2') {
    return res.status(409).json({ message: 'Data tidak dapat dihapus karena masih digunakan.' });
  }
  if (
    [
      'ER_BAD_NULL_ERROR',
      'ER_NO_DEFAULT_FOR_FIELD',
      'ER_TRUNCATED_WRONG_VALUE',
      'WARN_DATA_TRUNCATED',
      'ER_WRONG_VALUE_FOR_TYPE',
    ].includes(err.code)
  ) {
    return res
      .status(400)
      .json({ message: 'Data yang dikirim tidak valid atau ada field wajib yang kosong.' });
  }

  // Error upload dari multer.
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'Ukuran file terlalu besar (maksimal 5 MB).' });
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({ message: 'Field upload tidak dikenali.' });
  }

  const status = err.status || 500;
  if (status >= 500) console.error(err);

  return res.status(status).json({
    message: err.message || 'Terjadi kesalahan pada server.',
  });
}

module.exports = { tidakDitemukan, penangananError };
