document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('active')) {
        cards.forEach(c => c.classList.remove('active')); 
        card.classList.add('active'); 
      }
    });
  });
});
