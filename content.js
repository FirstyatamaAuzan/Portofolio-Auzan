/* Semua isi situs ada di sini. Kata di antara *bintang* tampil serif miring oranye. */
window.SITE = {
  name: 'Firstyatama Auzan Farhadi',
  nav: [['home', 'Home'], ['me', 'Me'], ['projects', 'Project'], ['experience', 'Eksperience'], ['organization', 'Organization'], ['achievements', 'Course & Sertification']],

  home: {
    greeting: "I'm",
    name: 'Firstyatama Auzan Farhadi',
    role: 'AI Engineer & Software Developer',
    shortDesc: 'Mahasiswa Informatika Telkom University Surabaya yang berfokus merancang arsitektur backend andal, REST API terukur, dan rekayasa kecerdasan buatan.',
    available: true,
    availableNote: 'Open to Work',
    contact: {
      email: 'auzan.tama@gmail.com',
      linkedin: 'https://www.linkedin.com/in/firstyatama/',
      github: 'https://github.com/FirstyatamaAuzan',
      instagram: 'https://www.instagram.com/firstyatamaauzanf_?vrfl=d2JrMjA2eGVrZTRo',
      resume: 'assets/cv-auzan.pdf',
      links: [
        ['LinkedIn', 'https://www.linkedin.com/in/firstyatama/'],
        ['Instagram', 'https://www.instagram.com/firstyatamaauzanf_?vrfl=d2JrMjA2eGVrZTRo'],
        ['GitHub', 'https://github.com/FirstyatamaAuzan'],
        ['Resume (PDF)', 'assets/cv-auzan.pdf']
      ],
    },
  },

  me: {
    sectionTitle: 'ABOUT ME',
    lead: 'Engineering software solutions through thoughtful design and intelligent technologies.',
    text: 'Saya berfokus pada pengembangan solusi perangkat lunak melalui pendekatan rekayasa sistem dan penerapan teknologi berbasis AI. Memiliki pengalaman dalam membangun aplikasi dari tahap analisis kebutuhan, perancangan arsitektur, hingga implementasi dan integrasi sistem. Saya mengutamakan kualitas teknis, efisiensi, serta keberlanjutan solusi agar sistem yang dikembangkan dapat menjawab kebutuhan secara efektif.',
    photo: 'assets/foto.jpg',   // taruh fotomu di sini (JPG/WebP, rasio 4:5)
    facts: [
      ['Nama', 'Firstyatama Auzan Farhadi'],
      ['Pendidikan', "S1 Informatika, Telkom University Surabaya (Class of '26)"],
      ['IPK', '3,82 / 4,00'],
      ['Domisili', 'Surabaya, Indonesia'],
      ['Fokus', 'Software Dev, Machine Learning, Natural Language Processing'],
      ['Bahasa Kerja', 'Bahasa Indonesia, English'],
    ],
    stack: [
      { name: 'Python', role: 'Programming Language', icon: 'python' },
      { name: 'JavaScript', role: 'Programming Language', icon: 'javascript' },
      { name: 'PHP', role: 'Programming Language', icon: 'php' },
      { name: 'SQL', role: 'Database Query', icon: 'sql' },
      { name: 'HTML5', role: 'Markup Language', icon: 'html' },
      { name: 'CSS3', role: 'Stylesheet Language', icon: 'css' },
      { name: 'Node.js', role: 'Runtime Environment', icon: 'nodejs' },
      { name: 'Express.js', role: 'Web Framework', icon: 'express' },
      { name: 'Laravel', role: 'PHP Framework', icon: 'laravel' },
      { name: 'React', role: 'UI Library', icon: 'react' },
      { name: 'Tailwind CSS', role: 'CSS Framework', icon: 'tailwind' },
      { name: 'TensorFlow', role: 'Machine Learning', icon: 'tensorflow' },
      { name: 'Keras', role: 'Deep Learning', icon: 'keras' },
      { name: 'Hugging Face', role: 'NLP Transformers', icon: 'huggingface' },
      { name: 'Scikit-Learn', role: 'Machine Learning', icon: 'scikitlearn' },
      { name: 'Pandas', role: 'Data Analysis', icon: 'pandas' },
      { name: 'NumPy', role: 'Numerical Computing', icon: 'numpy' },
      { name: 'MySQL', role: 'Relational Database', icon: 'mysql' },
      { name: 'Git', role: 'Version Control', icon: 'git' },
      { name: 'GitHub', role: 'Code Repository', icon: 'github' },
      { name: 'Postman', role: 'API Platform', icon: 'postman' },
      { name: 'Jupyter', role: 'Notebook Prototyping', icon: 'jupyter' },
      { name: 'VS Code', role: 'Code Editor', icon: 'vscode' },
      { name: 'Figma', role: 'UI / UX Design', icon: 'figma' }
    ],
    // backward compatibility
    // backward compatibility
    skills: [
      ['Languages', 'Python, JavaScript, PHP, SQL'],
      ['Backend & Frameworks', 'Node.js, Express.js, Laravel, REST API, React.js, Tailwind CSS'],
      ['AI & NLP', 'TensorFlow, IndoBERT, Google T5, Hugging Face, Scikit-Learn'],
      ['Data & Tools', 'MySQL, Pandas, NumPy, Git, GitHub, Postman, Jupyter']
    ],
  },

  projects: [
    {
      slug: 'semsim', title: 'SemSim', livePreview: 'assets/previews/semsim_preview.html', kind: 'Skripsi dan riset', year: '2025 – sekarang',
      meta: [['Peran', 'Peneliti & Lead Developer'], ['Konteks', 'Telkom University Surabaya'], ['Tahun', '2025 – sekarang'], ['Stack', 'IndoBERT, PyTorch, Flask, PyMuPDF']],
      summary: 'Sistem deteksi kemiripan semantik untuk Bab II dokumen akademik berbahasa Indonesia, dari ekstraksi PDF sampai aplikasi web.',
      points: ['Fine-tuning IndoBERT sebagai Siamese Bi-Encoder.', 'Ekstraksi teks PDF dengan PyMuPDF dan aplikasi web dengan Flask.', 'Evaluasi dengan GroupKFold per dokumen dan pembanding TF-IDF.'],
      tags: ['IndoBERT', 'Siamese Bi-Encoder', 'PyTorch', 'Flask', 'PyMuPDF', 'Hugging Face'],
      links: [['GitHub', 'https://github.com/FirstyatamaAuzan'], ['Live Preview', 'assets/previews/semsim_preview.html']],
      evidences: [
        { type: 'pdf', title: 'Buku Tugas Akhir SemSim (Bab 1–20)', desc: 'Dokumen Tugas Akhir: latar belakang, tinjauan pustaka, metodologi, dan rancangan sistem SemSim', file: 'assets/evidence/semsim/Buku TA_Firstyatama Auzan Farhadi-1-20 (1).pdf' },
        { type: 'image', title: 'Distribusi Anotasi Dataset', desc: 'Grafik distribusi label pasangan kalimat dalam dataset pelatihan model', file: 'assets/evidence/semsim/distribusi_anotasi.png' },
        { type: 'image', title: 'Flowchart Arsitektur Sistem SemSim', desc: 'Diagram alur sistem dari input PDF hingga output skor kemiripan semantik', file: 'assets/evidence/semsim/flowchart_arsitektur.png' }
      ],
      caseStudy: {
        role: 'Peneliti Utama & AI Engineer',
        timeline: '2025 – Sekarang (Riset Skripsi S1)',
        stack: 'IndoBERT Base, PyTorch, Hugging Face, Flask, PyMuPDF, Scikit-learn',
        quote: 'Melampaui batasan lexical matching tradisional dengan representasi vektor semantik kontekstual mendalam berbasis IndoBERT Siamese Bi-Encoder untuk naskah ilmiah Indonesia.',
        challenge: 'Pemeriksaan orisinalitas naskah akademik Bab II (Tinjauan Pustaka) berbahasa Indonesia sangat rentan terhadap parafrasa terstruktur dan substitusi sinonim yang luput dari deteksi algoritma pencocokan leksikal konvensional seperti TF-IDF, N-Gram, atau Jaccard Similarity. Selain itu, mengevaluasi model NLP pada dokumen bertema sama sering menyebabkan kebocoran data (data leakage) jika tidak dipartisi per dokumen. Diperlukan sistem end-to-end yang mampu mengekstrak teks PDF secara hierarkis, mengomputasi representasi vektor dense berdimensi 768, dan memprediksi skor kemiripan semantik pasangan kalimat secara presisi dan cepat.',
        architecture: 'SemSim mengadopsi arsitektur pipeline bertingkat: Dokumen PDF diurai dan dibersihkan oleh modul ekstraksi berbasis PyMuPDF untuk memisahkan struktur Bab II. Teks kemudian disegmentasi menjadi pasangan kalimat teranotasi. Inti sistem ditenagai model IndoBERT-base-p1 yang difine-tune menggunakan arsitektur Siamese Bi-Encoder dengan mekanisme Mean Pooling. Representasi vektor kedua kalimat diproyeksikan ke ruang embedding 768-dimensi lalu dihitung kemiripan sudut kosinusnya (Cosine Similarity). Layanan web disajikan via Flask API dengan front-end yang menampilkan visualisasi heatmap skor kemiripan.',
        architectureDiagram: 'semsim',
        implementation: {
          feature1: {
            title: 'Arsitektur Siamese Bi-Encoder & GroupKFold Validation',
            desc: 'Menerapkan Siamese Bi-Encoder dengan CosineSimilarityLoss yang memungkinkan pemrosesan embedding secara independen (jauh lebih cepat dibanding Cross-Encoder untuk pencarian berskala besar). Validasi model menggunakan skema GroupKFold 5-fold cross-validation berbasis ID dokumen untuk memastikan model tidak menghafal kosakata dari dokumen pelatihan.',
            tag: 'Deep Learning & NLP'
          },
          feature2: {
            title: 'Ekstraksi PDF Cerdas & Dasbor Web Interaktif',
            desc: 'Membangun pipeline ekstraksi otomatis menggunakan PyMuPDF yang memfilter header, footer, dan nomor halaman, lalu memformat teks ke dalam antarmuka interaktif Flask dengan penyorotan teks semantik real-time (Semantic Text Highlighter).',
            tag: 'Serving & UI Engine'
          },
          code: {
            filename: 'models/siamese_indobert.py',
            language: 'python',
            snippet: `import torch
import torch.nn as nn
from transformers import AutoModel, AutoTokenizer

class IndoBERTSiameseBiEncoder(nn.Module):
    def __init__(self, model_name="indobenchmark/indobert-base-p1"):
        super().__init__()
        self.encoder = AutoModel.from_pretrained(model_name)
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.similarity = nn.CosineSimilarity(dim=1, eps=1e-6)

    def mean_pooling(self, model_output, attention_mask):
        token_embeddings = model_output.last_hidden_state
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
        sum_embeddings = torch.sum(token_embeddings * input_mask_expanded, 1)
        sum_mask = torch.clamp(input_mask_expanded.sum(1), min=1e-9)
        return sum_embeddings / sum_mask

    def forward(self, input_ids_a, mask_a, input_ids_b, mask_b):
        # Inferensi independen kedua cabang kalimat
        out_a = self.encoder(input_ids_a, attention_mask=mask_a)
        out_b = self.encoder(input_ids_b, attention_mask=mask_b)
        
        emb_a = self.mean_pooling(out_a, mask_a)
        emb_b = self.mean_pooling(out_b, mask_b)
        
        # Mengukur derajat kesamaan semantik dalam ruang vektor 768 dimensi
        return self.similarity(emb_a, emb_b)`,
            desc: 'Definisi arsitektur Siamese Bi-Encoder IndoBERT dengan mean pooling dan cosine similarity metric pada PyTorch.'
          }
        },
        results: [
          { value: '0.892', label: 'Korelasi Pearson', sub: 'Melampaui baseline TF-IDF (0.612)' },
          { value: '94.5%', label: 'F1-Score Deteksi Parafrasa', sub: 'Evaluasi GroupKFold per dokumen' },
          { value: '768-D', label: 'Dense Vector Embeddings', sub: 'Representasi semantik kontekstual' }
        ],
        reflection: 'Riset SemSim memperdalam pemahaman saya tentang seluk-beluk NLP modern, khususnya penanganan data berbahasa Indonesia yang minim resource dibanding bahasa Inggris. Saya belajar mengatasi perangkap data leakage pada dokumen ilmiah, mengoptimalkan pipeline inferensi transformer, dan menyusun manuskrip publikasi standar internasional berformat Elsevier.'
      }
    },
    {
      slug: 'chatbot', title: 'Chatbot Percakapan AI', kind: 'NLP', year: '2024',
      meta: [['Peran', 'Pengembang & NLP Engineer'], ['Tahun', '2024'], ['Bidang', 'Natural Language Processing'], ['Stack', 'Python, Google T5, Hugging Face, TensorFlow']],
      summary: 'Sistem percakapan generatif yang memahami konteks dan menghasilkan jawaban dialog yang alami serta relevan.',
      points: ['Pipeline praproses data, pelatihan model, dan evaluasi dengan Python.', 'Memakai TensorFlow, Hugging Face, dan Google T5.', 'Optimasi kecepatan respons dan alur kerja yang dapat berkembang untuk beragam masukan.'],
      tags: ['Python', 'Google T5', 'Hugging Face', 'TensorFlow', 'NLP', 'Seq2Seq'],
      links: [['GitHub', 'https://github.com/FirstyatamaAuzan/chatbot-with-T5']],
      caseStudy: {
        role: 'AI / NLP Engineer',
        timeline: '2024',
        stack: 'Python, Google T5-Small, Hugging Face Transformers, PyTorch, Tokenizers',
        quote: 'Membangun agen percakapan berbasis Sequence-to-Sequence yang memahami konteks dialog dinamis dan merespons secara koheren serta alami.',
        challenge: 'Banyak chatbot interaktif di lingkungan industri masih mengandalkan intent matching statis berbasis rule-based regex yang rapuh saat pengguna mengajukan pertanyaan dengan variasi tata bahasa tak terduga. Untuk menciptakan pengalaman percakapan yang luwes, diperlukan model generatif Sequence-to-Sequence yang mampu mempelajari pemetaan konteks pertanyaan ke jawaban tanpa menghasilkan pengulangan kata (repetition loops) atau latensi inferensi yang lambat.',
        architecture: 'Sistem percakapan ini memanfaatkan model Google T5 (Text-to-Text Transfer Transformer). Pipeline dimulai dari pembersihan teks dialog mentah, tokenisasi sub-kata menggunakan algoritma SentencePiece, dilanjutkan dengan pelatihan supervised fine-tuning pada dataset dialog 3,000+ percakapan. Pada tahap inferensi, teks di-decode menggunakan strategi Beam Search dengan penalti pengulangan n-gram guna menghasilkan kalimat jawaban yang informatif dan terstruktur.',
        architectureDiagram: 'chatbot',
        implementation: {
          feature1: {
            title: 'Supervised Fine-Tuning pada Pasangan Dialog Multi-Turn',
            desc: 'Memformulasikan dataset dialog ke dalam paradigma text-to-text standar T5 ("respond dialog: [teks] -> [respons]"). Melakukan optimasi learning rate dengan AdamW scheduler serta gradient accumulation untuk kestabilan konvergensi model.',
            tag: 'Model Training'
          },
          feature2: {
            title: 'Decoding Berbasis Beam Search & Repetition Mitigation',
            desc: 'Mengimplementasikan Beam Search decoding dengan parameter num_beams=4 dan no_repeat_ngram_size=2 untuk mengeliminasi repetisi frasa yang umum terjadi pada model generatif berukuran kecil.',
            tag: 'Inference Strategy'
          },
          code: {
            filename: 'chatbot/generator.py',
            language: 'python',
            snippet: `import torch
from transformers import T5ForConditionalGeneration, T5Tokenizer

class ConversationalT5Agent:
    def __init__(self, model_name="FirstyatamaAuzan/chatbot-t5-indonesia"):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.tokenizer = T5Tokenizer.from_pretrained(model_name)
        self.model = T5ForConditionalGeneration.from_pretrained(model_name).to(self.device)

    def respond(self, user_prompt: str, max_length: int = 128) -> str:
        prompt_formatted = f"respond dialog: {user_prompt.strip()}"
        inputs = self.tokenizer(prompt_formatted, return_tensors="pt", truncation=True).to(self.device)

        # Generasi dengan Beam Search untuk hasil optimal
        outputs = self.model.generate(
            **inputs,
            max_length=max_length,
            num_beams=4,
            no_repeat_ngram_size=2,
            early_stopping=True,
            temperature=0.7
        )
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)`,
            desc: 'Pipeline inferensi text generation T5 dengan parameter beam search dan penalti perulangan n-gram.'
          }
        },
        results: [
          { value: '3,000+', label: 'Pasangan Dialog Terlatih', sub: 'Dataset percakapan multi-domain' },
          { value: '12-Head', label: 'Multi-Head Attention', sub: 'Representasi konteks interaktif' },
          { value: '< 180ms', label: 'Rata-rata Waktu Inferensi', sub: 'Optimal untuk live interaction' }
        ],
        reflection: 'Melalui proyek ini, saya mengeksplorasi trade-off antara kreativitas generasi teks (temperature) dan ketepatan faktual. Memahami cara tuning hyperparameter transformer dan decoding algorithm memberikan fondasi kuat untuk proyek-proyek Large Language Model (LLM) tingkat lanjut di masa mendatang.'
      }
    },
    {
      slug: 'green-ranger', title: 'Green Ranger', kind: 'Aplikasi web', year: '2023 – 2024',
      meta: [['Peran', 'Backend Developer & Database Architect'], ['Tahun', '2023 – 2024'], ['Bidang', 'Lingkungan & Fin-Tech'], ['Stack', 'Laravel, MySQL, Midtrans Snap, Bootstrap 5']],
      summary: 'Platform pengelolaan donasi lingkungan terpadu, partisipasi aksi relawan hijau, serta eco-marketplace daur ulang yang terintegrasi dengan Midtrans Snap Gateway.',
      points: [
        'Manajemen donasi, registrasi aksi sukarelawan, dan eco-marketplace daur ulang secara terpadu.',
        'Integrasi alur pembayaran Midtrans Snap (Sandbox Client ID: SB-Mid-client-fq2d83yegG2NGx_f) dengan callback responsif SweetAlert.',
        'Pengujian menyeluruh modul backend dan konsistensi transaksi data.'
      ],
      tags: ['Laravel', 'MySQL', 'Midtrans Snap', 'Bootstrap 5', 'REST API', 'Payment Gateway'],
      links: [['GitHub', 'https://github.com/FirstyatamaAuzan']],
      evidences: [
        { type: 'pdf', title: 'Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SRS)', desc: 'Dokumen rekayasa perangkat lunak resmi sistem Green Ranger', file: 'assets/evidence/green-ranger/dokumen_srs_green_ranger.pdf' },
        { type: 'pdf', title: 'Dokumen Final Uji Perangkat Lunak (DUPL)', desc: 'Laporan pengujian menyeluruh modul dan validasi integrasi sistem', file: 'assets/evidence/green-ranger/Final DOKUMEN_UJI_PERANGKAT_LUNAK_DUPL_Sistem.pdf' },
        { type: 'image', title: 'Poster Resmi & Desain Sistem Green Ranger', desc: 'Desain visual arsitektur sistem dan kampanye lingkungan terpadu', file: 'assets/evidence/green-ranger/poster_green_ranger.png' }
      ],
      caseStudy: {
        role: 'Backend Developer & Database Architect',
        timeline: '2023 – 2024',
        stack: 'Laravel, PHP, MySQL, Midtrans Snap SDK, Bootstrap 5, REST API',
        quote: 'Membangun ekosistem aksi hijau terpercaya yang menyatukan sukarelawan, donatur, dan pengrajin daur ulang melalui gerbang transaksi otomatis terverifikasi.',
        challenge: 'Banyak inisiatif pelestarian lingkungan terhambat oleh proses penggalangan donasi manual yang rentan kecurangan dan minim bukti transfer transparan. Di sisi lain, para pegiat daur ulang sampah rumah tangga kesulitan mendistribusikan produk daur ulang mereka ke pasar yang lebih luas. Green Ranger dirancang sebagai platform all-in-one yang mengintegrasikan penggalangan donasi otomatis terhubung ke perbankan/e-wallet via payment gateway Midtrans Snap, sistem perekrutan relawan terstruktur, dan toko daring produk ramah lingkungan.',
        architecture: 'Green Ranger mengadopsi pola MVC pada framework Laravel. Arsitektur transaksi dirancang asinkron: ketika pengguna berdonasi atau berbelanja di eco-marketplace, server backend menghasilkan token transaksi Midtrans Snap. Pengguna menyelesaikan pembayaran melalui antarmuka popup interaktif. Notifikasi pembayaran kemudian dikirimkan oleh webhook Midtrans ke endpoint aman backend dengan validasi checksum SHA-512 sebelum status donasi diubah menjadi settlement dan dialokasikan ke kampanye aksi terkait.',
        architectureDiagram: 'green-ranger',
        implementation: {
          feature1: {
            title: 'Otomasi Payment Gateway Midtrans Snap & Webhook Idempotency',
            desc: 'Mengintegrasikan Midtrans Snap SDK dengan penanganan callback asynchronous yang aman. Memvalidasi payload SHA-512 signature key untuk memastikan seluruh notifikasi pembayaran berasal secara sah dari server Midtrans dan mencegah pembayaran ganda.',
            tag: 'Payment Architecture'
          },
          feature2: {
            title: 'Eco-Marketplace & Manajemen Pendaftaran Sukarelawan',
            desc: 'Menyediakan katalog produk daur ulang dengan inventori dinamis serta modul pendaftaran sukarelawan aksi lingkungan dengan alur persetujuan terpusat bagi koordinator kampanye.',
            tag: 'Marketplace & Community'
          },
          code: {
            filename: 'app/Http/Controllers/PaymentCallbackController.php',
            language: 'php',
            snippet: `namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use App\\Models\\Donation;
use Midtrans\\Config;
use Midtrans\\Notification;

class PaymentCallbackController extends Controller
{
    public function handleNotification(Request $request)
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = false;

        $notif = new Notification();
        $orderId = $notif->order_id;
        $statusCode = $notif->status_code;
        $grossAmount = $notif->gross_amount;
        $signatureKey = $notif->signature_key;

        // Validasi integritas payload menggunakan hash SHA-512
        $computedKey = hash("sha512", $orderId . $statusCode . $grossAmount . Config::$serverKey);
        if ($computedKey !== $signatureKey) {
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        $donation = Donation::where('transaction_code', $orderId)->firstOrFail();
        if ($notif->transaction_status === 'settlement') {
            $donation->update([
                'status'  => 'paid',
                'paid_at' => now()
            ]);
        }

        return response()->json(['status' => 'success']);
    }
}`,
            desc: 'Penanganan webhook payment callback Midtrans dengan verifikasi tanda tangan kriptografis SHA-512.'
          }
        },
        results: [
          { value: '100%', label: 'Verifikasi Otomatis', sub: 'Tanpa konfirmasi bukti transfer manual' },
          { value: '3', label: 'Pilar Solusi Terpadu', sub: 'Donasi, Relawan, & Eco-Marketplace' },
          { value: '< 2 Detik', label: 'Latensi Callback Transaksi', sub: 'Pembaruan status pembayaran instan' }
        ],
        reflection: 'Green Ranger menjadi tonggak penting saya dalam merancang sistem yang berinteraksi langsung dengan sistem pembayaran pihak ketiga. Saya memahami pentingnya penanganan webhook idempotency, keamanan signature verification, serta disiplin pembuatan dokumentasi resmi rekayasa perangkat lunak seperti SRS dan DUPL.'
      }
    },
    {
      slug: 'knn-kontainer', title: 'Identifikasi Kontainer KNN', kind: 'Machine Learning', year: '2024',
      meta: [['Peran', 'Machine Learning Engineer & Researcher'], ['Tahun', '2024'], ['Bidang', 'Computer Vision & Pattern Recognition'], ['Stack', 'Python, OpenCV, Scikit-learn, NumPy']],
      summary: 'Sistem identifikasi kontainer logistik berbasis warna menggunakan algoritma K-Nearest Neighbor (KNN), mencakup akuisisi data, praproses citra, pelatihan model, dan evaluasi akurasi.',
      points: [
        'Implementasi algoritma KNN untuk klasifikasi warna kontainer logistik dari data citra nyata.',
        'Praproses data citra: cropping ROI, konversi ruang warna, dan normalisasi fitur piksel.',
        'Evaluasi model dengan confusion matrix, akurasi, presisi, dan recall.',
        'Penyusunan laporan akademik lengkap (format jurnal IF0202) sesuai standar publikasi ilmiah.'
      ],
      tags: ['Python', 'KNN', 'OpenCV', 'Computer Vision', 'Scikit-learn', 'Pattern Recognition'],
      links: [['GitHub', 'https://github.com/FirstyatamaAuzan/Container-Detector-Use-KNN']],
      evidences: [
        { type: 'pdf', title: 'Laporan Resmi: Sistem Identifikasi Kontainer Berbasis KNN', desc: 'Laporan lengkap IF0202 — metodologi, implementasi, dan hasil evaluasi model KNN', file: 'assets/evidence/Container-Detector-Use-KNN/Laporan_IF0202_Firstyatama_Sistem Identifikasi Kontainer Berbasis Warna Menggunakan Algoritma KNN.pdf' },
        { type: 'image', title: 'Sampel Citra Kontainer 1 (OCR-AH-A01)', desc: 'Contoh citra kontainer pelabuhan yang digunakan pada dataset klasifikasi warna', file: 'assets/evidence/Container-Detector-Use-KNN/1-122720001-OCR-AH-A01_jpg.rf.fe435e6d553eaf690f5774ef0d1aecd4.jpg' },
        { type: 'image', title: 'Sampel Citra Kontainer 2 (OCR-AH-A01)', desc: 'Contoh citra kontainer pelabuhan dengan kondisi pencahayaan berbeda', file: 'assets/evidence/Container-Detector-Use-KNN/1-122906001-OCR-AH-A01_jpg.rf.f9300e0155a99d8585b13c8269075c7d.jpg' },
        { type: 'image', title: 'Sampel Citra Kontainer 3 (OCR-LF-C01)', desc: 'Contoh citra kontainer untuk pengujian deteksi warna dan pembacaan kode', file: 'assets/evidence/Container-Detector-Use-KNN/1-122906001-OCR-LF-C01_jpg.rf.58dba8d9bd8361620be4f1f30feba445.jpg' }
      ],
      caseStudy: {
        role: 'Machine Learning Engineer & Researcher',
        timeline: '2024 (Riset IF0202)',
        stack: 'Python, OpenCV, Scikit-learn, NumPy, Matplotlib, Jupyter',
        quote: 'Otomasi deteksi warna kontainer pelabuhan dengan presisi tinggi melalui ekstraksi fitur ruang warna dan klasifikasi K-Nearest Neighbor yang efisien.',
        challenge: 'Pencatatan peti kemas (kontainer) di terminal logistik pelabuhan sering kali masih dilakukan secara manual dengan risiko kelalaian tinggi. Kondisi lingkungan luar ruangan menghadirkan tantangan berat: pantulan sinar matahari terik, bayangan derek kargo, dan debu yang mengaburkan warna permukaan kontainer. Diperlukan metode visi komputer dan pattern recognition yang mampu mengekstrak fitur warna dari Region of Interest (ROI) secara akurat tanpa bergantung pada hardware komputasi tinggi seperti GPU server.',
        architecture: 'Pipeline sistem dimulai dari pengambilan citra kontainer pelabuhan, dilanjutkan dengan ekstraksi Region of Interest (ROI) pada bagian tengah dinding kontainer untuk menghindari teks stensil atau karat sudut. Citra ROI dikonversi dari ruang warna RGB ke HSV (Hue, Saturation, Value) untuk memisahkan komponen kromatis dari intensitas cahaya. Vektor rata-rata nilai piksel kemudian diumpankan ke model klasifikasi K-Nearest Neighbor (K=3) dengan metrik jarak Euclidean untuk menentukan kelas warna kontainer.',
        architectureDiagram: 'knn-kontainer',
        implementation: {
          feature1: {
            title: 'Praproses Citra & Konversi Ruang Warna HSV',
            desc: 'Menerapkan transformasi ruang warna dari RGB ke HSV guna memisahkan komponen Hue (informasi warna murni) dari Value (kecerahan), sehingga model tahan terhadap perubahan pencahayaan siang maupun sore hari di area pelabuhan.',
            tag: 'Image Processing'
          },
          feature2: {
            title: 'Optimasi Model KNN & Analisis Confusion Matrix',
            desc: 'Melakukan pencarian nilai hyperparameter K optimal (K=3) dan mengevaluasi kinerja klasifikasi menggunakan matriks kebingungan (confusion matrix), mengukur akurasi, presisi, serta recall pada setiap kelas warna kontainer (merah, biru, hijau, oranye).',
            tag: 'Pattern Recognition'
          },
          code: {
            filename: 'classifier/knn_container.py',
            language: 'python',
            snippet: `import cv2
import numpy as np
from sklearn.neighbors import KNeighborsClassifier

class ContainerColorClassifier:
    def __init__(self, k_neighbors=3):
        self.model = KNeighborsClassifier(n_neighbors=k_neighbors, metric='euclidean')

    def extract_hsv_features(self, image_path, roi_box):
        """Mengekstrak rata-rata fitur HSV dari Region of Interest kontainer"""
        image = cv2.imread(image_path)
        x, y, w, h = roi_box
        roi = image[y:y+h, x:x+w]
        
        # Konversi ke HSV untuk ketahanan terhadap variasi pencahayaan
        hsv_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
        h_mean = np.mean(hsv_roi[:, :, 0])
        s_mean = np.mean(hsv_roi[:, :, 1])
        v_mean = np.mean(hsv_roi[:, :, 2])
        return np.array([h_mean, s_mean, v_mean])

    def predict(self, feature_vector):
        prediction = self.model.predict([feature_vector])
        probabilities = self.model.predict_proba([feature_vector])
        confidence = np.max(probabilities)
        return prediction[0], confidence`,
            desc: 'Ekstraksi fitur rata-rata nilai HSV pada ROI dan klasifikasi probabilitas menggunakan Scikit-Learn KNN.'
          }
        },
        results: [
          { value: '94.0%', label: 'Akurasi Klasifikasi Warna', sub: 'Teruji pada variasi pencahayaan lapangan' },
          { value: '4', label: 'Kelas Warna Kontainer', sub: 'Merah, Biru, Hijau, & Oranye' },
          { value: '< 50ms', label: 'Waktu Inferensi per Citra', sub: 'Sangat ringan dijalankan di edge CPU' }
        ],
        reflection: 'Eksperimen ini mengajarkan saya bahwa pemilihan ruang warna yang tepat (seperti HSV dibanding RGB) sering kali memberikan dampak akurasi yang lebih drastis dibanding menambah kompleksitas model. Proyek ini melatih ketelitian saya dalam praproses data citra dan penyusunan laporan akademik ilmiah berstandar IF0202.'
      }
    },
    {
      slug: 'bakul-omah', title: 'Bakul Omah', kind: 'Company Profile', year: '2024',
      meta: [['Peran', 'Front-End Developer'], ['Tahun', '2024'], ['Bidang', 'Web Company Profile & Properti'], ['Stack', 'HTML5, CSS3, JavaScript, jQuery, Swiper.js']],
      summary: 'Website company profile Bakul Omah, pengembang properti dan resort tepi pantai, dengan halaman beranda, profil perusahaan, dan detail properti.',
      points: [
        'Halaman beranda dengan video latar, pengenalan perusahaan, visi, dan misi.',
        'Halaman profil dan detail properti dengan galeri slider interaktif berbasis Swiper.js.',
        'Tata letak responsif dengan navigasi antarhalaman dan tombol scroll-to-top.'
      ],
      tags: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Swiper.js', 'Responsive Design'],
      links: [['Live Demo', 'assets/evidence/web%20bakul%20omah/beranda.html']],
      evidences: [
        { type: 'image', title: 'Logo Bakul Omah', desc: 'Identitas visual perusahaan yang digunakan pada navigasi website', file: 'assets/evidence/web bakul omah/assets/img/omah logo 1.png' },
        { type: 'image', title: 'Aset Visual: Resort', desc: 'Foto properti resort yang ditampilkan pada galeri halaman profil', file: 'assets/evidence/web bakul omah/assets/img/resort.jpg' },
        { type: 'image', title: 'Aset Visual: Beach Bar', desc: 'Foto fasilitas tepi pantai pada halaman profil perusahaan', file: 'assets/evidence/web bakul omah/assets/img/beachbar.jpg' },
        { type: 'image', title: 'Aset Visual: Interior', desc: 'Foto interior hunian pada halaman detail properti', file: 'assets/evidence/web bakul omah/assets/img/interior1.jpg' }
      ]
    }
  ],

  experience: [
    {
      slug: 'bandung-techno-park', title: 'Bandung Techno Park', kind: 'Kerja', year: '2026',
      meta: [['Posisi', 'Full Stack Developer'], ['Program', 'Wrap Entrepreneurship'], ['Periode', 'Feb – Jun 2026'], ['Lokasi', 'Surabaya']],
      summary: 'Membangun CoHive, platform manajemen koperasi, dari backend sampai antarmuka.',
      points: ['Backend dengan Laravel, MySQL, dan REST API.', 'Komponen frontend dengan Blade, Tailwind CSS, dan JavaScript.', 'Fitur keuangan, donasi, dan keanggotaan.', 'Menyerahkan MVP yang berfungsi.'],
      tags: ['Laravel', 'MySQL', 'Tailwind CSS'],
      evidences: [
        { type: 'pdf', title: 'Sertifikat Resmi Kelulusan MBKM WRAP 2025', desc: 'Diterbitkan oleh Telkom University & inkubator Bandung Techno Park', file: 'assets/evidence/cohive/sertifikat_mbkm_wrap.pdf' },
        { type: 'pdf', title: 'Pitch Deck CoHive (Business & System Design)', desc: 'Dokumen presentasi produk di hadapan mentor bisnis dan inkubator', file: 'assets/evidence/cohive/pitchdeck_cohive.pdf' }
      ],
      links: [['GitHub', 'https://github.com/FirstyatamaAuzan/CoHive']],
      caseStudy: {
        role: 'Full Stack Developer',
        timeline: 'Feb 2025 – Jun 2026 (WRAP MBKM)',
        stack: 'Laravel 11, PHP 8.2, MySQL, Tailwind CSS, REST API',
        quote: 'Mentransformasi tata kelola koperasi tradisional menjadi ekosistem digital transparan, akuntabel, dan terukur dengan otomasi pembukuan real-time.',
        challenge: 'Koperasi produsen di Indonesia sering kali masih bergantung pada pencatatan buku kas konvensional atau spreadsheet terpisah. Hal ini memicu risiko tinggi ketidaksesuaian neraca saldo, pelacakan donasi sosial yang samar, dan minimnya transparansi pembagian Sisa Hasil Usaha (SHU) kepada anggota produsen. CoHive dirancang untuk menyelesaikan seluruh hambatan tersebut dengan menghadirkan platform web multi-peran (Superadmin, Pengurus, dan Anggota) yang mengotomasi pencatatan ledger keuangan, verifikasi kas masuk/keluar, dan laporan akuntabilitas yang dapat diaudit kapan pun.',
        architecture: 'CoHive dibangun menggunakan arsitektur MVC modern dengan Laravel 11. Logika bisnis dipisahkan secara ketat ke dalam Service Layer terisolasi (Financial Ledger Service, Membership Manager, dan Donation Engine). Seluruh operasi mutasi saldo dilindungi oleh Database Transaction berstandar ACID pada engine InnoDB MySQL dengan row-level locking (lockForUpdate) guna mencegah race condition saat terjadi transaksi simultan. Antarmuka menggunakan komponen modular Blade yang dipercantik Tailwind CSS dengan interaksi asynchronous AJAX untuk pengalaman pengguna yang gesit.',
        architectureDiagram: 'cohive',
        implementation: {
          feature1: {
            title: 'Double-Entry Ledger & Multi-Role Permissions',
            desc: 'Merancang arsitektur pembukuan entri ganda otomatis di mana setiap mutasi kredit/debit dicatat berpasangan ke tabel ledger audit. Dilengkapi kontrol otorisasi bertingkat (RBAC) dengan middleware kustom untuk menjamin pemisahan wewenang operasional kasir, sekretaris, dan ketua pengurus.',
            tag: 'Core Financial Engine'
          },
          feature2: {
            title: 'Portal Anggota Interaktif & Dasbor Donasi Terbuka',
            desc: 'Menghadirkan antarmuka berbasis web responsif yang memungkinkan setiap anggota memantau kontribusi simpanan wajib/sukarela, estimasi pembagian SHU tahunan, serta transparansi aliran dana sosial donasi secara real-time langsung melalui perangkat mobile maupun desktop.',
            tag: 'Frontend Experience'
          },
          code: {
            filename: 'app/Services/CooperativeTransactionService.php',
            language: 'php',
            snippet: `namespace App\\Services;

use App\\Models\\Transaction;
use App\\Models\\CooperativeLedger;
use Illuminate\\Support\\Facades\\DB;

class CooperativeTransactionService
{
    public function recordTransaction(array $payload, int $userId): Transaction
    {
        return DB::transaction(function () use ($payload, $userId) {
            $currentBalance = CooperativeLedger::lockForUpdate()
                ->latest('id')
                ->value('running_balance') ?? 0;

            $newBalance = $payload['type'] === 'credit'
                ? $currentBalance + $payload['amount']
                : $currentBalance - $payload['amount'];

            $transaction = Transaction::create([
                'user_id'          => $userId,
                'category'         => $payload['category'],
                'amount'           => $payload['amount'],
                'type'             => $payload['type'],
                'running_balance'  => $newBalance,
                'status'           => 'verified'
            ]);

            CooperativeLedger::create([
                'transaction_id'   => $transaction->id,
                'debit'            => $payload['type'] === 'debit' ? $payload['amount'] : 0,
                'credit'           => $payload['type'] === 'credit' ? $payload['amount'] : 0,
                'running_balance'  => $newBalance
            ]);

            return $transaction;
        });
    }
}`,
            desc: 'Implementasi ACID Database Transaction pada pencatatan mutasi kas dan buku besar koperasi dengan locking baris concurrency.'
          }
        },
        results: [
          { value: '100%', label: 'Akurasi Rekonsiliasi Kas', sub: 'Meniadakan selisih hitung manual' },
          { value: '4', label: 'Modul Utama Terintegrasi', sub: 'Kas, SHU, Anggota, Donasi' },
          { value: '3-Tier', label: 'Hak Akses Keamanan', sub: 'Superadmin, Pengurus, Anggota' }
        ],
        reflection: 'Pengembangan CoHive memberikan pemahaman praktis yang kuat tentang bagaimana membangun sistem transaksional yang tahan banting. Penanganan konsistensi data finansial dengan locking dan database transactions mengajarkan saya bahwa kecepatan pengembangan tidak boleh mengorbankan integritas data bisnis. Proyek ini juga mengasah kemampuan komunikasi saya dalam merancang UI/UX yang bersahabat bagi pengguna non-teknis seperti para pelaku UMKM dan pengurus koperasi.'
      }
    },
    {
      slug: 'cmlabs', title: 'PT cmlabs Indonesia Digital', kind: 'Magang', year: '2025',
      meta: [['Posisi', 'Backend Developer Intern'], ['Periode', 'Jan – Mei 2025'], ['Lokasi', 'Malang'], ['Stack', 'Node.js, MySQL']],
      summary: 'Backend untuk platform pemeriksa plagiarisme.',
      points: ['Mengembangkan dan merawat layanan backend dengan Node.js dan MySQL.', 'Merancang struktur basis data dan REST API untuk deteksi kemiripan konten.', 'Meningkatkan performa dan proses deteksi plagiarisme berbasis SEO.', 'Bekerja bersama engineer dan tester untuk platform yang stabil dan skalabel.'],
      tags: ['Node.js', 'MySQL', 'REST API'],
      links: [['GitHub', 'https://github.com/FirstyatamaAuzan/Plagiarism_Checker']],
      evidences: [
        { type: 'pdf', title: 'Surat Keterangan Selesai Kerja Praktik PT. cmlabs', desc: 'Surat pengesahan resmi selesai magang industri dari cmlabs & Tel-U', file: 'assets/evidence/cmlabs/surat_keterangan_selesai_kp_cmlabs.pdf' },
        { type: 'image', title: 'Dashboard Plagiarism Checker – Overview', desc: 'Tampilan utama platform deteksi plagiarisme berbasis Node.js', file: 'assets/evidence/cmlabs/Screenshot 2025-04-16 121532.png' },
        { type: 'image', title: 'Modul Analisis Konten – Detail Report', desc: 'Halaman detail laporan analisis kemiripan konten SEO', file: 'assets/evidence/cmlabs/Screenshot 2025-04-23 020444.png' },
        { type: 'image', title: 'API Response – Plagiarism Audit Endpoint', desc: 'Output REST API endpoint audit konten dengan skor kemiripan semantik', file: 'assets/evidence/cmlabs/Screenshot 2025-04-23 020627.png' },
        { type: 'image', title: 'Screenshot Output Pengujian Modul Audit SEO 1', desc: 'Hasil analisis kemiripan konten semantik berbasis Sentence Transformers', file: 'assets/evidence/cmlabs/result_audit1.jpg' },
        { type: 'image', title: 'Screenshot Output Pengujian Modul Audit SEO 2', desc: 'Verifikasi deteksi duplikasi konten otomatis antar halaman web', file: 'assets/evidence/cmlabs/result_audit2.jpg' }
      ]
    },
    {
      slug: 'asisten-riset', title: 'Telkom University Surabaya', kind: 'Riset', year: '2024',
      meta: [['Posisi', 'Asisten Riset Mahasiswa'], ['Periode', 'Jan – Jul 2024'], ['Topik', 'Pembaca kode kontainer'], ['Bidang', 'Computer vision']],
      summary: 'Riset sistem pembaca kode kontainer berbasis machine learning.',
      points: ['Mengimplementasikan dan mengoptimalkan algoritma pengenalan objek.', 'Praproses data, pelatihan model, dan evaluasi.', 'Berkontribusi pada penyusunan publikasi dan dokumentasi riset.'],
      tags: ['Python', 'Keras-OCR', 'TensorFlow']
    },
    {
      slug: 'hima', title: 'Himpunan Mahasiswa Informatika', kind: 'Organisasi', year: '2024',
      meta: [['Posisi', 'Staf Pengembangan SDM'], ['Periode', 'Jan – Des 2024'], ['Lembaga', 'Telkom University Surabaya'], ['Bidang', 'Pengembangan anggota']],
      summary: 'Merancang pelatihan, lokakarya, dan pendampingan bagi mahasiswa.',
      points: ['Menyelenggarakan pelatihan internal, lokakarya, dan mentoring.', 'Terlibat dalam acara besar: TEMATICS, FORTASTICS, dan FUNSPORTIKA 2024.', 'Menjadi pembawa acara (MC) pada Pemilihan Mahasiswa 2024.', 'Ikut mengevaluasi program organisasi.'],
      tags: ['Kepemimpinan', 'Komunikasi', 'Event'],
      evidences: [
        { type: 'pdf', title: 'Proposal FORTASTICS 2024 HIMA Informatika', desc: 'Proposal kegiatan penyambutan mahasiswa baru Informatika yang disusun bersama panitia', file: 'assets/evidence/Hima/Proporsal Fortastics HIMA Informatika 2024.pdf' },
        { type: 'pdf', title: 'Proposal TEMATICS 2024 HIMA Informatika', desc: 'Proposal acara tahunan TEMATICS 2024 HIMA Informatika Telkom University Surabaya', file: 'assets/evidence/Hima/Proporsal Tematics 2024 HIMA Informatika 2024.pdf' },
        { type: 'image', title: 'Sertifikat Kepengurusan HIMA Informatika', desc: 'Sertifikat resmi keanggotaan pengurus Himpunan Mahasiswa Informatika', file: 'assets/evidence/Hima/Sertif.jpeg' }
      ]
    },
  ],


  organization: [
    {
      slug: 'hima-psdm',
      title: 'Himpunan Mahasiswa Informatika (HMIF)',
      kind: 'Kepengurusan Ormawa',
      year: '2023 – 2025',
      role: 'Staf Ahli PSDM',
      institution: 'HMIF Telkom University Surabaya',
      certCover: 'assets/certs/baru/Firsyatama Auzan Farhadi hima.jpg',
      certFile: 'assets/certs/baru/Firsyatama Auzan Farhadi hima.jpg',
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
      role: 'Moderator Orasi & Debat',
      institution: 'KPU HMIF Tel-U Surabaya',
      certCover: 'assets/certs/baru/Firsyatama Auzan Farhadi pemira.jpg',
      certFile: 'assets/certs/baru/Firsyatama Auzan Farhadi pemira.jpg',
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
      role: 'Sekretaris 1 Panitia',
      institution: 'HMIF Telkom University Surabaya',
      certCover: 'assets/certs/baru/Firsyatama Auzan Farhadi FORTASTIC\'24.jpg',
      certFile: 'assets/certs/baru/Firsyatama Auzan Farhadi FORTASTIC\'24.jpg',
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
    },
    {
      slug: 'tematics-2024',
      title: 'TEMATICS 2024 (Informatics Annual Event)',
      kind: 'Kepanitiaan & Event',
      year: '2024',
      role: 'Sekretaris 1 Panitia',
      institution: 'HMIF Telkom University Surabaya',
      certCover: 'assets/certs/baru/Firsyatama Auzan Farhadi TEMATICS\'24.jpg',
      certFile: 'assets/certs/baru/Firsyatama Auzan Farhadi TEMATICS\'24.jpg',
      meta: [['Peran', 'Panitia'], ['Penyelenggara', 'HMIF Telkom University Surabaya'], ['Waktu', '2024'], ['Skala', 'Tingkat Program Studi']],
      summary: 'Panitia acara tahunan besar Informatika Telkom University Surabaya (TEMATICS 2024), event yang melibatkan ratusan mahasiswa aktif lintas angkatan.',
      points: [
        'Berkontribusi aktif dalam perencanaan, koordinasi, dan pelaksanaan rangkaian acara tahunan himpunan.',
        'Berkolaborasi bersama divisi lain untuk memastikan kelancaran teknis dan logistik acara.',
        'Memastikan partisipasi dan antusiasme peserta dari berbagai angkatan dan divisi.'
      ],
      tags: ['Event Organizing', 'Kolaborasi Tim', 'Koordinasi Acara'],
      evidences: [
        { type: 'image', title: "Sertifikat Panitia TEMATICS 2024", desc: 'Pengesahan resmi dari Ketua Pelaksana & Pembina HMIF Tel-U Surabaya', file: "assets/certs/baru/Firsyatama Auzan Farhadi TEMATICS'24.jpg" }
      ]
    },
    {
      slug: 'funsportika-2024',
      title: 'FUNSPORTIKA 2024 (Sports & Cultural Event)',
      kind: 'Kepanitiaan & Event',
      year: '2024',
      role: 'Panitia Devisi Acara',
      institution: 'HMIF Telkom University Surabaya',
      certCover: 'assets/certs/baru/Firsyatama Auzan Farhadi funsportika.jpg',
      certFile: 'assets/certs/baru/Firsyatama Auzan Farhadi funsportika.jpg',
      meta: [['Peran', 'Panitia'], ['Penyelenggara', 'HMIF Telkom University Surabaya'], ['Waktu', '2024'], ['Skala', 'Tingkat Program Studi']],
      summary: 'Panitia acara olahraga dan seni tahunan FUNSPORTIKA 2024 yang diikuti seluruh mahasiswa aktif program studi Informatika Telkom University Surabaya.',
      points: [
        'Mendukung penyelenggaraan kompetisi olahraga dan pertunjukan seni antar angkatan mahasiswa.',
        'Berperan dalam koordinasi teknis dan operasional lapangan selama rangkaian kegiatan berlangsung.',
        'Mendorong semangat kebersamaan dan keseimbangan antara akademik dan non-akademik mahasiswa.'
      ],
      tags: ['Event Organizing', 'Olahraga & Seni', 'Koordinasi Tim'],
      evidences: [
        { type: 'image', title: 'Sertifikat Panitia FUNSPORTIKA 2024', desc: 'Pengesahan resmi dari Ketua Pelaksana FUNSPORTIKA HMIF Tel-U Surabaya', file: 'assets/certs/baru/Firsyatama Auzan Farhadi funsportika.jpg' }
      ]
    },
    {
      slug: 'tus-championship',
      title: 'TUS Championship (Sports Tournament)',
      kind: 'Kepanitiaan & Event',
      year: '2024',
      role: 'Panitia Turnamen Universitas',
      institution: 'Telkom University Surabaya',
      certCover: 'assets/certs/thumbnails/TUS-Champ.jpg',
      certFile: 'assets/certs/TUS-Champ.pdf',
      meta: [['Peran', 'Panitia'], ['Penyelenggara', 'Telkom University Surabaya'], ['Waktu', '2024'], ['Skala', 'Tingkat Universitas']],
      summary: 'Panitia turnamen olahraga antar fakultas dan program studi Telkom University Surabaya (TUS Championship).',
      points: [
        'Terlibat dalam pengelolaan dan pelaksanaan kompetisi olahraga tingkat universitas.',
        'Mengkoordinasikan jadwal pertandingan, pengelolaan peserta, dan teknis pelaksanaan lapangan.',
        'Memastikan sportivitas dan kelancaran seluruh sesi kompetisi berjalan sesuai aturan.'
      ],
      tags: ['Event Organizing', 'Olahraga', 'Koordinasi Universitas'],
      evidences: [
        { type: 'pdf', title: 'Sertifikat Kontribusi Kemahasiswaan Tel-U 2024', desc: 'Pengesahan resmi kegiatan dan kompetisi Telkom University Surabaya', file: 'assets/certs/SERTIFIKAT_TEL-U_CAREER_COACH_-_INTRAPRENEUR.pdf' }
      ]
    },
    {
      slug: 'diesnatalis-2024',
      title: 'Diesnatalis Telkom University Surabaya 2024',
      kind: 'Kepanitiaan & Event',
      year: '2024',
      role: 'Panitia Diesnatalis Kampus',
      institution: 'Telkom University Surabaya',
      certCover: 'assets/certs/thumbnails/sertif diesnatalis.jpg',
      certFile: 'assets/certs/sertif diesnatalis.pdf',
      meta: [['Peran', 'Panitia'], ['Penyelenggara', 'Telkom University Surabaya'], ['Waktu', '2024'], ['Skala', 'Tingkat Universitas']],
      summary: 'Panitia peringatan Hari Jadi (Diesnatalis) Telkom University Surabaya 2024 — perayaan tahunan yang melibatkan seluruh sivitas akademika universitas.',
      points: [
        'Berpartisipasi aktif dalam perancangan dan pelaksanaan seremoni perayaan hari jadi kampus.',
        'Mendukung koordinasi antar lembaga kemahasiswaan dalam menyukseskan acara tingkat universitas.',
        'Berkontribusi pada salah satu divisi teknis acara utama.'
      ],
      tags: ['Event Organizing', 'Perayaan Kampus', 'Koordinasi Lintas Lembaga'],
      evidences: [
        { type: 'pdf', title: 'Sertifikat Panitia Diesnatalis TU Surabaya 2024', desc: 'Pengesahan resmi dari Panitia Diesnatalis Telkom University Surabaya 2024', file: 'assets/certs/sertif diesnatalis.pdf' }
      ]
    }
  ],

  achievements: [
    { title: 'Machine Learning & Data Science dengan Microsoft Azure', issuer: 'Dicoding Indonesia', year: '2026', tag: 'Cloud & AI', file: 'assets/certs/Sertif_cv/serifikat dicoding data sience microsoft azure.pdf', cover: 'assets/certs/thumbnails/serifikat dicoding data sience microsoft azure.jpg' },
    { title: 'Aplikasi Generative AI Menggunakan Azure AI Foundry', issuer: 'Dicoding Indonesia', year: '2026', tag: 'Gen AI & RAG', file: 'assets/certs/Sertif_cv/sertifikat_dicoding_genAI Azure.pdf', cover: 'assets/certs/thumbnails/sertifikat_dicoding_genAI Azure.jpg' },
    { title: 'Dasar Cloud & Generative AI AWS', issuer: 'Dicoding Indonesia / AWS', year: '2026', tag: 'Cloud & Gen AI', file: 'assets/certs/Sertif_cv/sertifikat_dasar_cloud_dan Gen AI AWS.pdf', cover: 'assets/certs/thumbnails/sertifikat_dasar_cloud_dan Gen AI AWS.jpg' },
    { title: 'Backend Development with Node.js & Express', issuer: 'MySkill', year: '2025', tag: 'Backend', file: 'assets/certs/Sertif_cv/Sertif Backend node.js - MySkill.pdf', cover: 'assets/certs/thumbnails/Sertif Backend node_js - MySkill.jpg' },
    { title: 'Application Deployment & CI/CD Fundamentals', issuer: 'MySkill', year: '2025', tag: 'DevOps', file: 'assets/certs/Sertif_cv/sertif app deplomet MySkill.pdf', cover: 'assets/certs/thumbnails/sertif app deplomet MySkill.jpg' },
    { title: 'Berpikir Kritis di Era Kecerdasan Buatan', issuer: 'HP Foundation (HP LIFE)', year: '2026', tag: 'AI Ethics', file: 'assets/certs/Sertif_cv/Berpikir Kritis di Era Kecerdasan Buatan.pdf', cover: 'assets/certs/thumbnails/Berpikir Kritis di Era Kecerdasan Buatan.jpg' },
    { title: 'English Proficiency Test (Score: 470 - CEFR B1)', issuer: 'Pusat Bahasa Telkom University', year: '2026', tag: 'Language', file: 'assets/certs/Sertifikat_EPRT.pdf', cover: 'assets/certs/thumbnails/Sertifikat_EPRT.jpg' },
    { title: 'International Guest Lecture: Exploring Blockchain', issuer: 'Telkom University Surabaya', year: '2024', tag: 'Blockchain', file: 'assets/certs/baru/FIRSTYATAMA AUZAN FARHADI blockchain.jpg', cover: 'assets/certs/baru/FIRSTYATAMA AUZAN FARHADI blockchain.jpg' },
    { title: 'Kunjungan Industri: Penerapan AI pada Dunia Industri', issuer: 'Telkom University Surabaya', year: '2024', tag: 'Industry Visit', file: 'assets/certs/baru/Firstyatama Auzan Farhadi kunjungan industri (1) (1).png', cover: 'assets/certs/baru/Firstyatama Auzan Farhadi kunjungan industri (1) (1).png' },
    { title: 'Introduction to Web & Machine Learning Track', issuer: 'Google Developer Student Clubs (GDSC)', year: '2023', tag: 'Web & ML', file: 'assets/certs/gdsc.jpg', cover: 'assets/certs/gdsc.jpg' },
    { title: 'Frontend Developer: Coding Camp', issuer: 'Harisenin.com', year: '2023', tag: 'Frontend', file: 'assets/certs/harisenin.jpg', cover: 'assets/certs/harisenin.jpg' }
  ],
};


/* Thumbnail dokumen (halaman pertama PDF / versi kecil gambar) untuk section BUKTI & DOKUMEN. */
window.EV_THUMBS = {
  "assets/evidence/semsim/Buku TA_Firstyatama Auzan Farhadi-1-20 (1).pdf": "assets/evidence/thumbs/evidence-semsim-buku-ta.jpg",
  "assets/evidence/semsim/distribusi_anotasi.png": "assets/evidence/thumbs/evidence-semsim-distribusi-anotasi.jpg",
  "assets/evidence/semsim/flowchart_arsitektur.png": "assets/evidence/thumbs/evidence-semsim-flowchart-arsitektur.jpg",
  "assets/evidence/green-ranger/dokumen_srs_green_ranger.pdf": "assets/evidence/thumbs/evidence-green-ranger-dokumen-srs-green-ranger.jpg",
  "assets/evidence/green-ranger/Final DOKUMEN_UJI_PERANGKAT_LUNAK_DUPL_Sistem.pdf": "assets/evidence/thumbs/evidence-green-ranger-final-dokumen-uji-perangkat-lunak-dupl-sistem.jpg",
  "assets/evidence/green-ranger/poster_green_ranger.png": "assets/evidence/thumbs/evidence-green-ranger-poster-green-ranger.jpg",
  "assets/evidence/cohive/sertifikat_mbkm_wrap.pdf": "assets/evidence/thumbs/evidence-cohive-sertifikat-mbkm-wrap.jpg",
  "assets/evidence/cohive/pitchdeck_cohive.pdf": "assets/evidence/thumbs/evidence-cohive-pitchdeck-cohive.jpg",
  "assets/evidence/cmlabs/surat_keterangan_selesai_kp_cmlabs.pdf": "assets/evidence/thumbs/evidence-cmlabs-surat-keterangan-selesai-kp-cmlabs.jpg",
  "assets/evidence/cmlabs/Screenshot 2025-04-16 121532.png": "assets/evidence/thumbs/evidence-cmlabs-screenshot-2025-04-16-121532.jpg",
  "assets/evidence/cmlabs/Screenshot 2025-04-23 020444.png": "assets/evidence/thumbs/evidence-cmlabs-screenshot-2025-04-23-020444.jpg",
  "assets/evidence/cmlabs/Screenshot 2025-04-23 020627.png": "assets/evidence/thumbs/evidence-cmlabs-screenshot-2025-04-23-020627.jpg",
  "assets/evidence/cmlabs/result_audit1.jpg": "assets/evidence/thumbs/evidence-cmlabs-result-audit1.jpg",
  "assets/evidence/cmlabs/result_audit2.jpg": "assets/evidence/thumbs/evidence-cmlabs-result-audit2.jpg",
  "assets/certs/baru/Firsyatama Auzan Farhadi hima.jpg": "assets/evidence/thumbs/certs-baru-firsyatama-auzan-farhadi-hima.jpg",
  "assets/certs/baru/Firsyatama Auzan Farhadi pemira.jpg": "assets/evidence/thumbs/certs-baru-firsyatama-auzan-farhadi-pemira.jpg",
  "assets/certs/baru/Firsyatama Auzan Farhadi FORTASTIC'24.jpg": "assets/evidence/thumbs/certs-baru-firsyatama-auzan-farhadi-fortastic-24.jpg",
  "assets/certs/baru/Firsyatama Auzan Farhadi TEMATICS'24.jpg": "assets/evidence/thumbs/certs-baru-firsyatama-auzan-farhadi-tematics-24.jpg",
  "assets/certs/baru/Firsyatama Auzan Farhadi funsportika.jpg": "assets/evidence/thumbs/certs-baru-firsyatama-auzan-farhadi-funsportika.jpg",
  "assets/certs/SERTIFIKAT_TEL-U_CAREER_COACH_-_INTRAPRENEUR.pdf": "assets/evidence/thumbs/certs-sertifikat-tel-u-career-coach-intrapreneur.jpg",
  "assets/certs/sertif diesnatalis.pdf": "assets/evidence/thumbs/certs-sertif-diesnatalis.jpg"
};
