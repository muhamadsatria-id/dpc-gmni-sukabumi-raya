const controller = require('../controllers/tentangKamiController');
const buatRoutes = require('./baseCrudRoutes');
const upload = require('../config/multer');

module.exports = buatRoutes({
  controller,
  unggah: upload.single('gambar'),
});
