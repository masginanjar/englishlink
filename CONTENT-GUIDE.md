# Panduan Konten & Artikel Otomatis — Englishlink Translator

Dipakai oleh penulis manusia maupun AI yang menulis artikel terjadwal.

## Gaya bahasa
- Santai, jelas, pakai "kamu" dan "kami". Kalimat pendek. Gampang dipahami Gen Z.
- Boleh kata sehari-hari (nggak, biar, ribet, mepet), secukupnya. Tanpa slang yang cepat basi, tanpa emoji.
- Langsung ke inti. Jelaskan istilah resmi dengan bahasa sehari-hari.

## Aturan fakta (wajib)
- Jangan menulis harga, lama pengerjaan pasti, ulasan, jumlah klien, penghargaan, atau garansi.
- Jangan mengarang aturan hukum, nomor peraturan, atau syarat kedutaan. Hal seperti itu hanya boleh ditulis kalau diambil dari sumber resmi yang ditautkan (lihat aturan info terkini). Kalau tidak yakin, tulis "ikuti syarat resmi dari instansi tujuan".
- Fakta usaha yang boleh dipakai: brand dari PT. Penerjemah Tersumpah Indonesia; fokus Inggris ⇄ Indonesia; juga membantu apostille dan legalisasi notaris, kedutaan, kementerian; WhatsApp 0851-7413-2344; info@englishlink.co.id; Caraka Tower, Jakarta Selatan; buka Senin–Minggu 08.00–20.00 WIB.

## Dua artikel per hari

| Slot | Isi | `kicker` yang dipakai |
|---|---|---|
| Pagi | Info terkini seputar penerjemah tersumpah, dokumen untuk luar negeri, tips urus dokumen, atau beasiswa | Info terkini, Tips, Beasiswa |
| Sore | Belajar bahasa Inggris: kosakata, grammar, ungkapan, tips TOEFL/IELTS, bahasa Inggris untuk kerja dan kuliah | Belajar Inggris |

### Cara memilih topik (ide yang ramai kemarin)
1. Cari lewat pencarian web apa yang ramai dibicarakan di Indonesia dalam 1–2 hari terakhir sesuai slotnya. Pagi: pengumuman beasiswa (LPDP dan beasiswa luar negeri lain), aturan visa atau dokumen, apostille, berita kuliah dan kerja di luar negeri. Sore: topik belajar bahasa Inggris yang sedang banyak dicari atau dibahas.
2. Pilih satu yang benar-benar berguna untuk pembaca Englishlink (pelajar, pencari beasiswa, pekerja, keluarga yang mengurus dokumen) dan belum pernah ditulis di `src/content/blog/id/`.
3. Kalau tidak ada yang ramai dan bisa dipastikan kebenarannya, ambil topik teratas dari `src/content/topics-queue.md` (pagi) atau tulis materi belajar bahasa Inggris yang selalu dicari (sore).
4. Jangan ikut topik politik, gosip, SARA, bencana, atau kontroversi. Jangan menyalin tulisan orang lain; tulis ulang dengan sudut pandang sendiri.

### Aturan tambahan untuk info terkini
- Setiap tanggal, tenggat, syarat, atau angka dari berita harus berasal dari sumber resmi (situs lembaga pemberi beasiswa, kementerian, kedutaan) yang dibuka di sesi itu, dan diberi tautan di bagian `## Sumber` di akhir artikel, sebelum `## FAQ`.
- Tulis "per <tanggal hari ini>" untuk informasi yang bisa berubah, dan ajak pembaca mengecek halaman resminya.
- Kalau sumber resminya tidak ketemu atau saling bertentangan, jangan tulis topik itu.
- Artikel belajar bahasa Inggris: contoh kalimat harus benar secara tata bahasa, sertakan arti Indonesianya, dan pakai tabel atau daftar supaya gampang dipindai. Di akhir isi boleh ada satu kalimat penghubung yang wajar ke layanan (misalnya dokumen untuk kuliah di luar negeri), tidak lebih.

## Format artikel
File: `src/content/blog/id/<slug-huruf-kecil>.md`

```
---
title: Judul maksimal 60 karakter, mengandung kata kunci
description: 120–155 karakter, menjawab inti pertanyaan
date: YYYY-MM-DD
keywords: kata kunci utama, kata kunci kedua, kata kunci ketiga
kicker: Satu kata label, misalnya Panduan, Tips, Dasar, Perbandingan, Tanya jawab
coverText: Judul singkat untuk gambar cover, maksimal 6 kata, harus bisa dipahami tanpa membuka artikel
cover: nama-gambar (pilih dari daftar cover di bawah)
answer: Jawaban langsung 2–3 kalimat. Ini yang paling mungkin dikutip Google dan AI.
---
```

Isi (500–800 kata):
1. Pembuka 1–2 kalimat.
2. 3–5 bagian `##`, sebagian berbentuk pertanyaan.
3. Minimal satu daftar bernomor atau tabel.
4. Bagian `## FAQ` berisi 3 pertanyaan `###` dengan jawaban 1–3 kalimat. Otomatis jadi schema FAQ.

Jangan menulis H1 di isi (judul sudah jadi H1) dan jangan menambah ajakan WhatsApp di akhir (sudah otomatis).

## Daftar cover (src/img/covers/)
Pilih satu yang paling cocok dengan isi artikel, tulis namanya di `cover:`. Kalau dikosongkan, dipakai `periksa`.

| Nama | Gambar | Cocok untuk |
|---|---|---|
| stempel | Stempel dan perisai centang | Penerjemah tersumpah, keabsahan, kepercayaan |
| timbangan, timbangan-2 | Timbangan dua dokumen | Perbandingan, pilihan, aturan |
| ijazah | Ijazah berbingkai dan pensil | Ijazah, transkrip, sekolah |
| periksa | Kaca pembesar, kalender, checklist | Tips, cek ulang, persiapan |
| svc-0 | Kamus ke dokumen | Inggris ke Indonesia |
| svc-1 | Dokumen ke bola dunia | Indonesia ke Inggris, luar negeri |
| svc-2 | Sertifikat bersegel dan stempel | Dokumen resmi, akta |
| svc-3 | Toga dan buku | Kuliah, beasiswa |
| svc-4 | Gedung, tas, kontrak | Perusahaan, bisnis, hukum |
| svc-5 | Paspor, koper, pesawat | Visa, studi di luar negeri |
| svc-6 | HP memindai dokumen | Scan, foto, pesan online |

## Alur terbit otomatis
1. Ambil topik teratas yang belum dicentang di `src/content/topics-queue.md`.
2. Tulis artikelnya sesuai format di atas, tanggal hari ini.
3. Centang topik itu di antrean.
4. Jalankan `npm run build` lalu `node check.mjs`. Harus 0 masalah.
5. Commit dan push ke branch `main`. Situs terbit otomatis lewat GitHub Actions.
6. Kalau antrean habis, tambahkan 10 topik baru yang relevan dengan kata kunci di bawah.

## Kata kunci sasaran
penerjemah tersumpah bahasa Inggris · jasa translate Inggris ke Indonesia tersumpah · jasa translate Indonesia ke Inggris tersumpah · penerjemah dokumen bahasa Inggris · jasa terjemahan ijazah bahasa Inggris · penerjemah tersumpah online · jasa terjemahan akta kelahiran bahasa Inggris
