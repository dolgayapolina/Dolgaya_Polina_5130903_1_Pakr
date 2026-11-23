// Словарь из 20 видов карточек: слово + цвет шрифта + цвет фона
const CARDS = [
    { word: 'КРАСНЫЙ',  font: 'red',   bg: 'blue'  },
    { word: 'КРАСНЫЙ',  font: 'red',   bg: 'green' },
    { word: 'КРАСНЫЙ',  font: 'red',   bg: 'cream' },
    { word: 'КРАСНЫЙ',  font: 'blue',  bg: 'cream' },
    { word: 'КРАСНЫЙ',  font: 'green', bg: 'blue'  },
    { word: 'СИНИЙ',    font: 'blue',  bg: 'red'   },
    { word: 'СИНИЙ',    font: 'blue',  bg: 'green' },
    { word: 'СИНИЙ',    font: 'blue',  bg: 'cream' },
    { word: 'СИНИЙ',    font: 'red',   bg: 'green' },
    { word: 'СИНИЙ',    font: 'green', bg: 'red'   },
    { word: 'ЗЕЛЁНЫЙ',  font: 'green', bg: 'red'   },
    { word: 'ЗЕЛЁНЫЙ',  font: 'green', bg: 'blue'  },
    { word: 'ЗЕЛЁНЫЙ',  font: 'green', bg: 'cream' },
    { word: 'ЗЕЛЁНЫЙ',  font: 'red',   bg: 'blue'  },
    { word: 'ЗЕЛЁНЫЙ',  font: 'blue',  bg: 'cream' },
    { word: 'КРАСНЫЙ',  font: 'blue',  bg: 'red'   },
    { word: 'СИНИЙ',    font: 'red',   bg: 'cream' },
    { word: 'СИНИЙ',    font: 'green', bg: 'cream' },
    { word: 'ЗЕЛЁНЫЙ',  font: 'red',   bg: 'cream' },
    { word: 'ЗЕЛЁНЫЙ',  font: 'blue',  bg: 'red'   }
];

const COLORS = ['red', 'blue', 'green'];

// Названия цветов для ящиков и карточек
const COLOR_NAMES = {
    red: 'Красный',
    blue: 'Синий',
    green: 'Зелёный'
};

// «Мягкие» версии для ящиков — полупрозрачные, чтобы карточки на их фоне читались
const SOFT_COLORS = {
    red: 'rgba(217, 83, 79, 0.5)',
    blue: 'rgba(93, 173, 226, 0.5)',
    green: 'rgba(79, 157, 105, 0.5)'
};