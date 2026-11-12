const model = require('../models/timelineModel');
const buatController = require('./baseCrudController');
const { normalisasiDatetime } = require('../utils/dataHelper');

function rapikanTanggal(data) {
  if (data.waktu_mulai !== undefined) {
    data.waktu_mulai = normalisasiDatetime(data.waktu_mulai);
  }
  if (data.waktu_selesai !== undefined) {
    data.waktu_selesai = normalisasiDatetime(data.waktu_selesai);
  }
}

module.exports = buatController({
  model,
  label: 'Agenda',
  wajib: ['nama_kegiatan', 'waktu_mulai'],
  sebelumSimpan: rapikanTanggal,
  sebelumUbah: rapikanTanggal,
});
