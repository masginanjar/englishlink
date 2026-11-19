# Panduan Konten & Artikel Otomatis — Englishlink Translator

Dipakai oleh penulis manusia maupun AI yang menulis artikel terjadwal.

## Gaya bahasa
- Santai, jelas, pakai "kamu" dan "kami". Kalimat pendek. Gampang dipahami Gen Z.
- Boleh kata sehari-hari (nggak, biar, ribet, mepet), secukupnya. Tanpa slang yang cepat basi, tanpa emoji.
- Langsung ke inti. Jelaskan istilah resmi dengan bahasa sehari-hari.

## Aturan fakta (wajib)
- Jangan menulis harga, lama pengerjaan pasti, ulasan, jumlah klien, penghargaan, atau garansi.
- Jangan mengarang aturan hukum, nomor peraturan, atau syarat kedutaan. Hal seperti itu hanya boleh ditulis kalau diambil dari sumber resmi yang ditautkan (lihat aturan info terkini). Kalau tidak yakin, tulis "ikuti syarat resmi dari instansi tujuan".
- Fakta usaha yang boleh dipakai: brand dari PT. Penerjemah Tersumpah Indonesia; fokus Inggris ⇄ Indonesia; juga membantu apostille dan legalisasi notaris, kedutaan, kementerian; WhatsApp 0851-7413-2344; info@englishlink.co.id; Caraka Tower, Jakarta Selatan; operasional kantor Senin–Minggu 08.00–20.00 WIB; chat WhatsApp online terus dan dibalas.

## Aturan anti-spam (berlaku untuk SEMUA konten)
Lebih baik tidak terbit hari itu daripada menerbitkan konten tempelan. Kalau tidak ada bahan yang layak, jangan terbitkan apa pun dan laporkan alasannya.

- Tulis untuk pembaca dulu, baru mesin pencari. Setiap artikel harus menjawab satu pertanyaan nyata sampai tuntas.
- Kata kunci dipakai secukupnya dan wajar. Frasa "penerjemah tersumpah" paling banyak 2 kali per 100 kata (dicek otomatis).
- Tidak boleh menulis ulang topik yang sudah ada dengan judul berbeda. Cek daftar file dulu.
- Tidak boleh menyalin kalimat dari artikel lain di situs ini maupun dari situs lain. Kemiripan antarhalaman di atas 22% membuat pemeriksaan gagal (dicek otomatis).
- Minimal 380 kata isi (dicek otomatis). Tanpa kalimat pengisi, tanpa pembuka panjang, tanpa pengulangan.
- Judul jujur, tanpa umpan klik ("wajib tahu", "rahasia", "nomor 3 bikin kaget"), tanpa huruf kapital berlebihan.
- Ajakan ke layanan Englishlink paling banyak sekali per artikel dan harus nyambung dengan isinya.
- Link internal hanya yang membantu pembaca, paling banyak 3.

## Supaya kreatif dan beda
Setiap artikel wajib punya SATU unsur orisinal yang tidak ada di artikel lain: contoh kasus yang umum terjadi (tanpa nama orang), analogi sehari-hari, checklist yang bisa langsung dipakai, tabel perbandingan buatan sendiri, contoh sebelum dan sesudah, atau kuis mini 3 soal dengan jawabannya.

Ganti-ganti bentuk tulisan. Tulis bentuk yang dipakai di frontmatter `format:` dan jangan pakai bentuk yang sama dengan 2 artikel terakhir di slot yang sama:

| `format` | Bentuk |
|---|---|
| panduan | Langkah demi langkah |
| mitos-fakta | Anggapan keliru lalu faktanya |
| kesalahan | Kesalahan yang sering terjadi dan cara menghindarinya |
| perbandingan | Dua pilihan dibandingkan dalam tabel |
| tanya-jawab | Satu pertanyaan besar dijawab dari beberapa sisi |
| checklist | Daftar periksa siap pakai |
| kamus-mini | 8–12 istilah dijelaskan singkat dengan contoh |
| contoh | Kumpulan contoh kalimat atau dokumen dengan penjelasan |
| kuis | Materi singkat lalu kuis mini |

`coverText` harus langsung memberi tahu isi artikel dengan cara yang menarik tapi jujur, maksimal 6 kata.

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
format: salah satu bentuk di tabel "Supaya kreatif dan beda"
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
