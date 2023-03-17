//Countdown Functions
const slowMo = () => new Promise(resolve => setTimeout(resolve, 1000))
async function countdownDivHandler() {
    countdownDiv.style.display = 'flex';
    for (let i = 2; i >= -1; i--) {
        await slowMo(1000);
        if (i === -1) {
            startQuiz()
            break;
        }
        document.getElementById('count').textContent = i;
    }
}



function startQuiz() {
    rulesSection.style.display = 'none';
    quizSection.style.display = 'block';
    countdownDiv.style.display = 'none';
}



function createQuiz(data) {
    const quizBody = document.getElementById('quizBody');

    data.forEach((datum, index) => {
        const{id, question, options} = datum;

        const article = document.createElement('article');
        article.setAttribute('id', `${id}`);
        article.innerHTML = `
            <div class="question">
                <p><span class="qNo">${index+1}</span></p>
                <p>${question}</p>
            </div>
        `;
        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');
        article.appendChild(optionsDiv);

        options.forEach(option => {
            const p = document.createElement('p');
            p.setAttribute('key', `${id}`)
            p.textContent = option;
            optionsDiv.appendChild(p);
        })

        quizBody.appendChild(article);
        optionsDiv.addEventListener('click', (e)=> handleOptionClick(e))
    })
}


//function responsible for fetching quiz data and pass them to createQuiz function
function fetchQuiz() {
    fetch('./data/quiz.json')
        .then(res => res.json())
        .then(data => {
            quizData = data;
            totalQuestions = data.length;
            createQuiz(data)
        })
        .catch(err => console.log(err))
}
fetchQuiz()



//this function handle user click on a option
function handleOptionClick(e){
    //Colorize the selected options
    e.target.parentElement.childNodes.forEach(e => e.classList.remove('optionSelected'));
    e.target.classList.add('optionSelected');

    //send selected options to the givenAnswer object
    //this will be used to check if the use selected ans is correct
    givenAnswers[e.target.getAttribute('key')] = e.target.textContent;
}