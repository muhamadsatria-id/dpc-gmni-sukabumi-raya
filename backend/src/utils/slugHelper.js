function buatSlug(teks) {
  return String(teks ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200);
}

// cekSlug harus mengembalikan nilai truthy jika slug sudah dipakai.
async function buatSlugUnik(teks, cekSlug) {
  const dasar = buatSlug(teks) || 'tanpa-judul';
  let slug = dasar;
  let urutan = 1;

  while (await cekSlug(slug)) {
    urutan += 1;
    slug = `${dasar}-${urutan}`;
  }

  return slug;
}

module.exports = { buatSlug, buatSlugUnik };
