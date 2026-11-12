const fs = require('fs/promises');
const path = require('path');

const FOLDER_UPLOAD = path.join(__dirname, '..', '..', 'uploads');

// Menghapus file upload lama berdasarkan URL/path yang tersimpan di database.
async function hapusFile(lokasi) {
  if (!lokasi || !lokasi.startsWith('/uploads/')) return;

  const namaFile = path.basename(lokasi);
  if (!namaFile) return;

  try {
    await fs.unlink(path.join(FOLDER_UPLOAD, namaFile));
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}

module.exports = { hapusFile, FOLDER_UPLOAD };
