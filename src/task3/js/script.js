const images = document.querySelectorAll('.slider img');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const counter = document.getElementById('counter');

let currentIndex = 0;

function updateSlider() {
    images.forEach((img, index) => {
        img.classList.toggle('active', index === currentIndex);
    });
    counter.textContent = `Изображение ${currentIndex + 1} из ${images.length}`;
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
});

updateSlider();