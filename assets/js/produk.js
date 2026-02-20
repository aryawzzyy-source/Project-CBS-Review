const cards = document.querySelectorAll(".produk-card");
const modal = document.getElementById("modalDetail");

// BUG FIX: Guard — jika elemen modal tidak ada (halaman selain produk), hentikan eksekusi
if (!modal) {
  // Tidak ada modal di halaman ini, skip semua logika produk
} else {
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalHarga = document.getElementById("modalHarga");
  const modalBahan = document.getElementById("modalBahan");
  const modalWaktu = document.getElementById("modalWaktu");
  const btnWA = document.getElementById("btnWA");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // BUG FIX: Cek tiap elemen sebelum assign nilainya
      if (modalImg) modalImg.src = card.dataset.img || "";
      if (modalTitle) modalTitle.innerText = card.dataset.nama || "";
      if (modalDesc) modalDesc.innerText = card.dataset.desc || "";
      if (modalHarga) modalHarga.innerText = card.dataset.harga || "";
      if (modalBahan) modalBahan.innerText = card.dataset.bahan || "";
      if (modalWaktu) modalWaktu.innerText = card.dataset.waktu || "";

      if (btnWA) {
        btnWA.href = `https://wa.me/6287776988332?text=Halo, saya tertarik dengan ${card.dataset.nama || "produk Anda"}`;
      }

      modal.classList.add("show");
      document.body.classList.add("modal-open");
    });
  });

  function closeModal() {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  const closeBtn = document.querySelector(".close-modal");
  if (closeBtn) closeBtn.onclick = closeModal; // BUG FIX: guard null

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // BUG FIX: Guard untuk searchInput & filterSelect (tidak perlu duplikat if)
  const searchInput = document.getElementById("searchProduk");
  const filterSelect = document.getElementById("filterKategori");

  function filterProduk() {
    const keyword = searchInput ? searchInput.value.toLowerCase() : "";
    const kategori = filterSelect ? filterSelect.value : "all";

    cards.forEach((card) => {
      const nama = (card.dataset.nama || "").toLowerCase();
      const cocokSearch = nama.includes(keyword);
      const cocokKategori =
        kategori === "all" || card.dataset.kategori === kategori;

      card.style.display = cocokSearch && cocokKategori ? "block" : "none";
    });
  }

  if (searchInput) searchInput.addEventListener("input", filterProduk);
  if (filterSelect) filterSelect.addEventListener("change", filterProduk);
}
