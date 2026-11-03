// Ambil tombol "scroll to top"
var scrollToTopBtn = document.getElementById("scrollToUp");

// Tambahkan event listener ketika tombol di-klik
scrollToTopBtn.addEventListener("click", function() {
  // Scroll ke bagian atas halaman
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Efek scroll mulus
  });
});

// Tampilkan atau sembunyikan tombol "scroll to top" berdasarkan posisi scroll
window.addEventListener("scroll", function() {
  // Jika posisi scroll lebih dari 100 piksel dari bagian atas halaman
  if (window.pageYOffset > 100) {
    // Tampilkan tombol "scroll to top"
    scrollToTopBtn.style.display = "block";
  } else {
    // Sembunyikan tombol "scroll to top"
    scrollToTopBtn.style.display = "none";
  }
});
