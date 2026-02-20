const wrapper = document.querySelector(".testi-wrapper");

if (wrapper) {
  let index = 0;
  const cards = document.querySelectorAll(".testi-card");
  const total = cards.length;

  if (total === 0) return; // BUG FIX: guard jika tidak ada card

  setInterval(() => {
    index++;
    if (index >= total) index = 0;

    // BUG FIX: Hitung lebar card + gap secara dinamis dari DOM,
    // bukan hardcode "+ 25" yang tidak sinkron dengan CSS (2.5rem = ~40px)
    const card = cards[0];
    const cardStyle = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth;
    const gapStyle = window.getComputedStyle(wrapper).gap;
    const gap = parseFloat(gapStyle) || 40; // fallback 40px jika gap tidak terbaca

    wrapper.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
  }, 3000);
}
