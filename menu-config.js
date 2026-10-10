// ============================================
// ☕ КОНФИГ КОФЕЙНОГО МЕНЮ — РЕДАКТИРУЙТЕ ТОЛЬКО ЗДЕСЬ!
// ============================================
// Как редактировать:
// - Изменить название/цену: правьте текст в кавычках
// - Добавить позицию: скопируйте блок { ... } и вставьте ниже
// - Удалить позицию: удалите блок { ... } целиком
// ============================================

const MENU_CONFIG = {
  title: "Kaffeekarte",
  buttonText: "Kaffeebohnen kaufen",
  
  // ============================================
  // 🎨 НАСТРОЙКА КНОПКИ ОТКРЫТИЯ МЕНЮ
  // ============================================
  triggerButton: {
    useImage: false, // ← поставь true, если хочешь использовать картинку вместо текста
    imageSrc: "menu-logo.png", // ← путь к картинке (положи файл в корень проекта)
    text: "Menü" // ← текст, если useImage = false
  },
  
  items: [
    {
      name: "Espresso",
      description: "Kräftig und intensiv",
      price: "2,50 €"
    },
    {
      name: "Doppelter Espresso",
      description: "Doppelte Portion, voller Geschmack",
      price: "3,20 €"
    },
    {
      name: "Americano",
      description: "Espresso mit heißem Wasser",
      price: "2,80 €"
    },
    {
      name: "Cappuccino",
      description: "Zarter Milchschaum auf Espresso",
      price: "3,20 €"
    },
    {
      name: "Latte Macchiato",
      description: "Mild und aromatisch, in Schichten",
      price: "3,50 €"
    },
    {
      name: "Flat White",
      description: "Espresso mit samtiger Milch",
      price: "3,80 €"
    },
    {
      name: "Espresso Macchiato",
      description: "Espresso mit einem Tropfen Milch",
      price: "2,80 €"
    },
    {
      name: "Mokka",
      description: "Kaffee mit feiner Schokolade",
      price: "4,00 €"
    },
    {
      name: "Raf-Kaffee",
      description: "Espresso mit Sahne und Vanille",
      price: "3,90 €"
    },
    {
      name: "Karamell Latte",
      description: "Latte mit Karamellsirup",
      price: "4,20 €"
    },
    {
      name: "Eiskaffee",
      description: "Kalter Kaffee mit Vanilleeis",
      price: "4,50 €"
    }
  ]
};
