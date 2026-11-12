const nodemailer = require('nodemailer');

let transporter;

function amanHtml(teks) {
  return String(teks ?? '').replace(
    /[&<>"']/g,
    (karakter) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[karakter]
  );
}

function dapatkanTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || '' }
        : undefined,
    });
  }
  return transporter;
}

async function kirimOtp({ tujuan, kode, nama, berlakuMenit }) {
  if (!process.env.SMTP_HOST) {
    if (process.env.NODE_ENV === 'production') {
      const err = new Error('SMTP belum dikonfigurasi untuk pengiriman OTP email.');
      err.status = 500;
      throw err;
    }

    // Mode development: OTP ditampilkan di log server agar alur tetap bisa diuji.
    console.log(`[OTP EMAIL] ${tujuan} -> ${kode}`);
    return { terkirim: false, jalur: 'EMAIL', alasan: 'SMTP belum dikonfigurasi (mode development).' };
  }

  await dapatkanTransporter().sendMail({
    from: process.env.SMTP_FROM || 'GMNI <no-reply@gmni.local>',
    to: tujuan,
    subject: 'Kode OTP GMNI',
    text: `Halo ${nama || 'Kader'}, kode OTP Anda adalah ${kode}. Kode berlaku ${berlakuMenit || 5} menit. Jangan bagikan kode ini kepada siapa pun.`,
    html: `<p>Halo <strong>${amanHtml(nama || 'Kader')}</strong>,</p>
      <p>Kode OTP Anda adalah:</p>
      <p style="font-size:28px;font-weight:bold;letter-spacing:6px">${kode}</p>
      <p>Kode berlaku ${berlakuMenit || 5} menit. Jangan bagikan kode ini kepada siapa pun.</p>`,
  });

  return { terkirim: true, jalur: 'EMAIL' };
}

module.exports = { kirimOtp };
