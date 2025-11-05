const carousel = document.querySelector('.carousel');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentIndex = 0;

function updateCarousel() {
    const cardWidth = 820; 
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

prevButton.addEventListener('click', () => {
    const totalCards = document.querySelectorAll('.carousel .card').length;
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalCards - 1;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    const totalCards = document.querySelectorAll('.carousel .card').length;
    currentIndex = (currentIndex < totalCards - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

