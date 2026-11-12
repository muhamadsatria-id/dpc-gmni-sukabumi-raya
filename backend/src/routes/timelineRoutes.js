const controller = require('../controllers/timelineController');
const buatRoutes = require('./baseCrudRoutes');

module.exports = buatRoutes({ controller });
