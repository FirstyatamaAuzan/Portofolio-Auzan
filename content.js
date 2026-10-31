/* Semua isi situs ada di sini. Kata di antara *bintang* tampil serif miring oranye. */
window.SITE = {
  name: 'Firstyatama Auzan Farhadi',
  nav: [['home', 'Home'], ['me', 'Me'], ['projects', 'Project'], ['experience', 'Eksperience'], ['organization', 'Organization'], ['achievements', 'Course & Sertification']],

  home: {
    kicker: 'Informatika · Telkom University Surabaya',
    headline: ['Membangun sistem,', 'melatih *model.*'],
    text: 'Mahasiswa Informatika dengan pengalaman di backend, aplikasi web, dan kecerdasan buatan. Saya senang merancang API yang rapi dan model bahasa yang benar-benar dipakai.',
    stats: [['3,8', 'IPK dari 4,00'], ['4', 'tempat berkarya'], ['2022', 'angkatan']],
    available: true,
    availableNote: 'Open to Work — Siap berkontribusi sebagai AI/ML Engineer, Data Scientist, atau Software Engineer.',
    contact: {
      email: 'auzan.tama@gmail.com',
      links: [['LinkedIn', 'https://www.linkedin.com/in/firstyatama/'], ['GitHub', 'https://github.com/FirstyatamaAuzan'], ['CV (PDF)', 'assets/cv-auzan.pdf']],
    },
  },

  me: {
    lead: 'Saya membangun dari data sampai *aplikasi.*',
    text: 'Mahasiswa S1 Informatika Telkom University Surabaya. Saya mengerjakan backend dengan Node.js dan Laravel, lalu memakai Python untuk NLP dan computer vision. Minat utama saya adalah rekayasa perangkat lunak, machine learning, dan pemrosesan bahasa alami. Saya terbiasa bekerja dalam tim, mulai dari riset sampai produk yang berjalan.',
    photo: 'assets/foto.jpg',   // taruh fotomu di sini (JPG/WebP, rasio 4:5)
    facts: [
      ['Nama', 'Firstyatama Auzan Farhadi'],
      ['Pendidikan', 'S1 Informatika, Telkom University Surabaya (2022 – sekarang)'],
      ['IPK', '3,8 / 4,00'],
      ['Domisili', 'Surabaya, Indonesia'],
      ['Fokus', 'Backend, NLP, machine learning'],
      ['Bahasa kerja', 'Indonesia, Inggris'],
    ],
    skills: [
      ['Bahasa', 'Python, JavaScript, PHP, SQL'],
      ['Backend', 'Node.js, Express.js, Laravel, REST API, MySQL'],
      ['Frontend', 'React.js, Tailwind CSS, Bootstrap, Blade'],
      ['AI dan NLP', 'TensorFlow, Hugging Face, IndoBERT, Google T5, Scikit-learn'],
      ['Vision dan data', 'Keras-OCR, Pandas, NumPy, Matplotlib'],
      ['Alat', 'Git, GitHub, Postman, Jupyter Notebook'],
    ],
  },

  projects: [
    { slug: 'cohive', title: 'CoHive', livePreview: 'assets/previews/cohive_preview.html', kind: 'Aplikasi web', year: '2025 – 2026',
      meta: [['Peran', 'Full Stack Developer'], ['Konteks', 'Bandung Techno Park, WRAP'], ['Tahun', '2025 – 2026'], ['Stack', 'Laravel, MySQL, Tailwind']],
      summary: 'Platform manajemen koperasi berbasis web untuk operasi keuangan dan organisasi.',
      points: ['Backend dengan Laravel, MySQL, dan REST API.', 'Antarmuka responsif dengan Blade, Tailwind CSS, dan JavaScript.', 'Fitur pengelolaan keuangan, pencatatan donasi, dan administrasi anggota.', 'MVP berfungsi yang menyederhanakan proses operasional koperasi.'],
      tags: ['Laravel', 'MySQL', 'REST API', 'Tailwind CSS'],
      links: [['GitHub', 'https://github.com/FirstyatamaAuzan']] },
    { slug: 'semsim', title: 'SemSim', livePreview: 'assets/previews/semsim_preview.html', kind: 'Skripsi dan riset', year: '2025 – sekarang',
      meta: [['Peran', 'Peneliti dan pengembang'], ['Konteks', 'Telkom University Surabaya'], ['Tahun', '2025 – sekarang'], ['Stack', 'IndoBERT, Flask, PyMuPDF']],
      summary: 'Sistem deteksi kemiripan semantik untuk Bab II dokumen akademik berbahasa Indonesia, dari ekstraksi PDF sampai aplikasi web.',
      points: ['Fine-tuning IndoBERT sebagai Siamese Bi-Encoder.', 'Ekstraksi teks PDF dengan PyMuPDF dan aplikasi web dengan Flask.', 'Evaluasi dengan GroupKFold per dokumen dan pembanding TF-IDF.'],
      tags: ['IndoBERT', 'Siamese Bi-Encoder', 'Flask', 'PyMuPDF'],
      links: [['GitHub', 'https://github.com/FirstyatamaAuzan']] },
    { slug: 'chatbot', title: 'Chatbot Percakapan AI', kind: 'NLP', year: '2024',
      meta: [['Peran', 'Pengembang'], ['Tahun', '2024'], ['Bidang', 'Natural Language Processing'], ['Stack', 'TensorFlow, Hugging Face, T5']],
      summary: 'Sistem percakapan yang memahami konteks dan menghasilkan jawaban yang relevan.',
      points: ['Pipeline praproses data, pelatihan model, dan evaluasi dengan Python.', 'Memakai TensorFlow, Hugging Face, dan Google T5.', 'Optimasi kecepatan respons dan alur kerja yang dapat berkembang untuk beragam masukan.'],
      tags: ['Python', 'TensorFlow', 'Hugging Face', 'Google T5'],
      links: [['GitHub', 'https://github.com/FirstyatamaAuzan']] },
    { slug: 'green-ranger', title: 'Green Ranger', livePreview: 'assets/previews/green-ranger-app/index.html', kind: 'Aplikasi web', year: '2023 – 2024',
      meta: [['Peran', 'Backend developer'], ['Tahun', '2023 – 2024'], ['Bidang', 'Lingkungan'], ['Stack', 'Laravel, MySQL, Midtrans']],
      summary: 'Platform pengelolaan donasi lingkungan terpadu, partisipasi aksi relawan hijau, serta eco-marketplace daur ulang yang terintegrasi dengan Midtrans Snap Gateway.',
      points: [
        'Manajemen donasi, registrasi aksi sukarelawan, dan eco-marketplace daur ulang secara terpadu.',
        'Integrasi alur pembayaran Midtrans Snap (Sandbox Client ID: SB-Mid-client-fq2d83yegG2NGx_f) dengan callback responsif SweetAlert.',
        'Pengujian menyeluruh modul backend dan konsistensi transaksi data.'
      ],
      tags: ['Laravel', 'MySQL', 'Midtrans Snap', 'Bootstrap', 'REST API'],
      links: [['GitHub', 'https://github.com/FirstyatamaAuzan']],
      evidences: [
        { type: 'pdf', title: 'Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SRS)', desc: 'Dokumen rekayasa perangkat lunak resmi sistem Green Ranger', file: 'assets/evidence/green-ranger/dokumen_srs_green_ranger.pdf' },
        { type: 'img', title: 'Poster Resmi & Desain Sistem Green Ranger', desc: 'Desain visual arsitektur sistem dan kampanye lingkungan terpadu', file: 'assets/evidence/green-ranger/poster_green_ranger.png' }
      ] },
  ],

  experience: [
    { slug: 'bandung-techno-park', title: 'Bandung Techno Park', kind: 'Kerja', year: '2026',
      meta: [['Posisi', 'Full Stack Developer'], ['Program', 'Wrap Entrepreneurship'], ['Periode', 'Feb – Jun 2026'], ['Lokasi', 'Surabaya']],
      summary: 'Membangun CoHive, platform manajemen koperasi, dari backend sampai antarmuka.',
      points: ['Backend dengan Laravel, MySQL, dan REST API.', 'Komponen frontend dengan Blade, Tailwind CSS, dan JavaScript.', 'Fitur keuangan, donasi, dan keanggotaan.', 'Menyerahkan MVP yang berfungsi.'],
      tags: ['Laravel', 'MySQL', 'Tailwind CSS'],
      evidences: [
        { type: 'pdf', title: 'Sertifikat Resmi Kelulusan MBKM WRAP 2025', desc: 'Diterbitkan oleh Telkom University & inkubator Bandung Techno Park', file: 'assets/evidence/cohive/sertifikat_mbkm_wrap.pdf' },
        { type: 'pdf', title: 'Pitch Deck CoHive (Business & System Design)', desc: 'Dokumen presentasi produk di hadapan mentor bisnis dan inkubator', file: 'assets/evidence/cohive/pitchdeck_cohive.pdf' }
      ] },
    { slug: 'cmlabs', title: 'PT cmlabs Indonesia Digital', kind: 'Magang', year: '2025',
      meta: [['Posisi', 'Backend Developer Intern'], ['Periode', 'Jan – Mei 2025'], ['Lokasi', 'Malang'], ['Stack', 'Node.js, MySQL']],
      summary: 'Backend untuk platform pemeriksa plagiarisme.',
      points: ['Mengembangkan dan merawat layanan backend dengan Node.js dan MySQL.', 'Merancang struktur basis data dan REST API untuk deteksi kemiripan konten.', 'Meningkatkan performa dan proses deteksi plagiarisme berbasis SEO.', 'Bekerja bersama engineer dan tester untuk platform yang stabil dan skalabel.'],
      tags: ['Node.js', 'MySQL', 'REST API'],
      evidences: [
        { type: 'pdf', title: 'Surat Keterangan Selesai Kerja Praktik PT. cmlabs', desc: 'Surat pengesahan resmi selesai magang industri dari cmlabs & Tel-U', file: 'assets/evidence/cmlabs/surat_keterangan_selesai_kp_cmlabs.pdf' },
        { type: 'image', title: 'Screenshot Output Pengujian Modul Audit SEO 1', desc: 'Hasil analisis kemiripan konten semantik berbasis Sentence Transformers', file: 'assets/evidence/cmlabs/result_audit1.jpg' },
        { type: 'image', title: 'Screenshot Output Pengujian Modul Audit SEO 2', desc: 'Verifikasi deteksi duplikasi konten otomatis antar halaman web', file: 'assets/evidence/cmlabs/result_audit2.jpg' }
      ] },
    { slug: 'asisten-riset', title: 'Telkom University Surabaya', kind: 'Riset', year: '2024',
      meta: [['Posisi', 'Asisten Riset Mahasiswa'], ['Periode', 'Jan – Jul 2024'], ['Topik', 'Pembaca kode kontainer'], ['Bidang', 'Computer vision']],
      summary: 'Riset sistem pembaca kode kontainer berbasis machine learning.',
      points: ['Mengimplementasikan dan mengoptimalkan algoritma pengenalan objek.', 'Praproses data, pelatihan model, dan evaluasi.', 'Berkontribusi pada penyusunan publikasi dan dokumentasi riset.'],
      tags: ['Python', 'Keras-OCR', 'TensorFlow'] },
    { slug: 'hima', title: 'Himpunan Mahasiswa Informatika', kind: 'Organisasi', year: '2024',
      meta: [['Posisi', 'Staf Pengembangan SDM'], ['Periode', 'Jan – Des 2024'], ['Lembaga', 'Telkom University Surabaya'], ['Bidang', 'Pengembangan anggota']],
      summary: 'Merancang pelatihan, lokakarya, dan pendampingan bagi mahasiswa.',
      points: ['Menyelenggarakan pelatihan internal, lokakarya, dan mentoring.', 'Terlibat dalam acara besar: TEMATICS, FORTASTICS, dan FUNSPORTIKA 2024.', 'Menjadi pembawa acara (MC) pada Pemilihan Mahasiswa 2024.', 'Ikut mengevaluasi program organisasi.'],
      tags: ['Kepemimpinan', 'Komunikasi', 'Event'] },
  ],

  
  organization: [
    {
      slug: 'hima-psdm',
      title: 'Himpunan Mahasiswa Informatika (HMIF)',
      kind: 'Kepengurusan Ormawa',
      year: '2023 – 2025',
      meta: [['Jabatan', 'Staf Ahli PSDM'], ['Lembaga', 'Telkom University Surabaya'], ['Periode', '2023 – 2025'], ['Fokus', 'Pengembangan Karakter & Skill']],
      summary: 'Staf resmi Departemen Pengembangan Sumber Daya Mahasiswa (PSDM) HMIF Telkom University Surabaya periode 2023/2024 hingga 2025.',
      points: [
        'Merancang dan mengeksekusi kurikulum pelatihan internal, lokakarya teknis, dan mentoring mahasiswa baru.',
        'Mengkoordinasikan kaderisasi dan penilaian keaktifan anggota himpunan.',
        'Membina kolaborasi lintas departemen untuk menjaga stabilitas dan budaya kerja organisasi.'
      ],
      tags: ['PSDM', 'Kepemimpinan', 'Kaderisasi', 'Manajemen Tim'],
      evidences: [
        { type: 'image', title: 'Sertifikat Resmi Pengurus HMIF (Staf PSDM)', desc: 'Surat pengesahan Ketua & Pembina HIMA Informatika No: 008/SRT/HMIF-KABCA/I/2025', file: 'assets/certs/baru/Firsyatama Auzan Farhadi hima.jpg' }
      ]
    },
    {
      slug: 'pemira-moderator',
      title: 'Pemilihan Raya (PEMIRA) Ketua HIMA 2024',
      kind: 'Kepanitiaan & Public Speaking',
      year: '2024',
      meta: [['Peran', 'Moderator Orasi & Debat'], ['Penyelenggara', 'KPU HMIF Tel-U Surabaya'], ['Waktu', 'Nov – Des 2024'], ['Skala', 'Tingkat Program Studi']],
      summary: 'Memimpin jalannya debat publik dan pemaparan visi-misi pasangan calon ketua umum Himpunan Mahasiswa Informatika.',
      points: [
        'Memandu sesi tanya jawab kritis antara calon ketua dan audiens mahasiswa serta dosen penguji.',
        'Menjaga ketertiban tata tertib debat publik dan alokasi waktu bicara kandidat secara independen.',
        'Menyusun naskah panduan moderator dan skenario dinamika forum debat.'
      ],
      tags: ['Public Speaking', 'Moderator Debat', 'Manajemen Forum'],
      evidences: [
        { type: 'image', title: 'Sertifikat Panitia Moderator Debat PEMIRA 2024', desc: 'Sertifikat resmi dari Panitia Pemira HMIF No: 007/SRT/HMIF-KABCA/XII/2024', file: 'assets/certs/baru/Firsyatama Auzan Farhadi pemira.jpg' }
      ]
    },
    {
      slug: 'fortastics-sekretaris',
      title: 'FORTASTICS 2024 (Informatics Welcome Party)',
      kind: 'Kepanitiaan & Event',
      year: '2024',
      meta: [['Peran', 'Sekretaris 1'], ['Peserta', 'Mahasiswa Baru Informatika'], ['Waktu', 'Oktober 2024'], ['Ruang Lingkup', 'Administrasi & Logistik Acara']],
      summary: 'Sekretaris 1 acara penyambutan mahasiswa baru Informatika Telkom University Surabaya (FORTASTICS 2024).',
      points: [
        'Bertanggung jawab atas administrasi surat-menyurat resmi, perizinan kampus, dan penyusunan proposal pendanaan.',
        'Mengelola notulensi rapat pleno panitia dan timeline koordinasi antar-divisi (acara, perlengkapan, konsumsi).',
        'Menyusun laporan pertanggungjawaban (LPJ) administrasi setelah acara sukses diselenggarakan.'
      ],
      tags: ['Sekretaris', 'Penyusunan Proposal', 'Administrasi Event', 'Event Organizing'],
      evidences: [
        { type: 'image', title: 'Sertifikat Panitia Sekretaris 1 FORTASTICS 2024', desc: 'Pengesahan Ketua Pelaksana & Kaprodi Informatika No: 006/SRT/HMIF-KABCA/X/2024', file: 'assets/certs/baru/Firsyatama Auzan Farhadi FORTASTIC\'24.jpg' }
      ]
    }
  ],

  achievements: [
    { title: 'Machine Learning & Data Science dengan Microsoft Azure', issuer: 'Dicoding Indonesia', year: '2026', tag: 'Cloud & AI', file: 'assets/certs/Sertif_cv/serifikat dicoding data sience microsoft azure.pdf' },
    { title: 'Aplikasi Generative AI Menggunakan Azure AI Foundry', issuer: 'Dicoding Indonesia', year: '2026', tag: 'Gen AI & RAG', file: 'assets/certs/Sertif_cv/sertifikat_dicoding_genAI Azure.pdf' },
    { title: 'Backend Development with Node.js & Express', issuer: 'MySkill', year: '2025', tag: 'Backend', file: 'assets/certs/Sertif_cv/Sertif Backend node.js - MySkill.pdf' },
    { title: 'Application Deployment & CI/CD Fundamentals', issuer: 'MySkill', year: '2025', tag: 'DevOps', file: 'assets/certs/Sertif_cv/sertif app deplomet MySkill.pdf' },
    { title: 'Berpikir Kritis di Era Kecerdasan Buatan', issuer: 'HP Foundation (HP LIFE)', year: '2026', tag: 'AI Ethics', file: 'assets/certs/Sertif_cv/Berpikir Kritis di Era Kecerdasan Buatan.pdf' },
    { title: 'English Proficiency Test (Score: 470 - CEFR B1)', issuer: 'Pusat Bahasa Telkom University', year: '2026', tag: 'Language', file: 'assets/certs/Sertifikat_EPRT.pdf' },
    { title: 'Staf Ahli Departemen PSDM (Kepengurusan Resmi)', issuer: 'HIMA Informatika Telkom University', year: '2023 - 2025', tag: 'Leadership', file: 'assets/certs/baru/Firsyatama Auzan Farhadi hima.jpg' },
    { title: 'Sekretaris 1 Panitia Welcome Party FORTASTICS 2024', issuer: 'HMIF Telkom University Surabaya', year: '2024', tag: 'Event Organizer', file: 'assets/certs/baru/Firsyatama Auzan Farhadi FORTASTIC\'24.jpg' },
    { title: 'Moderator Orasi & Debat PEMIRA HIMA 2024', issuer: 'HMIF Telkom University Surabaya', year: '2024', tag: 'Public Speaking', file: 'assets/certs/baru/Firsyatama Auzan Farhadi pemira.jpg' },
    { title: 'International Guest Lecture: Exploring Blockchain', issuer: 'Telkom University Surabaya', year: '2024', tag: 'Blockchain', file: 'assets/certs/baru/FIRSTYATAMA AUZAN FARHADI blockchain.jpg' },
    { title: 'Kunjungan Industri: Penerapan AI pada Dunia Industri', issuer: 'Telkom University Surabaya', year: '2024', tag: 'Industry Visit', file: 'assets/certs/baru/Firstyatama Auzan Farhadi kunjungan industri (1) (1).png' },
    { title: 'Introduction to Web & Machine Learning Track', issuer: 'Google Developer Student Clubs (GDSC)', year: '2023', tag: 'Web & ML', file: 'assets/certs/gdsc.jpg' },
    { title: 'Frontend Developer: Coding Camp', issuer: 'Harisenin.com', year: '2023', tag: 'Frontend', file: 'assets/certs/harisenin.jpg' }
  ],
};
