// Мобильное меню
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
});

// Фильтр по жанрам
const genreButtons = document.querySelectorAll('.genre-tabs button');
genreButtons.forEach(button => {
    button.addEventListener('click', () => {
        genreButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});