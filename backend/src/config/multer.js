const multer = require('multer');
const path = require('path');
const fs = require('fs');

const FOLDER_UPLOAD = path.join(__dirname, '..', '..', 'uploads');
fs.mkdirSync(FOLDER_UPLOAD, { recursive: true });

const penyimpanan = multer.diskStorage({
  destination: (req, file, cb) => cb(null, FOLDER_UPLOAD),
  filename: (req, file, cb) => {
    const unik = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unik}${path.extname(file.originalname).toLowerCase()}`);
  },
});

const MIME_DIIZINKAN = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
];

function filterFile(req, file, cb) {
  if (!MIME_DIIZINKAN.includes(file.mimetype)) {
    const err = new Error('Format file tidak didukung. Gunakan JPG, PNG, WEBP, GIF, atau PDF.');
    err.status = 400;
    return cb(err);
  }
  return cb(null, true);
}

const upload = multer({
  storage: penyimpanan,
  fileFilter: filterFile,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
