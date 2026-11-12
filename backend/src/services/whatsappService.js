async function kirimOtp({ tujuan, kode, nama, berlakuMenit }) {
  if (!process.env.WA_API_URL) {
    if (process.env.NODE_ENV === 'production') {
      const err = new Error('WA_API_URL belum dikonfigurasi untuk pengiriman OTP WhatsApp.');
      err.status = 500;
      throw err;
    }

    // Mode development: OTP ditampilkan di log server agar alur tetap bisa diuji.
    console.log(`[OTP WHATSAPP] ${tujuan} -> ${kode}`);
    return {
      terkirim: false,
      jalur: 'WHATSAPP',
      alasan: 'WA_API_URL belum dikonfigurasi (mode development).',
    };
  }

  const pesan = `Halo ${nama || 'Kader'}, kode OTP GMNI Anda adalah ${kode}. Kode berlaku ${
    berlakuMenit || 5
  } menit. Jangan bagikan kode ini kepada siapa pun.`;

  const respons = await fetch(process.env.WA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.WA_API_KEY
        ? { Authorization: `Bearer ${process.env.WA_API_KEY}` }
        : {}),
    },
    body: JSON.stringify({ target: tujuan, message: pesan }),
  });

  if (!respons.ok) {
    const err = new Error('Gagal mengirim OTP melalui WhatsApp Gateway.');
    err.status = 502;
    throw err;
  }

  return { terkirim: true, jalur: 'WHATSAPP' };
}

module.exports = { kirimOtp };
