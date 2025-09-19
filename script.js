const circle = document.getElementById('circle');
const button = document.getElementById('toggleButton');
const catImage = document.querySelector('.cat-image');
const overlayImage = document.querySelector('.overlay-image');
let isPaused = false;

button.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
        button.textContent = 'Danger!';
        button.style.background = '#ff4444'; // Меняет цвет на красный
        overlayImage.classList.add('overlay-visible'); // Показываем вторую картинку
        setTimeout(() => {
            catImage.classList.add('hidden'); // Скрываем первую картинку
        }, 500); // Удаляем первую картинку после завершения анимации
    } else {
        button.textContent = 'Котик';
        button.style.background = ''; // Возвращает исходный цвет (зелёный)
        overlayImage.classList.remove('overlay-visible'); // Скрываем вторую картинку
        catImage.classList.remove('hidden'); // Показываем первую картинку
    }
});