const model = require('../models/komisariatModel');
const buatController = require('./baseCrudController');

module.exports = buatController({
  model,
  label: 'Komisariat',
  wajib: ['nama'],
});
