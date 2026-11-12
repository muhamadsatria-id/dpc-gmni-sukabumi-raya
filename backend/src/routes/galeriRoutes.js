const controller = require('../controllers/galeriController');
const buatRoutes = require('./baseCrudRoutes');
const upload = require('../config/multer');

module.exports = buatRoutes({
  controller,
  unggah: upload.single('file'),
});
