// Мобильное меню
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    if (nav.classList.contains('active')) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Фильтрация игр (заглушка для будущей реализации)
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Здесь будет логика фильтрации
        console.log(`Фильтр: ${button.textContent}`);
    });
});

// Добавьте этот код в конец файла script.js
document.querySelectorAll('.game-card').forEach(card => {
    // Отключаем всплытие событий от бейджа
    const badge = card.querySelector('.game-badge');
    if (badge) {
        badge.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
        });
    }
    
    // Правильное поведение при наведении на карточку
    card.addEventListener('mouseenter', () => {
        const imgContainer = card.querySelector('.game-image-container');
        if (imgContainer) {
            imgContainer.classList.add('hover');
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const imgContainer = card.querySelector('.game-image-container');
        if (imgContainer) {
            imgContainer.classList.remove('hover');
        }
    });
});