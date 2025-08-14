document.addEventListener("DOMContentLoaded", () => {
        // Карусель приложений
    const carouselData = [
        { title: "Among Us", icon: "images/Among-Us.png", url: "https://play.google.com/store/apps/details?id=com.innersloth.spacemafia" },
        { title: "Royal Match", icon: "images/Royal-Match.png", url: "https://play.google.com/store/apps/details?id=com.dreamgames.royalmatch" },
        { title: "Subway Surfers", icon: "images/Subway-Surfers.png", url: "https://play.google.com/store/search?q=subway+surf&c=apps" },
        { title: "Minecraft", icon: "images/Minecraft.jpg", url: "https://drive.google.com/file/d/1ojkGPb8y01AJjQRk8_obNQWL3HShrvw1/view?usp=sharing" },
        { title: "Roblox", icon: "images/Roblox.jpg", url: "https://play.google.com/store/search?q=roblox&c=apps" },
        { title: "Wild Rift", icon: "images/Wild-Rift.jpg", url: "https://play.google.com/store/apps/details?id=com.riotgames.league.wildrift" },
    ];

    const carouselTrack = document.querySelector('.carousel-track');
    
    // Заполняем карусель элементами (добавляем копии в начало и конец для бесконечности)
    carouselData.forEach(app => {
        const item = createCarouselItem(app);
        carouselTrack.appendChild(item);
    });

    // Клонируем элементы для бесконечного эффекта
    const firstItems = Array.from(carouselTrack.children).slice(0, 5);
    firstItems.forEach(item => {
        carouselTrack.appendChild(item.cloneNode(true));
    });

    // Инициализация
    let carouselSpeed = 0.5;
    let carouselPosition = 0;
    let animationId;
    let isPaused = false;
    const itemWidth = 95; // Ширина элемента карусели + gap (подберите под ваш дизайн)
    const loopPoint = carouselData.length * itemWidth;

    function createCarouselItem(app) {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <img src="${app.icon}" alt="${app.title}" class="carousel-icon" loading="lazy">
            <span class="carousel-title">${app.title}</span>
        `;
        item.addEventListener('click', () => {
            window.open(app.url, '_blank');
        });
        return item;
    }

    function animateCarousel() {
        if (!isPaused) {
            carouselPosition += carouselSpeed;
            
            // Когда доходим до точки "перемотки"
            if (carouselPosition >= loopPoint) {
                carouselPosition = 0;
                carouselTrack.style.transition = 'none';
                carouselTrack.style.transform = `translateX(${-carouselPosition}px)`;
                // Принудительный рефлоу
                void carouselTrack.offsetWidth;
            }
            
            carouselTrack.style.transition = 'transform 0.1s linear';
            carouselTrack.style.transform = `translateX(${-carouselPosition}px)`;
        }
        
        animationId = requestAnimationFrame(animateCarousel);
    }

    // Запуск анимации
    animateCarousel();

    // Пауза при наведении
    carouselTrack.addEventListener('mouseenter', () => {
        isPaused = true;
        carouselTrack.style.transition = 'transform 0.3s ease';
    });

    carouselTrack.addEventListener('mouseleave', () => {
        isPaused = false;
        carouselTrack.style.transition = 'transform 0.1s linear';
    });

    // Очистка анимации при уходе со страницы
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animateCarousel();
        }
    });

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