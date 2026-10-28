const info = document.getElementById("info");
const questions_blok = document.getElementById("questions_blok");
const answers_block = document.getElementById("answers_block");

const end = document.getElementById("end");

let current_question = 0;


let randomOrder = [0, 1, 2, 3, 4];

for (let i = randomOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomOrder[i], randomOrder[j]] = [randomOrder[j], randomOrder[i]];
}

let right_answers = 0;
function checkAnswer(answer, ans, radio){
    const allAnswers = document.querySelectorAll('.answer_item');
    if (answer.correct)
    {
        ans.style.border = "0.2vw solid #94AB96";
        ans.style.backgroundColor = '#C8E6C9';
        right_answers++;
        ans.style.transform = 'scale(1.05)';

        const img = document.createElement("img");
        img.className = 'type_answer';
        img.src = '../images/correct.png';
        img.style.width = '4%';
        ans.appendChild(img);

        const explain = document.createElement('div')
        explain.className = "explain_text";
        explain.textContent = answer.explain;
        ans.appendChild(explain);

        let wrongAnswers = Array.from(allAnswers).filter(otherAns => otherAns !== ans);
        
        wrongAnswers.forEach((otherAns, index) => {
            setTimeout(() => {
                otherAns.classList.add('slide-down'); // Добавляем класс из CSS
            }, index * 200); // Задержка: 0мс, 200мс, 400мс...
        });

        // Правильный ответ плавно исчезает через 2 секунды
        setTimeout(() => {
            ans.classList.add('fade-out');
        }, 2000);
    }
    else
    {
        ans.style.border = "0.2vw solid #CAA4AA";
        ans.style.backgroundColor = '#FFCDD2';
        const img = document.createElement("img");
        img.className = 'type_answer';
        img.src = '../images/error.png';
        img.style.width = '4%';
        ans.appendChild(img);
    }
}

function addQuestion(step){
    answers_block.innerHTML = "";
    if (step < randomOrder.length)
    {
        const realIndex = randomOrder[step];
        const question = questions[realIndex];

        const qText = document.createElement("div");
        qText.className="question_text";
        qText.textContent = (step+1) + ') ' + question.text;

        questions_blok.appendChild(qText)

        let randomAnswers = [...question.answers]; 
        
        for (let i = randomAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomAnswers[i], randomAnswers[j]] = [randomAnswers[j], randomAnswers[i]];
        }
        let ind_ans = 1;
        randomAnswers.forEach(a => {
            const ans = document.createElement("div");
            ans.className = "answer_item";

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'answer_' + step;
            radio.disabled = true;
            radio.style.display = 'none';
            const ansText = document.createElement("span");
            ansText.className = "answers_text";
            ansText.textContent = ind_ans + ') ' + a.text;
            
            ans.appendChild(radio);
            ans.appendChild(ansText);

            ans.addEventListener('click', function() {
                radio.checked = true;

                checkAnswer(a, ans, radio);

                setTimeout(() => {
                    current_question ++;
                    addQuestion(current_question);    
                }, 1000);
            })

            answers_block.appendChild(ans);
            
            ind_ans++;
        })
        questions_blok.scrollLeft = questions_blok.scrollWidth;
    }
    else
    {
        end.textContent = "Вопросы закончились";
        const statistika = document.createElement('p');
        statistika.textContent = "Правильных ответов: " + right_answers;
        info.appendChild(statistika);
        questions_blok.style.width = '100%';
    }
}

addQuestion(current_question);
