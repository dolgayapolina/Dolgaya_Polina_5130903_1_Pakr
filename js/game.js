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

const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'auth.html';
}

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
    boxes.addEventListener('click', function (e) {
        e.stopPropagation();
    });
}

function startGame() {
const levels = document.getElementsByClassName("level")
    for (const level of levels) {
        level.addEventListener('click', () => {
            for (const level_v of levels) {level_v.innerHTML = '';}; 

            const game_block = document.createElement('div');
            game_block.id = 'game_block';

            game_block.addEventListener('click', function (e) {
                e.stopPropagation();
            });

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
                sublevel_name.textContent = sub.sub_l_name;

                const sublevel_rule = document.createElement('p');
                sublevel_rule.textContent = sub.rule;

                const sublevel_static = document.createElement('p');
                sublevel_static.textContent = "Потом добавится статистика";

                sublevel_item.appendChild(sublevel_name);
                sublevel_item.appendChild(sublevel_rule);
                sublevel_item.appendChild(sublevel_static);

                sublevels.appendChild(sublevel_item);

                sublevel_item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    setTimeout(() => startLevel(level.dataset.level, subNum)); // стрелка, а не прямой вызов
                });
            };
            game_block.appendChild(status_bar);
            game_block.appendChild(sublevels);
            level.append(game_block);
        });
    }
}


function shuffleLetters(word) {
    if (word.length < 2) return word; // одну букву перемешивать нечего

    let result = word;
    while (result === word) {
        const letters = [...word];
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        result = letters.join('');
    }
    return result;
}


function checkAnswers() {
    const field = document.getElementById('field');
    const result = document.getElementById('result');

    let right = 0;
    let wrong = 0;

    // снимаем подсветки прошлой проверки
    for (const c of document.querySelectorAll('.card')) {
        c.classList.remove('card_right', 'card_wrong');
    }

    const boxList = document.querySelectorAll('#boxes .box');

    for (const box of boxList) {
        const cardsInBox = box.querySelectorAll('.card');

        for (const card of cardsInBox) {
            if (card.dataset.answer === box.dataset.color) {
                right++;
                card.classList.add('card_right');
            } else {
                wrong++;
                card.classList.add('card_wrong');
            }
        }
    }

    const left = field.querySelectorAll('.card').length;

    result.innerHTML =
        '<p class="result_text">' +
        '<span class="res_ok">Верно: ' + right + '</span> | ' +
        '<span class="res_err">Ошибок: ' + wrong + '</span> | ' +
        '<span class="res_left">Не разложено: ' + left + '</span>' +
        '</p>';
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

    field.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    const boxes = document.createElement('div');
    boxes.id = 'boxes';

    game_block.appendChild(field);
    game_block.appendChild(boxes);
    let shuffled;
    if (levelNum === '1')
    {
        shuffled = [...CARDS].sort(() => Math.random() - 0.5);
    }
    else if (levelNum === '2' || levelNum === '3')
    {
        shuffled = [...CARDS_ASSOC].sort(() => Math.random() - 0.5);
    }

    const selected = shuffled.slice(0, 12);
    for (let i = 0; i < selected.length; i++) {
        const item = selected[i];
        const card = document.createElement('div');
        card.className = 'card';
        if (levelNum === '1' || levelNum === '2')
        {
            card.textContent = item.word;
        } 
        else if(levelNum === '3')
        {
            card.textContent = shuffleLetters(item.word);
        } 
        let answer;
        if (subNum === '1') {
            answer = (levelNum === '1') ? item.wordColor : item.assoc;
        } else if (subNum === '2') {
            answer = item.font;
        } else {
            answer = item.bg;
        }
        card.dataset.answer = answer;
        card.style.color = 'var(--' + item.font + ')';
        card.style.backgroundColor = 'var(--' + item.bg + ')';

        card.draggable = true;
        card.addEventListener('dragstart', function () {
            draggedCard = card;
            card.classList.remove('card_right', 'card_wrong');
            card.classList.add('dragging');
        });
        
        card.addEventListener('dragend', function () {
            draggedCard = null;
            card.classList.remove('dragging');
        });
        
        card.addEventListener('click', function (e) {
            e.stopPropagation(); // клик по карточке не всплывает до уровня
            card.classList.remove('card_right', 'card_wrong');
            if (card.parentElement !== field) {
                field.appendChild(card);
            }
        });
        field.appendChild(card);

    }
    renderBoxes();
    const controls = document.createElement('div');
    controls.id = 'controls';
    controls.addEventListener('click', function (e) {
        e.stopPropagation(); // клик по кнопке не будит уровень
    });

    const check_btn = document.createElement('button');
    check_btn.id = 'check_btn';
    check_btn.className = 'button';
    check_btn.textContent = 'Проверить';
    check_btn.addEventListener('click', checkAnswers);

    controls.appendChild(check_btn);

    const result = document.createElement('div');
    result.id = 'result';

    game_block.appendChild(controls);
    game_block.appendChild(result);
}


startGame();