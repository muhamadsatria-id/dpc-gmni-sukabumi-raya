function gagal(status, message) {
  const err = new Error(message);
  err.status = status;
  throw err;
}

function wajibIsi(data, daftarWajib) {
  const kurang = daftarWajib.filter(
    (nama) => data[nama] === undefined || data[nama] === null || String(data[nama]).trim() === ''
  );

  if (kurang.length > 0) {
    gagal(400, `Wajib mengisi: ${kurang.join(', ')}.`);
  }
}

function normalisasiWa(nomor) {
  let digit = String(nomor ?? '').replace(/\D/g, '');
  if (digit.startsWith('0')) digit = `62${digit.slice(1)}`;
  if (digit.startsWith('8')) digit = `62${digit}`;
  return digit;
}

module.exports = { gagal, wajibIsi, normalisasiWa };
