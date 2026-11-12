const controller = require('../controllers/strukturalController');
const buatRoutes = require('./baseCrudRoutes');
const upload = require('../config/multer');

module.exports = buatRoutes({
  controller,
  unggah: upload.single('foto'),
});
