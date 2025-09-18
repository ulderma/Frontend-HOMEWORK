// Список цветов для переливания
const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'yellow'];

// Получаем элемент заголовка
const title = document.getElementById('title');

// Функция для смены цвета
function changeColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    title.style.color = randomColor;
}

// Запускаем функцию каждые 500 мс (0.5 секунды)
setInterval(changeColor, 500);
// Получаем картинку
const cat = document.getElementById('cat');

// Функция для вращения
function rotateCat() {
    let angle = 0;
    const interval = setInterval(() => {
        angle += 1;
        cat.style.transform = `rotate(${angle}deg)`;
    }, 20); // Обновление каждые 20 мс → гладкая анимация
}

// Запускаем вращение
rotateCat();