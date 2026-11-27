//Правила игры
const RULES = {
    1: {
        name: 'Уровень 1',
        text: 'Стандартный уровень на карточках цвета',
        sublevels: {
            1: {
                sub_l_name: 'По смыслу',
                rule: 'Разложи карточку по слову на ней: КРАСНЫЙ — в красный ящик'
            },
            2: {
                sub_l_name: 'По цвету букв',
                rule: 'Смотри на цвет шрифта, а не на слово: КРАСНЫЙ синими буквами — в синий ящик'
            },
            3: {
                sub_l_name: 'По цвету фона',
                rule: 'Смотри на фон карточки: слово и цвет букв — помехи'
            }
        }
    },
    2: {
        name: 'Уровень 2',
        text: 'На карточках существительные - ассоциации к цвету',
        sublevels: {
            1: {
                sub_l_name: 'По смыслу',
                rule: 'Вспомни цвет предмета: ПОМИДОР — в красный ящик, ТРАВА — в зелёный'
            },
            2: {
                sub_l_name: 'По цвету букв',
                rule: 'Смысл слова — помеха: раскладывай по цвету шрифта, не читая слово'
            },
            3: {
                sub_l_name: 'По цвету фона',
                rule: 'Смотри только на фон карточки: слово и цвет букв игнорируй'
            }
        }
    },
    3: {
        name: 'Уровень 3',
        text: 'На карточках аннаграммы существительных ассоциаций к цвету',
        sublevels: {
            1: {
                sub_l_name: 'По смыслу',
                rule: 'Прочитай анаграмму и вспомни цвет: МИДОРПО → ПОМИДОР — в красный ящик'
            },
            2: {
                sub_l_name: 'По цвету букв',
                rule: 'Слово расшифровывать не нужно: смотри только на цвет шрифта'
            },
            3: {
                sub_l_name: 'По цвету фона',
                rule: 'Слово расшифровывать не нужно: смотри только на фон карточки'
            }
        }
    }
};

//Значения для ящиков
const COLORS = ['red', 'blue', 'green', 'yellow'];

const COLOR_NAMES = {
    red: 'Красный',
    blue: 'Синий',
    green: 'Зелёный', 
    yellow: 'Жёлтый'
};

const SOFT_COLORS = {
    red: 'rgba(217, 83, 79, 0.5)',
    blue: 'rgba(93, 173, 226, 0.5)',
    green: 'rgba(79, 157, 105, 0.5)',
    yellow: 'rgba(241, 196, 15, 0.5)'
};


// возможные комбинации для карточки
// Слова на карточках — берутся из палитры
const WORDS = {
    red: 'КРАСНЫЙ',
    blue: 'СИНИЙ',
    green: 'ЗЕЛЁНЫЙ',
    yellow: 'ЖЁЛТЫЙ'
};

CARDS = [];
for (const wordColor of COLORS) {
    for (const font of COLORS) {
        for (const bg of COLORS) {
            if (wordColor === font && font === bg)  continue;
            if (font === bg) continue;
            CARDS.push({ word: WORDS[wordColor], wordColor: wordColor, font: font, bg: bg });
        }
    }
}

// ===== Уровень 2: слова-ассоциации по цветам =====

const WORDS_ASSOC = {
    red:    ['томат', 'клубника', 'огонь', 'сердце'],
    green:  ['трава', 'лягушка', 'лист', 'огурец'],
    yellow: ['лимон', 'солнце', 'банан', 'курица'],
    blue:   ['небо', 'море', 'лёд', 'василёк'],
};

const CARDS_ASSOC = [];
for (const assocColor of COLORS) {
    for (const word of WORDS_ASSOC[assocColor]) {
        let font;
        do {
            font = COLORS[Math.floor(Math.random() * COLORS.length)];
        } while (font === assocColor);

        let bg;
        do {
            bg = COLORS[Math.floor(Math.random() * COLORS.length)];
        } while (bg === font);

        CARDS_ASSOC.push({ word: word, assoc: assocColor, font: font, bg: bg });
    }
}
