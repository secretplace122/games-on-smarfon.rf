document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");
    const filterButtons = document.querySelectorAll(".filter-button");
    const gamesGrid = document.getElementById("gamesGrid");
    const searchInput = document.querySelector(".search-input");

    // Мобильное меню
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Вставка рекламных блоков после каждых 10 игр
    function insertAds() {
        // Удалим старые блоки рекламы
        const oldAds = document.querySelectorAll('.ad-block');
        oldAds.forEach(ad => ad.remove());

        const cards = [...gamesGrid.querySelectorAll(".game-card")];
        cards.forEach((card, index) => {
            if ((index + 1) % 10 === 0 && index !== cards.length - 1) {
                const ad = document.createElement('div');
                ad.classList.add('ad-block');
                ad.textContent = 'Реклама';
                // Можно добавить iframe или другой рекламный скрипт внутрь ad
                gamesGrid.insertBefore(ad, cards[index + 1]);
            }
        });
    }

    insertAds();

    // Фильтрация игр по выбранному фильтру и поиску
    filterButtons.forEach(button => {
        button.addEventListener("click", e => {
            e.preventDefault();

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            filterGames(button.dataset.filter, searchInput.value.trim());
        });
    });

    searchInput.addEventListener("input", () => {
        const activeButton = document.querySelector(".filter-button.active");
        const filter = activeButton ? activeButton.dataset.filter : "all";
        filterGames(filter, searchInput.value.trim());
    });

    function filterGames(filter, searchTerm) {
        const cards = [...gamesGrid.querySelectorAll(".game-card")];
        const searchLower = searchTerm.toLowerCase();

        cards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const badge = card.querySelector(".game-badge");
            const badgeText = badge ? badge.textContent.toLowerCase() : "";
            const ratingElem = card.querySelector(".game-rating");
            const rating = ratingElem ? parseFloat(ratingElem.textContent) : 0;

            // Поиск по названию
            const matchesSearch = title.includes(searchLower);

            // Фильтр по типу
            let matchesFilter = false;

            switch (filter) {
                case "all":
                    matchesFilter = true;
                    break;
                case "popular":
                    matchesFilter = badgeText.includes("хит");
                    break;
                case "new":
                    matchesFilter = badgeText.includes("новинка");
                    break;
                case "top":
                    matchesFilter = rating >= 4.7;
                    break;
                case "no-badge":
                    matchesFilter = !badge;
                    break;
                default:
                    matchesFilter = true;
            }

            card.style.display = matchesFilter && matchesSearch ? "" : "none";
        });

        insertAds(); // обновляем рекламу после фильтрации
    }
});
