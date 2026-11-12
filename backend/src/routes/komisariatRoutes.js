const controller = require('../controllers/komisariatController');
const buatRoutes = require('./baseCrudRoutes');

module.exports = buatRoutes({
  controller,
  roleTulis: ['superadmin'],
});
