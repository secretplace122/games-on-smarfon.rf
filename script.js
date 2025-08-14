document.addEventListener("DOMContentLoaded", () => {
    // Основные элементы
    const gamesGrid = document.getElementById("gamesGrid");
    const filterButtons = document.querySelectorAll(".filter-button");
    const searchInput = document.querySelector(".search-input");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    // Фильтрация игр
    function filterGames(filter) {
        const allCards = gamesGrid.querySelectorAll(".game-card");
        const filterLower = filter.toLowerCase();
        
        allCards.forEach(card => {
            const category = card.dataset.category || '';
            const matchesFilter = 
                filterLower === "all" || 
                (filterLower === "popular" && category.includes("popular")) ||
                (filterLower === "new" && category.includes("new")) ||
                (filterLower === "top100" && category.includes("top100"));
            
            card.classList.toggle("hidden", !matchesFilter);
        });
    }

    // Поиск игр
function searchGames(query) {
    const q = query.trim().toLowerCase();
    const allCards = gamesGrid.querySelectorAll(".game-card");
    
    if (!q) {
        // При очистке поиска показываем все карточки и применяем активный фильтр
        allCards.forEach(card => {
            card.classList.remove("search-hidden");
        });
        document.getElementById('noResults')?.remove();
        
        // Применяем текущий активный фильтр
        const activeFilter = document.querySelector('.filter-button.active')?.dataset.filter || 'all';
        filterGames(activeFilter);
        return;
    }

    let hasResults = false;
    allCards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        const isMatch = title.includes(q);
        
        if (isMatch) {
            card.classList.remove("search-hidden");
            card.classList.remove("hidden");
            hasResults = true;
        } else {
            card.classList.add("search-hidden");
        }
    });

    // Уведомление, если нет результатов
    document.getElementById('noResults')?.remove();
    if (!hasResults) {
        const message = document.createElement('div');
        message.id = 'noResults';
        message.textContent = 'Игры не найдены. Попробуйте другой запрос.';
        message.style.textAlign = 'center';
        message.style.padding = '20px';
        message.style.color = 'var(--text-light)';
        gamesGrid.appendChild(message);
    }
}

    // Обработчики событий
    filterButtons.forEach(button => {
        button.addEventListener("click", e => {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            searchInput.value = "";
            filterGames(button.dataset.filter);
            nav.classList.remove("active");
        });
    });

    searchInput.addEventListener("input", e => {
    const query = e.target.value;
    searchGames(query);
    
    // Снимаем активность с фильтров при поиске
    if (query) {
        filterButtons.forEach(btn => btn.classList.remove("active"));
    } else {
        // Возвращаем активность фильтру "Все" при очистке поиска
        document.querySelector('.filter-button[data-filter="all"]').classList.add("active");
    }
});

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
    });

    // Закрытие меню при клике вне его
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".nav") && !e.target.closest(".menu-toggle")) {
            nav.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // Инициализация
    filterGames("all");
});