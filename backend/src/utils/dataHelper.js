// Mengambil hanya kolom yang diizinkan dari body request.
function pilih(data, kolom) {
  const hasil = {};
  for (const nama of kolom) {
    if (data[nama] !== undefined) hasil[nama] = data[nama];
  }
  return hasil;
}

function kosong(objek) {
  return Object.keys(objek).length === 0;
}

// Menerima "YYYY-MM-DD HH:mm[:ss]" atau ISO string.
function normalisasiDatetime(nilai) {
  if (!nilai) return nilai;
  const teks = String(nilai).trim();
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/.test(teks)) return teks;

  const tanggal = new Date(teks);
  if (Number.isNaN(tanggal.getTime())) return teks;
  return tanggal.toISOString().slice(0, 19).replace('T', ' ');
}

// Menerima "YYYY-MM-DD" atau ISO string.
function normalisasiTanggal(nilai) {
  if (!nilai) return nilai;
  const teks = String(nilai).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(teks)) return teks;

  const tanggal = new Date(teks);
  if (Number.isNaN(tanggal.getTime())) return teks;
  return tanggal.toISOString().slice(0, 10);
}

module.exports = { pilih, kosong, normalisasiDatetime, normalisasiTanggal };
