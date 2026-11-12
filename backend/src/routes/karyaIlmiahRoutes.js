const controller = require('../controllers/karyaIlmiahController');
const buatRoutes = require('./baseCrudRoutes');
const upload = require('../config/multer');

const unggah = upload.fields([
  { name: 'gambar', maxCount: 1 },
  { name: 'file', maxCount: 1 },
]);

module.exports = buatRoutes({ controller, unggah });
