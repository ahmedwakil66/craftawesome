const rulesSection = document.getElementById('rulesSection');
const startQuizBtn = document.getElementById('startQuizBtn')
const countdownDiv = document.getElementById('countdownDiv')
const quizSection = document.getElementById('quizSection');
const resultSection = document.getElementById('resultSection');
const historySection = document.getElementById('historySection');
const retakeTest = document.getElementById('retakeTest');


quizSection.style.display = 'none';
resultSection.style.display = 'none';
historySection.style.display = 'none';
retakeTest.style.display = 'none';


//Start Quiz! button function
countdownDiv.style.display = 'none';
startQuizBtn.addEventListener('click', countdownDivHandler);


//submitAnsBtn button function
const submitAnsBtn = document.getElementById('submitAnsBtn');
submitAnsBtn.addEventListener('click', () => {
    let marks = 0;
    let gradeText;

    //validating given answers
    if (confirm('Are you sure to proceed?')) {
        for (key in givenAnswers) {
            const givenAnswer = givenAnswers[key];
            const datum = quizData.find(datum => datum.id == key);
            if (givenAnswer === datum.answer) { 
                marks++;
                nailedId.push(Number(key));
            }
        }

        //writing result
        const resultMarksP = document.getElementById('resultMarksP');
        resultMarksP.innerHTML = `
                You got 
                <span class="badge-1">${marks}/${totalQuestions}</span>.
                <br/>
                Success rate is
                <span class="badge-1">${((marks / totalQuestions) * 100).toFixed(2)}%</span>.
            `;

        //calculating grade
        const resultGradeP = document.getElementById('resultGradeP');
        
        if (((marks / totalQuestions) * 100) < 80) {
            retakeTest.style.display = 'block';
        }
        if (((marks / totalQuestions) * 100) >= 80) {
            gradeText = 'Excellent Job :)'
        }
        else if (((marks / totalQuestions) * 100) >= 70) {
            gradeText = 'Good work!'
        }
        else if (((marks / totalQuestions) * 100) >= 60) {
            gradeText = 'Not Good!';
        }
        else if (((marks / totalQuestions) * 100) >= 50) {
            gradeText = 'Poor performance :('
        } else {
            gradeText = 'Terrible performance :('
        }

        resultGradeP.textContent = gradeText;
    }
    userGotWrong();
    loadFromLocal();
    saveToLocal(marks, gradeText);

    //showing or hiding particular section
    quizSection.style.display = 'none';
    resultSection.style.display = 'block';

})


//This function filter out quiz that user did not get correct and save them to local storage
function userGotWrong(){
    userGotWrongQuizData = quizData.filter(quiz => !nailedId.includes(quiz.id));
    localStorage.setItem('ugw_QuizData', `${JSON.stringify(userGotWrongQuizData)}`);
}


//This function take data from submit button listener function and save them to user's local storage for showing previous results as history
function saveToLocal(marks, gradeText, time){
    let resultsToSave = [];

    let liveResult = {
        marks : `${marks}/${totalQuestions}`,
        gradeText : gradeText
    }

    let savedResult = JSON.parse(localStorage.getItem('results'));
    if(savedResult){
        resultsToSave = savedResult;
        resultsToSave.push(liveResult);
    } else{
        resultsToSave.push(liveResult);
    }

    localStorage.setItem('results', `${JSON.stringify(resultsToSave)}`);
}


//This function searches saved result data from user's local storage and if available write them all to the targeted table
function loadFromLocal(){
    const historyTable = document.getElementById('historyTable');
    const savedResults = JSON.parse(localStorage.getItem('results'));

    if(savedResults){
        historySection.style.display = 'block';
        
        historyTable.innerHTML = `
            <tr>
                <th>Marks</th>
                <th>Grade Messages</th>
                <th>Time</th>
            </tr>
        `;

        savedResults.forEach(result => {
            const{marks, gradeText, time} = result;
            historyTable.innerHTML += `
                <tr>
                    <td>${marks}</td>
                    <td>${gradeText}</td>
                    <td>??</td>
                </tr>
            `;
        })
    }

}


//clear history anchor function
document.getElementById('clearHistory').addEventListener('click', ()=>{
    localStorage.removeItem('results');
    historySection.style.display = 'none';
})