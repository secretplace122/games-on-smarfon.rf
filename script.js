document.addEventListener("DOMContentLoaded", () => {
    // Основные элементы
    const gamesGrid = document.getElementById("gamesGrid");
    const filterButtons = document.querySelectorAll(".filter-button");
    const searchInput = document.querySelector(".search-input");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    // Вставка рекламы
    function insertAds() {
        document.querySelectorAll(".ad-block").forEach(ad => ad.remove());
        const visibleGames = Array.from(gamesGrid.querySelectorAll(".game-item:not(.hidden)"));
        
        for (let i = 10; i < visibleGames.length; i += 10) {
            const ad = document.createElement("div");
            ad.className = "ad-block";
            ad.textContent = "Реклама";
            visibleGames[i - 1].after(ad);
        }
    }

    // Фильтрация игр
    function filterGames(filter) {
        const allCards = gamesGrid.querySelectorAll(".game-item");
        const filterLower = filter.toLowerCase();
        document.getElementById('noResults')?.remove();

        allCards.forEach(card => {
            const badgeEl = card.querySelector(".game-badge");
            const matchesFilter = 
                filterLower === "all" || 
                (filterLower === "popular" && badgeEl?.classList.contains("popular")) ||
                (filterLower === "new" && badgeEl?.classList.contains("new")) ||
                (filterLower === "top100" && badgeEl?.classList.contains("top100"));
            
            card.classList.toggle("hidden", !matchesFilter);
        });

        insertAds();
    }

    // Поиск игр
    function searchGames(query) {
        const q = query.trim().toLowerCase();
        const allCards = gamesGrid.querySelectorAll(".game-item");
        document.getElementById('noResults')?.remove();

        if (!q) {
            filterGames("all");
            return;
        }

        let hasVisibleCards = false;
        allCards.forEach(card => {
            const isMatch = card.dataset.title.toLowerCase().includes(q);
            card.classList.toggle("hidden", !isMatch);
            if (isMatch) hasVisibleCards = true;
        });

        if (!hasVisibleCards) {
            const message = document.createElement('div');
            message.id = 'noResults';
            message.textContent = 'Игры не найдены. Попробуйте другой запрос.';
            gamesGrid.appendChild(message);
        }

        insertAds();
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
        filterButtons.forEach(btn => btn.classList.remove("active"));
        
        if (!query) {
            filterButtons.forEach(btn => {
                if (btn.dataset.filter === "all") btn.classList.add("active");
            });
            filterGames("all");
        } else {
            searchGames(query);
        }
    });

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Инициализация
    filterGames("all");
});