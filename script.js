document.addEventListener("DOMContentLoaded", () => {
    // Элементы
    const gamesGrid = document.getElementById("gamesGrid");
    const filterButtons = document.querySelectorAll(".filter-button");
    const searchInput = document.querySelector(".search-input");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    // Мобильное меню
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
    });

    // Фильтрация игр
    function filterGames(filter) {
        const allCards = gamesGrid.querySelectorAll(".game-item");
        const filterLower = filter.toLowerCase();
        
        allCards.forEach(card => {
            const badgeEl = card.querySelector(".game-badge");
            const matchesFilter = 
                filterLower === "all" || 
                (filterLower === "popular" && badgeEl?.classList.contains("popular")) ||
                (filterLower === "new" && badgeEl?.classList.contains("new")) ||
                (filterLower === "top100" && badgeEl?.classList.contains("top100"));
            
            card.style.display = matchesFilter ? "block" : "none";
        });
    }

    // Поиск игр
    function searchGames(query) {
        const q = query.trim().toLowerCase();
        
        if (!q) {
            filterGames("all");
            return;
        }

        const allCards = gamesGrid.querySelectorAll(".game-item");
        let hasResults = false;
        
        allCards.forEach(card => {
            const isMatch = card.dataset.title.toLowerCase().includes(q);
            card.style.display = isMatch ? "block" : "none";
            if (isMatch) hasResults = true;
        });
    }

    // Обработчики
    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            filterGames(button.dataset.filter);
            nav.classList.remove("active");
        });
    });

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value;
        filterButtons.forEach(btn => btn.classList.remove("active"));
        
        if (!query) {
            document.querySelector('.filter-button[data-filter="all"]').classList.add("active");
            filterGames("all");
        } else {
            searchGames(query);
        }
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