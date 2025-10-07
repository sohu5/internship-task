document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('demo');
  const mainImage = document.getElementById('mainImage');
  const cards = document.querySelectorAll('.wrapper .card');

  let currentIndex = 0;

  function updateMainImage(index) {
    cards.forEach(card => card.classList.remove('active'));
    cards[index].classList.add('active');
    mainImage.src = cards[index].querySelector('img').src;
  }

  const nextBtn = carousel.querySelector('.carousel-control-next');
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateMainImage(currentIndex);
  });

  const prevBtn = carousel.querySelector('.carousel-control-prev');
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateMainImage(currentIndex);
  });
});
