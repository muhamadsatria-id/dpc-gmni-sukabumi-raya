const controller = require('../controllers/beritaController');
const buatRoutes = require('./baseCrudRoutes');
const upload = require('../config/multer');

module.exports = buatRoutes({
  controller,
  unggah: upload.single('file'),
});
