document.addEventListener("DOMContentLoaded", () => {
    const gamesGrid = document.getElementById("gamesGrid");
    const filterButtons = document.querySelectorAll(".filter-button");
    const searchInput = document.querySelector(".search-input");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    // Функция для вставки рекламных блоков
    function insertAds() {
        const oldAds = document.querySelectorAll(".ad-block");
        oldAds.forEach(ad => ad.remove());

        const visibleGames = Array.from(gamesGrid.querySelectorAll(".game-card:not(.hidden)"));

        for (let i = 10; i < visibleGames.length; i += 10) {
            const ad = document.createElement("div");
            ad.className = "ad-block";
            ad.textContent = "Реклама";
            visibleGames[i - 1].after(ad);
        }
    }

    // Функция фильтрации игр
    function filterGames(filter) {
        const allCards = gamesGrid.querySelectorAll(".game-card");
        const filterLower = filter.toLowerCase();
        const noResults = document.getElementById('noResults');

        if (noResults) noResults.remove();

        allCards.forEach(card => {
            const badgeEl = card.querySelector(".game-badge");
            const hasClassNew = badgeEl && badgeEl.classList.contains("new");
            const hasClassPopular = badgeEl && badgeEl.classList.contains("popular");
            const hasClassTop100 = badgeEl && badgeEl.classList.contains("top100");

            let matchesFilter = false;

            if (filterLower === "all") {
                matchesFilter = true;
            } else if (filterLower === "popular") {
                matchesFilter = hasClassPopular;
            } else if (filterLower === "new") {
                matchesFilter = hasClassNew;
            } else if (filterLower === "top100") {
                matchesFilter = hasClassTop100;
            }

            card.classList.toggle("hidden", !matchesFilter);
        });

        insertAds();
    }

    // Функция поиска игр
    function searchGames(query) {
        const q = query.trim().toLowerCase();
        const allCards = gamesGrid.querySelectorAll(".game-card");
        const noResults = document.getElementById('noResults');

        if (noResults) noResults.remove();

        if (q.length === 0) {
            filterGames("all");
            return;
        }

        let hasVisibleCards = false;

        allCards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            if (title.includes(q)) {
                card.classList.remove("hidden");
                hasVisibleCards = true;
            } else {
                card.classList.add("hidden");
            }
        });

        if (!hasVisibleCards) {
            const message = document.createElement('div');
            message.id = 'noResults';
            message.textContent = 'Игры не найдены. Попробуйте другой запрос.';
            gamesGrid.appendChild(message);
        }

        insertAds();
    }

    // Обработчики для фильтров
    filterButtons.forEach(button => {
        button.addEventListener("click", e => {
            e.preventDefault();
            const filter = button.dataset.filter.toLowerCase();

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            searchInput.value = "";
            filterGames(filter);

            if (nav.classList.contains("active")) {
                nav.classList.remove("active");
            }
        });
    });

    // Обработчик поиска
    searchInput.addEventListener("input", e => {
        const query = e.target.value;

        filterButtons.forEach(btn => btn.classList.remove("active"));

        if (query.length === 0) {
            filterGames("all");
            filterButtons.forEach(btn => {
                if (btn.dataset.filter.toLowerCase() === "all") btn.classList.add("active");
            });
        } else {
            searchGames(query);
        }
    });

    // Мобильное меню
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Инициализация tooltips
    document.querySelectorAll('.info-icon').forEach(icon => {
        const tooltip = icon.querySelector('.tooltip');

        // Для десктопов
        icon.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        });

        icon.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(5px)';
        });

        // Для мобильных устройств
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = tooltip.style.opacity === '1';
            tooltip.style.opacity = isVisible ? '0' : '1';
            tooltip.style.transform = isVisible ? 'translateY(5px)' : 'translateY(0)';
        });
    });

    // Закрытие tooltips при клике вне их
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.info-icon')) {
            document.querySelectorAll('.tooltip').forEach(tooltip => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(5px)';
            });
        }
    });

    // Инициализация
    filterGames("all");
});