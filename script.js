document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");
    const filterButtons = document.querySelectorAll(".filter-button");
    const gamesGrid = document.getElementById("gamesGrid");
    const searchInput = document.querySelector(".search-input");

    // Открытие/закрытие мобильного меню
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Фильтрация игр по категориям
    filterButtons.forEach(button => {
        button.addEventListener("click", e => {
            e.preventDefault();

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const category = button.dataset.category;

            filterGames(category, searchInput.value.trim());
        });
    });

    // Поиск по названию
    searchInput.addEventListener("input", () => {
        const activeButton = document.querySelector(".filter-button.active");
        const category = activeButton ? activeButton.dataset.category : "all";
        filterGames(category, searchInput.value.trim());
    });

    function filterGames(category, searchTerm) {
        const cards = gamesGrid.querySelectorAll(".game-card");
        cards.forEach(card => {
            const cardCategory = card.dataset.category.toLowerCase();
            const cardTitle = card.dataset.title.toLowerCase();
            const searchLower = searchTerm.toLowerCase();

            const categoryMatch = (category === "all") || (cardCategory === category.toLowerCase());
            const searchMatch = cardTitle.includes(searchLower);

            if (categoryMatch && searchMatch) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }
});
