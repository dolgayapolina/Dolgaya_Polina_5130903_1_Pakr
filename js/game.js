const start_game = document.getElementById("start_game")
const game_block = document.getElementById('game_block');
const status_bar = document.getElementById('status_bar')
const field = document.getElementById('field')
const boxes = document.getElementById('boxes')


let draggedCard = null; // карточка, которую тащим сейчас


function renderBoxes() {
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5);

    // Берём первые три цвета из палитры
    for (let i = 0; i < 3; i++) {
        const c = shuffled[i];
        const box = document.createElement('div');
        box.className = 'box';
        box.dataset.color = c; // по нему потом сверяем ответы
        box.style.backgroundColor = SOFT_COLORS[c];

        const title = document.createElement('span');
        title.className = 'box_title';
        title.textContent = COLOR_NAMES[c];

        box.appendChild(title);
        box.addEventListener('dragover', function (e) {
            e.preventDefault();
        });
        
        box.addEventListener('drop', function (e) {
            e.preventDefault();
            if (draggedCard) {
                box.appendChild(draggedCard); // карточка переезжает в ящик
                draggedCard = null;
            }
        });
        boxes.appendChild(box);
    }
}

start_game.addEventListener('click', function () {
    status_bar.classList.remove('hidden');
    field.classList.remove('hidden');
    boxes.classList.remove('hidden');
    start_game.style.display = 'none';
    const shuffled = [...CARDS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 12);
    for (let i = 0; i < selected.length; i++) {
        const item = selected[i];
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = item.word;
        card.style.color = 'var(--' + item.font + ')';
        card.style.backgroundColor = 'var(--' + item.bg + ')';

        card.draggable = true;
        card.addEventListener('dragstart', function () {
            draggedCard = card;
            card.classList.add('dragging');
        });
        
        card.addEventListener('dragend', function () {
            draggedCard = null;
            card.classList.remove('dragging');
        });
        
        // Клик по карточке в ящике — вернуть на поле
        card.addEventListener('click', function () {
            if (card.parentElement !== field) {
                field.appendChild(card);
            }
        });

        field.appendChild(card);
    }
    renderBoxes();
});

field.addEventListener('dragover', function (e) {
    e.preventDefault();
});

field.addEventListener('drop', function (e) {
    e.preventDefault();
    if (draggedCard) {
        field.appendChild(draggedCard);
        draggedCard = null;
    }
});