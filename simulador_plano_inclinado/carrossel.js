let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carrossel-container .slide');
    const totalSlides = slides.length;

    currentSlide += direction;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    const carrosselContainer = document.querySelector('.carrossel-container');
    carrosselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}
