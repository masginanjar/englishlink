# Panduan Halaman Kota — Englishlink Translator

Satu halaman per kota atau kabupaten, satu halaman per hari. Tujuannya membantu orang di kota itu yang mencari "jasa penerjemah tersumpah Inggris <nama kota>".

## Aturan kejujuran (wajib, tidak boleh dilanggar)
- Englishlink HANYA berkantor di Caraka Tower, Jakarta Selatan. Jangan pernah menulis atau memberi kesan ada kantor, cabang, kurir sendiri, atau tim di kota lain.
- Untuk kota selain Jakarta Selatan, tulis jelas bahwa layanan dilakukan online: dokumen dikirim lewat WhatsApp, hasil dikirim digital atau cetak ke alamat pelanggan sesuai kesepakatan.
- Jangan menulis harga, lama pengerjaan pasti, ongkos kirim, ulasan, jumlah pelanggan di kota itu, atau garansi.
- Jangan mengarang fakta lokal. Setiap nama kampus, kantor imigrasi, kawasan industri, atau instansi yang disebut harus sudah dicek lewat pencarian web di sesi itu. Kalau tidak bisa dipastikan, jangan disebut.
- Jangan menulis aturan hukum, nomor peraturan, atau syarat kedutaan yang spesifik.

## Supaya tidak jadi halaman tempelan
Halaman yang cuma mengganti nama kota bisa dianggap spam oleh Google dan merugikan seluruh situs. Jadi tiap halaman harus punya isi yang memang khas kota itu:
- Cari dulu (pencarian web) 2–4 hal nyata tentang kota itu yang berhubungan dengan kebutuhan terjemahan: kampus besar, kawasan industri atau perusahaan asing, pelabuhan atau bandara internasional, pariwisata dan warga asing, banyaknya pekerja migran, dan sejenisnya.
- Tulis siapa yang biasanya butuh terjemahan di kota itu dan untuk apa, berdasarkan temuan tadi.
- Ganti susunan bagian, judul bagian, contoh dokumen, dan pertanyaan FAQ di tiap halaman. Jangan menyalin kalimat dari halaman kota lain.
- Kalau untuk suatu daerah tidak ditemukan hal khas yang bisa diverifikasi, lewati dulu daerah itu (beri tanda `[-]` di antrean dengan alasan singkat) dan ambil daerah berikutnya.

## Gaya bahasa
Sama dengan CONTENT-GUIDE.md: santai, jelas, pakai "kamu" dan "kami", kalimat pendek, tanpa emoji.

## Format
File: `src/content/kota/<slug-nama-daerah>.md` (contoh: `kota-bandung.md`, `kabupaten-sleman.md`; untuk Jakarta pakai `jakarta-selatan.md` dst.)

```
---
title: Jasa Penerjemah Tersumpah Inggris di <Nama Kota>   (maksimal 65 karakter; untuk kabupaten boleh "Jasa Penerjemah Tersumpah Inggris <Nama> ")
description: 120–155 karakter, menyebut nama kota dan bahwa layanan online dari Jakarta
date: YYYY-MM-DD
city: Nama Kota atau Kabupaten (dipakai di cover dan daftar)
province: Nama Provinsi
cover: pilih dari daftar cover di CONTENT-GUIDE.md sesuai ciri kota (kampus: svc-3, industri: svc-4, wisata atau luar negeri: svc-5 atau svc-1)
answer: Jawaban langsung 2–3 kalimat: bisa atau tidak dilayani, caranya (online dari Jakarta Selatan), jam layanan.
---
```

Isi 450–700 kata: pembuka khas kota, siapa yang butuh, dokumen yang sering diminta (tabel atau daftar), cara pesan dari kota itu, 1–2 link internal (`/id/cara-kerja/`, halaman layanan yang relevan), lalu `## FAQ` berisi 3 pertanyaan `###` yang berbeda dari halaman kota lain. Jangan menulis H1 dan jangan menambah ajakan WhatsApp di akhir.

## Alur harian
1. Ambil daerah teratas yang belum ditandai di `src/content/kota-queue.md`.
2. Riset singkat lewat pencarian web, tulis halamannya.
3. Tandai `[x]` di antrean. Kalau antrean tinggal kurang dari 10, tambahkan 30 kota/kabupaten berikutnya yang belum ada (urutkan dari yang penduduknya paling banyak).
4. `npm ci`, lalu build dan `node check.mjs` sampai "0 masalah".
5. Commit file halaman baru dan antrean dengan pesan `Kota: <nama>`, push ke `main`.
