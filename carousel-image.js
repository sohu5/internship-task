document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.wrapper');
    let cards = Array.from(wrapper.querySelectorAll('.card'));
    const gap = 5;
    const delay = 2000; 
    const transitionSpeed = 0.5; 
    let currentIndex = 0;
    let cardWidth;
    let interval;

    
    function calculateCardWidth() {
        cardWidth = cards[0].offsetWidth + gap;
        wrapper.style.width = `${cards.length * cardWidth}px`;
    }

   
    function createClones() {
        const clones = cards.map(card => card.cloneNode(true));
        clones.forEach(clone => wrapper.appendChild(clone));
        cards = Array.from(wrapper.querySelectorAll('.card')); 
    }

    
    function updatePosition(animate = true) {
        wrapper.style.transition = animate ? `transform ${transitionSpeed}s ease-in-out` : 'none';
        wrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

   
    function scrollNext() {
        currentIndex++;
        updatePosition(true);

        if (currentIndex === cards.length / 2) {
            
            setTimeout(() => {
                wrapper.style.transition = 'none';
                currentIndex = 0;
                updatePosition(false);
            }, transitionSpeed * 500);
        }
    }

    
    function scrollPrev() {
        currentIndex--;
        if (currentIndex < 0) {
            wrapper.style.transition = 'none';
            currentIndex = cards.length / 2 - 1;
            updatePosition(false);
            setTimeout(() => {
                wrapper.style.transition = `transform ${transitionSpeed}s ease-in-out`;
                updatePosition(true);
            }, 20);
        } else {
            updatePosition(true);
        }
    }

    
    function startAutoScroll() {
        clearInterval(interval);
        interval = setInterval(scrollNext, delay);
    }

    function pauseScroll() {
        clearInterval(interval);
    }

   
    document.querySelector('.prev').addEventListener('click', () => {
        pauseScroll();
        scrollPrev();
        startAutoScroll();
    });

    document.querySelector('.next').addEventListener('click', () => {
        pauseScroll();
        scrollNext();
        startAutoScroll();
    });

    wrapper.addEventListener('mouseenter', pauseScroll);
    wrapper.addEventListener('mouseleave', startAutoScroll);

    
    window.addEventListener('resize', () => {
        const previousIndex = currentIndex;
        calculateCardWidth();
        updatePosition(false);
        currentIndex = previousIndex;
    });

   
    createClones();
    calculateCardWidth();
    updatePosition(false);
    startAutoScroll();
});
