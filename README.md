# Englishlink Translator — Website

Situs statis dua bahasa (ID + EN) dengan blog. Tanpa database.

- `src/data/id.mjs`, `src/data/en.mjs` — semua teks halaman.
- `src/content/blog/id/*.md` — artikel. Tambah file baru = artikel baru.
- `src/content/topics-queue.md` — antrean topik artikel otomatis.
- `CONTENT-GUIDE.md` — gaya bahasa dan aturan artikel. `DESIGN.md` — aturan desain.
- `npm run build` → folder `dist/` siap upload. `node check.mjs` → cek link dan SEO.
- `npm run preview` → `preview/index.html` (demo satu file).

Push ke branch `main` akan otomatis terbit lewat GitHub Pages (`.github/workflows/deploy.yml`).
Untuk domain sendiri, buat file `CNAME` berisi `englishlink.co.id` di folder utama.
