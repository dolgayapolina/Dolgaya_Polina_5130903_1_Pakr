const questions_blok = document.getElementById("questions_blok");
const answers_block = document.getElementById("answers_block")
const end = document.getElementById("end");
let current_question = 0;


let randomOrder = [0, 1, 2, 3, 4];

for (let i = randomOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomOrder[i], randomOrder[j]] = [randomOrder[j], randomOrder[i]];
}

let right_answers = 0;
function checkAnswer(answer){
    if(answer.correct){
        right_answers++;
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
            ans.className = "answers_text";
            ans.textContent = ind_ans + ') ' + a.text;
            
            ans.addEventListener('click', function() {
                ans.style.border = "0.2vw solid black";
                

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
    }
}

addQuestion(current_question);
