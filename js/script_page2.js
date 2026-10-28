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
    const currentQItem = questions_blok.lastElementChild;
    if (answer.correct)
    {
        ans.style.border = "0.2vw solid #94AB96";
        ans.style.backgroundColor = '#C8E6C9';
        right_answers++;
        ans.style.transform = 'scale(1.05)';

        const img = document.createElement("img");
        img.className = 'type_answer';
        img.src = '../images/correct.webp';
        img.style.width = '4%';
        currentQItem.appendChild(img);

        const explain = document.createElement('div')
        explain.className = "explain_text";
        explain.textContent = answer.explain;
        ans.appendChild(explain);

        let wrongAnswers = Array.from(allAnswers).filter(otherAns => otherAns !== ans);
        
        setTimeout(() => {
            wrongAnswers.forEach((otherAns, index) => {
                setTimeout(() => {
                    otherAns.classList.add('slide-down');
                }, index * 400); 
            });

            setTimeout(() => {
                ans.classList.add('fade-out');
            }, 5000);
        }, 1000);
    }
    else
    {
        ans.style.border = "0.2vw solid #CAA4AA";
        ans.style.backgroundColor = '#FFCDD2';
        const img = document.createElement("img");
        img.className = 'type_answer';
        img.src = '../images/error.webp';
        img.style.width = '4%';
        currentQItem.appendChild(img);

        setTimeout(() => {
            allAnswers.forEach((otherAns, index) => {
                setTimeout(() => {
                    otherAns.classList.add('slide-down');
                }, index * 400); 
            });
        }, 1500);
    }
}

function addQuestion(step){
    answers_block.innerHTML = "";
    answers_block.dataset.answered = "false";
    if (step < randomOrder.length)
    {
        const realIndex = randomOrder[step];
        const question = questions[realIndex];

        const qItem = document.createElement("div");
        qItem.className = "question_item";

        const qText = document.createElement("div");
        qText.className = "question_text";
        qText.textContent = (step + 1) + ') ' + question.text;

        qItem.appendChild(qText);
        questions_blok.appendChild(qItem);

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
                if (answers_block.dataset.answered === "true") return;
                answers_block.dataset.answered = "true";
                
                radio.checked = true;

                checkAnswer(a, ans, radio);

                setTimeout(() => {
                    current_question ++;
                    addQuestion(current_question);    
                }, 6000);
            })

            answers_block.appendChild(ans);
            
            ind_ans++;
        })
        questions_blok.scrollLeft = questions_blok.scrollWidth;
    }
    else
    {
        const end = document.createElement('p');
        end.className = 'rect';
        end.textContent = "Вопросы закончились";

        const statistika = document.createElement('p');
        statistika.className = 'rect';
        statistika.textContent = "Правильных ответов: " + right_answers;
        
        info.appendChild(end);
        info.appendChild(statistika);

        questions_blok.style.width = '100%';

        endTest();
    }
}

function endTest() {
    const allQuestions = document.querySelectorAll('.question_item');

    allQuestions.forEach(qItem => {
        qItem.addEventListener('click', function() {
            answers_block.innerHTML = "";

            const qTextContent = qItem.querySelector('.question_text').textContent;
            const cleanText = qTextContent.substring(qTextContent.indexOf(')') + 2); 

            const foundQuestion = questions.find(q => q.text === cleanText);

            if (foundQuestion) {
                const correctAns = foundQuestion.answers.find(a => a.correct);
                
                if (correctAns) {
                    const ansBlock = document.createElement('div');
                    ansBlock.className = "answer_item";

                    const ansText = document.createElement('p');
                    ansText.className = 'answers_text';
                    ansText.textContent = correctAns.text;

                    ansBlock.appendChild(ansText);
                    answers_block.appendChild(ansBlock);

                }
            }
        });
    });
}

addQuestion(current_question);
