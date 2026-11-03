# Rencana Pengembangan Portofolio Auzan
**Terakhir diperbarui**: 2026-10-28  
**Stack**: Pure HTML · Vanilla JS · CSS · Three.js r178 · GSAP

---

## 🔵 KELOMPOK A — Konten & Data
> **Fokus**: Semua yang menyentuh `content.js` dan data saja.  
> **Dapat dikerjakan**: Tanpa menyentuh JS atau CSS sama sekali.

| # | Pekerjaan | Status | File | Catatan |
|---|-----------|:------:|------|---------|
| A1 | Tambah field `screenshots[]` di setiap project | 🔄 Sedang | `content.js` | Array string path gambar preview/mockup |
| A2 | Tambah field `demo` (link live demo atau video YouTube) | ✅ Selesai | `content.js` | Dilengkapi dengan interactive `livePreview` iframe |
| A3 | Tambah section baru `achievements` (sertifikat & penghargaan) | ✅ Selesai | `content.js` | Lengkap dengan link berkas PDF/JPG autentik |
| A4 | Tambah field `available: true` dan `availableNote` di `home` | ✅ Selesai | `content.js` | Terhubung dengan badge pulsing hijau |
| A5 | Lengkapi semua `links[]` di project yang masih kosong/placeholder | ✅ Selesai | `content.js` | GitHub repo & dokumentasi terhubung |
| A6 | Tambah field `og_image` khusus untuk Open Graph preview | ⬜ Antrean | `content.js` atau `index.html` | Path ke gambar 1200×630 |

---

## 🟣 KELOMPOK B — Halaman Baru
> **Fokus**: Menambah section/halaman baru ke routing dan views yang sudah ada di `app.js`.  
> **Dapat dikerjakan**: Setelah Kelompok A selesai.

| # | Pekerjaan | Status | File yang Terlibat | Catatan |
|---|-----------|:------:|-------------------|---------|
| B1 | **Section Achievements** — tampilkan sertifikat & penghargaan | ✅ Selesai | `content.js`, `app.js`, `style.css` | Tampil di navigasi & grid responsif |
| B2 | **Status Badge "Open to Work"** — dot hijau animasi di hero | ✅ Selesai | `app.js`, `style.css` | Aktif dengan efek pulsing radar |
| B3 | **Contact Form** (via Formspree) — form kontak pesan langsung | ✅ Selesai | `app.js`, `style.css` | Modal dialog kirim pesan langsung terintegrasi |
| B4 | **Toggle Bahasa ID/EN** — opsi alih bahasa | ⬜ Antrean | `content.js`, `app.js`, `style.css` | Preferensi tersimpan di localStorage |
| B5 | **Section Skill Visual** — upgrade halaman Me dengan grid ikon/pills | ✅ Selesai | `app.js`, `style.css` | Chip visual interaktif per kategori keahlian |
| B+ | **Section Organization** — kaset 3D rekam jejak kepanitiaan/organisasi | ✅ Selesai | `app.js`, `content.js` | Fitur ekstra di luar rencana awal |

---

## 🟠 KELOMPOK C — Kekayaan Media di Detail Page
> **Fokus**: Memperindah detail page project/experience dengan gambar & demo nyata.

| # | Pekerjaan | Status | File yang Terlibat | Catatan |
|---|-----------|:------:|-------------------|---------|
| C1 | **Screenshot Carousel** di detail page — galeri gambar project | ⬜ Antrean | `app.js`, `style.css` | Pakai `screenshots[]` dari A1 |
| C2 | **Embed Demo** — live preview iframe / interactive demo | ✅ Selesai | `app.js`, `style.css` | Sudah ada Interactive Live Preview Frame! |
| C3 | **Evidence & Artifacts Viewer** — berkas riset & sertifikat | ✅ Selesai | `app.js`, `style.css` | Verifikasi dokumen resmi per rekam jejak |
| C4 | **Social Share & Salin Tautan** — bagikan halaman detail | ✅ Selesai | `app.js`, `style.css` | Web Share API & fallback copy link dengan toast notifikasi |

---

## 🟡 KELOMPOK D — SEO & Metadata
> **Fokus**: Semua yang berhubungan dengan visibilitas mesin pencari dan preview sosial.

| # | Pekerjaan | Status | File yang Terlibat | Catatan |
|---|-----------|:------:|-------------------|---------|
| D1 | **og:image gambar preview** — gambar 1200×630 khusus sosial preview | ⬜ Antrean | `index.html`, `assets/` | Metadata Open Graph & Twitter Cards |
| D2 | **Canonical URL + sitemap.xml** | ✅ Selesai | `index.html`, `sitemap.xml` | Indexing Google & canonical tag |
| D3 | **JSON-LD Structured Data** — schema.org Person & ProfilePage | ✅ Selesai | `index.html` | Rich snippet mesin pencari |
| D4 | **robots.txt** | ✅ Selesai | `robots.txt` | Petunjuk bot crawler |
| D5 | **Update `<title>` dinamis per halaman/detail** | ✅ Selesai | `app.js` | Judul tab otomatis berubah per rute |

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
