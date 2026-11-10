const split_btn = document.getElementById('split_btn')
const input_frase = document.getElementById('input_frase')
const zone3 = document.getElementById('zone3')
const zone2 = document.getElementById('zone2')
const result_words = document.getElementById('result_words')

let draggedBlock = null;

function split_words(text){
    const wordsArray = text.split('-').map(word => word.trim()).filter(word => word !== '');
    
    const lowerWords = [];
    const upperWords = [];
    const numberWords = [];

    wordsArray.forEach(word => {
        firstChar = word[0]
        if (/^[a-zа-яё]/.test(firstChar)) {lowerWords.push(word)}
        else if (/^[A-ZА-ЯЁ]/.test(firstChar)) {upperWords.push(word)}
        else if (/^\d/.test(firstChar)) {numberWords.push(word)}
    });

    lowerWords.sort();
    upperWords.sort();
    numberWords.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const dict_words = {}
    let cnt_a = 1;
    lowerWords.forEach(word => {
        dict_words[`a${cnt_a}`] = word;
        cnt_a++;
    })

    let cnt_b = 1;
    upperWords.forEach(word => {
        dict_words[`b${cnt_b}`] = word;
        cnt_b++;
    })

    let cnt_n = 1;
    numberWords.forEach(word => {
        dict_words[`n${cnt_n}`] = word;
        cnt_n++;
    })

    return dict_words;
}

function generate_color(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

split_btn.addEventListener('click', function() {
    zone3.innerHTML = '';
    zone2.innerHTML = '';
    const text = input_frase.value;
    if (text === '')
    {
        result_words.style.display = 'none'
    }
    else
    {
        result_words.style.display = 'block';
        result_words.style.width = '80%';
        result_words.style.height = '20%';
        result_words.style.border = '0.2em solid red'
    }
    const words_dict = split_words(text);
    
    Object.entries(words_dict).forEach(([key, word]) => {
        const block = document.createElement("div");
        block.className = "block_item";
        block.textContent = key + ' ' + word;
        block.draggable = true;

        block.addEventListener('dragstart', (e) => {
            draggedBlock = block;
        })

        block.addEventListener('dragend', () => {
            draggedBlock = null;  
        });

        block.addEventListener('click', () => {
            const parent = block.parentElement;
            if (parent.id === 'zone2')
            {
                const text = block.textContent.split(' ').map(word => word.trim()).filter(word => word !== '');
                const span = document.createElement('span');
                 span.textContent = word + ' '; 
                span.style.color = block.style.backgroundColor;

                result_words.appendChild(span);
            }
        })
        zone3.appendChild(block);
    });
})


zone2.addEventListener('dragover', (e) => {
    e.preventDefault();          
});


zone2.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedBlock) {

        const isFromZone3 = zone3.contains(draggedBlock);
        
        if (isFromZone3) {
            draggedBlock.style.backgroundColor = generate_color();
        }
        const zoneRect = zone2.getBoundingClientRect();
       
        // Координаты клика
        let dropX = e.clientX - zoneRect.left;
        let dropY = e.clientY - zoneRect.top;
        
        // Размеры самого блока
        const blockW = draggedBlock.offsetWidth;
        const blockH = draggedBlock.offsetHeight;

        // Проверка на правый край
        if (dropX + blockW > zoneRect.width) {
            dropX = zoneRect.width - blockW;
        }
        // Проверка на нижний край
        if (dropY + blockH > zoneRect.height) {
            dropY = zoneRect.height - blockH;
        }
        // На всякий случай проверяем левый и верхний 
        if (dropX < 0) dropX = 0;
        if (dropY < 0) dropY = 0;
        
        // Установка положения блока
        draggedBlock.style.left = dropX + 'px';
        draggedBlock.style.top = dropY + 'px';
        
        zone2.appendChild(draggedBlock); 
        draggedBlock = null;
    }
});

