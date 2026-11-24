const start_game = document.getElementById("start_game")
const game_block = document.getElementById('game_block');
const status_bar = document.getElementById('status_bar')
const field = document.getElementById('field')
const boxes = document.getElementById('boxes')
const controls = document.getElementById('controls')
const check_btn =document.getElementById('check_btn')

let box_cnt = 3;
let draggedCard = null; 
let level = 1;

let score_right_total = 0;
let score_error_total = 0;

function renderBoxes() {
    const boxes = document.getElementById('boxes'); 
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5);

    for (let i = 0; i < box_cnt; i++) {
        const c = shuffled[i];
        const box = document.createElement('div');
        box.className = 'box';
        box.dataset.color = c; 
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
                box.appendChild(draggedCard); 
                draggedCard = null;
            }
        });
        boxes.appendChild(box);
    }
}

function startGame() {
const levels = document.getElementsByClassName("level")
    for (const level of levels) {
        level.addEventListener('click', () => {
            for (const level_v of levels) {level_v.innerHTML = '';}; 

            const game_block = document.createElement('div');
            game_block.id = 'game_block';

            const status_bar = document.createElement('div');
            status_bar.id = 'status_bar';

            const status_item = document.createElement('div');
            status_item.className = 'status_item'
            status_item.textContent = RULES[level.dataset.level].name;

            const status_item_rule = document.createElement('div');
            status_item_rule.className = 'status_item'
            status_item_rule.textContent = RULES[level.dataset.level].text;

            status_bar.appendChild(status_item);
            status_bar.appendChild(status_item_rule); 

            const sublevels = document.createElement('div');
            sublevels.id = 'sublevels';

            const levelRules = RULES[level.dataset.level].sublevels;
            for (const [subNum, sub] of Object.entries(levelRules)) {
                const sublevel_item = document.createElement('div');
                sublevel_item.className = 'sublevel_item';

                sublevel_item.dataset.sub = subNum;   
                sublevel_item.dataset.level = level.dataset.level;

                const sublevel_name = document.createElement('p');
                sublevel_name.textContent = sub.sub_l_name;;

                const sublevel_rule = document.createElement('p');
                sublevel_rule.textContent = sub.rule;

                const sublevel_static = document.createElement('p');
                sublevel_static.textContent = "Потом добавится статистика";

                sublevel_item.appendChild(sublevel_name);
                sublevel_item.appendChild(sublevel_rule);
                sublevel_item.appendChild(sublevel_static);

                sublevels.appendChild(sublevel_item);

                sublevel_item.addEventListener('click', (e) => {
                    e.stopPropagation(); // клик не уйдёт выше, до уровня не дойдёт
                    setTimeout(startLevel(level.dataset.level, subNum));
                });
            };
            game_block.appendChild(status_bar);
            game_block.appendChild(sublevels);
            level.append(game_block);
        });
    }
}

function startLevel(levelNum, subNum) {
    const game_block = document.getElementById('game_block');
    console.log('Стартуем:', levelNum, subNum); 

    const sublevels = document.getElementById('sublevels');
    sublevels.classList.add('fading');

    sublevels.innerHTML = '';
    sublevels.classList.remove('fading');

    
    const field = document.createElement('div');
    field.id = 'field';

    const boxes = document.createElement('div');
    boxes.id = 'boxes';

    game_block.appendChild(field);
    game_block.appendChild(boxes);
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
        
        card.addEventListener('click', function () {
            if (card.parentElement !== field) {
                field.appendChild(card);
            }
        });

        field.appendChild(card);
    }
    renderBoxes();
}

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


startGame();