# Rencana Pengembangan Portofolio Auzan
**Terakhir diperbarui**: 2026-10-28  
**Stack**: Pure HTML · Vanilla JS · CSS · Three.js r178 · GSAP

---

## 🔵 KELOMPOK A — Konten & Data
> **Fokus**: Semua yang menyentuh `content.js` dan data saja.  
> **Dapat dikerjakan**: Tanpa menyentuh JS atau CSS sama sekali.

| # | Pekerjaan | File | Catatan |
|---|-----------|------|---------|
| A1 | Tambah field `screenshots[]` di setiap project (URL gambar/lokal) | `content.js` | Array string path gambar |
| A2 | Tambah field `demo` (link live demo atau video YouTube) di project | `content.js` | Bisa `null` jika tidak ada |
| A3 | Tambah section baru `achievements` (sertifikat, penghargaan, lomba) | `content.js` | Array `{ title, issuer, year, url? }` |
| A4 | Tambah field `available: true` dan `availableNote` di `home` | `content.js` | **SELESAI** (Badge pulsing hijau aktif di Home) |
| A5 | Lengkapi semua `links[]` di project yang masih kosong/placeholder | `content.js` | **SELESAI** (Direct repo CoHive, Plagiarism_Checker, Chatbot T5, Green-Ranger) |
| A6 | Tambah field `og_image` khusus untuk Open Graph social preview | `content.js` atau `index.html` | Path ke gambar 1200×630 |

---

## 🟣 KELOMPOK B — Halaman Baru
> **Fokus**: Menambah section/halaman baru ke routing dan views yang sudah ada di `app.js`.  
> **Dapat dikerjakan**: Setelah Kelompok A selesai (butuh data dari A3, A4).

| # | Pekerjaan | File yang Terlibat | Catatan |
|---|-----------|-------------------|---------|
| B1 | **Section Achievements** — tampilkan sertifikat & penghargaan dengan layout timeline | `content.js`, `app.js`, `style.css` | Data dari A3 |cd ots[]` dari A1, A2).

| # | Pekerjaan | File yang Terlibat | Catatan |
|---|-----------|-------------------|---------|
| C1 | **Screenshot Carousel** di detail page — swipe gambar project | `app.js`, `style.css` | Pakai `screenshots[]` dari A1 |
| C2 | **Embed Demo** — tombol "Lihat Demo" yang buka iframe/modal atau link YouTube | `app.js`, `style.css` | Data dari A2 |
| C3 | **GitHub Stats Widget** — embed gambar GitHub contribution stats (API eksternal) | `app.js`, `style.css` | `github-readme-stats.vercel.app` |
| C4 | **Social Share** — tombol bagikan halaman detail ke LinkedIn/Twitter | `app.js`, `style.css` | Web Share API, fallback copy URL |

---

## 🟡 KELOMPOK D — SEO & Metadata
> **Fokus**: Semua yang berhubungan dengan visibilitas mesin pencari dan preview sosial.  
> **Dapat dikerjakan**: Independen dari kelompok lain, bisa kapan saja.

| # | Pekerjaan | File yang Terlibat | Catatan |
|---|-----------|-------------------|---------|
| D1 | **og:image gambar preview** — buat gambar 1200×630 khusus sosial preview | `index.html`, `assets/` | Buat dengan generate_image tool |
| D2 | **Canonical URL + sitemap.xml** | `index.html`, buat `sitemap.xml` | Untuk indexing Google |
| D3 | **JSON-LD Structured Data** — schema.org Person + artikel | `index.html` | Memperkaya hasil Google |
| D4 | **robots.txt** | Buat `robots.txt` | Satu file, 2 baris |
| D5 | **Update `<title>` dinamis per halaman/detail** | `app.js` | `document.title` saat route berubah |

---

## 🟢 KELOMPOK E — Animasi & Polish
> **Fokus**: Sentuhan akhir visual dan UX — dikerjakan **terakhir** setelah konten stabil.  
> **Dapat dikerjakan**: Setelah B, C selesai.

| # | Pekerjaan | File yang Terlibat | Catatan |
|---|-----------|-------------------|---------|
| E1 | **Page Transition** — animasi slide/morph halus saat ganti halaman | `app.js`, `style.css` | View Transitions API + GSAP |
| E2 | **Loading Screen** — layar intro singkat saat Three.js loading | `index.html`, `app.js`, `style.css` | Sembunyikan saat galeri siap |
| E3 | **Cursor Kustom** — cursor khusus yang bereaksi terhadap hover elemen | `app.js`, `style.css` | CSS + pointer event |
| E4 | **Scroll Progress Bar** — indikator progress baca di detail page | `app.js`, `style.css` | Thin orange line di atas |
| E5 | **Print / PDF Export** — tombol "Cetak sebagai PDF" di detail page | `app.js`, `style.css` | `@media print` + CSS |
| E6 | **Dark/Light toggle** (opsional) | `app.js`, `style.css` | localStorage + CSS variables |

---

## Urutan Pengerjaan yang Disarankan

```
Kelompok A  ──►  Kelompok B  ──►  Kelompok C
   (data)         (halaman)         (media)
                      │
                      ▼
               Kelompok D  ──►  Kelompok E
                  (SEO)           (polish)
```

- **A** bisa dikerjakan sendiri, bahkan di mobile editor
- **D** bisa dikerjakan **paralel** dengan B dan C (independen)
- **E** dikerjakan **terakhir** setelah semua konten final

---

## Estimasi Berat Pengerjaan

| Kelompok | Berat | Waktu Estimasi |
|----------|-------|---------------|
| A — Data | ⬜⬜⬜ Ringan | 30–60 menit |
| B — Halaman Baru | 🟧🟧🟧 Sedang | 2–3 jam |
| C — Media Detail | 🟧🟧🟫 Sedang-Berat | 2–4 jam |
| D — SEO | ⬜⬜⬜ Ringan | 30–45 menit |
| E — Animasi | 🟫🟫🟫 Berat | 3–5 jam |
