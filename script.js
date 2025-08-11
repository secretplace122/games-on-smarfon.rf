// Мобильное меню
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Поиск игр
const searchInput = document.querySelector('.search-input');
const gameCards = document.querySelectorAll('.game-card');

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    gameCards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        card.style.display = title.includes(searchText) ? 'block' : 'none';
    });
});

// Фильтрация по жанрам
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        const category = button.dataset.category;
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        gameCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
