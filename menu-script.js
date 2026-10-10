// ☕ MENU LOGIC START

(function () {
  'use strict';

  // Элементы DOM
  const menuButton = document.getElementById('coffeeMenuButton');
  const bottomSheet = document.getElementById('coffeeBottomSheet');
  const overlay = document.getElementById('coffeeOverlay');
  const closeButton = document.getElementById('closeBottomSheet');
  const menuItemsContainer = document.getElementById('menuItemsContainer');
  const menuTitle = document.getElementById('menuTitle');
  const viewFullMenuButton = document.getElementById('viewFullMenuButton');

  let isOpen = false;
  let touchStartY = 0;
  let touchCurrentY = 0;
  let isDragging = false;
  let currentSection = 0; // Отслеживание текущей секции

  // Иконка кофе (Lucide coffee icon)
  const coffeeIconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
      <line x1="6" y1="2" x2="6" y2="4"></line>
      <line x1="10" y1="2" x2="10" y2="4"></line>
      <line x1="14" y1="2" x2="14" y2="4"></line>
    </svg>
  `;

  // Рендер содержимого кнопки (текст или картинка)
  function renderButtonContent() {
    if (!menuButton || !MENU_CONFIG || !MENU_CONFIG.triggerButton) return;

    const btnConfig = MENU_CONFIG.triggerButton;

    if (btnConfig.useImage) {
      // Используем картинку
      menuButton.innerHTML = `<img src="${btnConfig.imageSrc}" alt="${btnConfig.text}" />`;
      menuButton.classList.add('with-image');
    } else {
      // Используем текст
      menuButton.textContent = btnConfig.text;
      menuButton.classList.remove('with-image');
    }
  }

  // Управление видимостью кнопки в зависимости от секции
  function updateButtonVisibility(sectionIndex) {
    if (!menuButton) return;

    currentSection = sectionIndex;

    if (sectionIndex === 0) {
      // Первая секция (кофе) — показываем кнопку с задержкой,
      // чтобы дождаться завершения crossfade-анимации (700мс)
      setTimeout(() => {
        // Проверяем, что секция всё ещё первая (а то пользователь мог свайпнуть обратно)
        if (window.currentSection === 0) {
          menuButton.classList.remove('hidden');
        }
      }, 800);
    } else {
      // Другие секции — скрываем кнопку МГНОВЕННО
      menuButton.classList.add('hidden');
    }
  }
  // Включить пульсацию кнопки
  function startPulsing() {
    if (!menuButton) return;
    menuButton.classList.add('pulsing');
  }

  // Выключить пульсацию кнопки
  function stopPulsing() {
    if (!menuButton) return;
    menuButton.classList.remove('pulsing');
  }

  // Экспортируем функции в window, чтобы их мог вызывать основной скрипт
  window.startMenuPulsing = startPulsing;
  window.stopMenuPulsing = stopPulsing;
  // Инициализация меню
  function initMenu() {
    if (!MENU_CONFIG || !MENU_CONFIG.items) {
      console.error('MENU_CONFIG не найден или не содержит items');
      return;
    }

    // Устанавливаем заголовок и текст кнопки
    if (menuTitle) menuTitle.textContent = MENU_CONFIG.title;
    if (viewFullMenuButton) viewFullMenuButton.textContent = MENU_CONFIG.buttonText;

    // Рендерим содержимое кнопки
    renderButtonContent();

    // Рендерим позиции меню
    renderMenuItems();

    // Устанавливаем начальную видимость кнопки (показываем на первой секции)
    updateButtonVisibility(0);

    // Подключаемся к глобальной переменной currentSection из основного скрипта
    setupSectionObserver();
  }

  // Рендер позиций меню
  function renderMenuItems() {
    if (!menuItemsContainer) return;

    menuItemsContainer.innerHTML = '';

    MENU_CONFIG.items.forEach((item, index) => {
      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';

      menuItem.innerHTML = `
        <div class="menu-item-icon">${coffeeIconSVG}</div>
        <div class="menu-item-content">
          <div class="menu-item-name">${item.name}</div>
          <div class="menu-item-description">${item.description}</div>
        </div>
        <div class="menu-item-price">${item.price}</div>
      `;

      menuItemsContainer.appendChild(menuItem);
    });
  }

  // Наблюдение за изменением секции
  function setupSectionObserver() {
    // Проверяем каждые 100мс, изменилась ли глобальная переменная currentSection
    setInterval(() => {
      if (typeof window.currentSection !== 'undefined' && window.currentSection !== currentSection) {
        updateButtonVisibility(window.currentSection);
      }
    }, 100);
  }

  // Открытие Bottom Sheet
  function openBottomSheet() {
    if (isOpen) return;

    isOpen = true;
    overlay.classList.add('active');
    bottomSheet.classList.add('active');
    menuButton.classList.add('sheet-open');
    document.body.style.overflow = 'hidden';
  }

  // Закрытие Bottom Sheet
  function closeBottomSheet() {
    if (!isOpen) return;

    isOpen = false;
    overlay.classList.remove('active');
    bottomSheet.classList.remove('active');
    menuButton.classList.remove('sheet-open');
    document.body.style.overflow = '';
  }

  // Обработка свайпа вниз для закрытия
  function handleTouchStart(e) {
    const target = e.target;
    const sheetContent = bottomSheet.querySelector('.bottom-sheet-content');

    // Проверяем, что свайп начинается с верхней части шторки или handle
    if (sheetContent.scrollTop === 0 || target.closest('.bottom-sheet-handle')) {
      touchStartY = e.touches[0].clientY;
      isDragging = true;
    }
  }

  function handleTouchMove(e) {
    if (!isDragging) return;

    touchCurrentY = e.touches[0].clientY;
    const deltaY = touchCurrentY - touchStartY;

    // Если свайп вниз больше 100px — закрываем
    if (deltaY > 100) {
      closeBottomSheet();
      isDragging = false;
    }
  }

  function handleTouchEnd() {
    isDragging = false;
    touchStartY = 0;
    touchCurrentY = 0;
  }

  // Обработчики событий
  if (menuButton) {
    menuButton.addEventListener('click', openBottomSheet);

    // Доступность с клавиатуры
    menuButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBottomSheet();
      }
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', closeBottomSheet);
  }

  if (overlay) {
    overlay.addEventListener('click', closeBottomSheet);
  }

  // Клик по "Kaffeebohnen kaufen" обрабатывается в index.html (открывает магазин).
  // Здесь раньше был тестовый alert на русском — удалён.

  // Свайп для закрытия
  if (bottomSheet) {
    bottomSheet.addEventListener('touchstart', handleTouchStart, { passive: true });
    bottomSheet.addEventListener('touchmove', handleTouchMove, { passive: true });
    bottomSheet.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeBottomSheet();
    }
  });

  // Инициализация при загрузке
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
  } else {
    initMenu();
  }

})();

// ☕ MENU LOGIC END
