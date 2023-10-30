//const URL_JSON = 'https://raw.githubusercontent.com/goldenFishing/AI_midterm/main/problemDatebase.json';
var userScore = localStorage.getItem('FinalScore');// 自localStorage抓取分數
score.innerHTML = userScore;

var failedButton = document.getElementById('failed-problem');
var backButton = document.getElementById('back-button');

var problemIndexArray = JSON.parse(localStorage.getItem('problemIndexArray'));
var wrongProblemArray = JSON.parse(localStorage.getItem('wrongProblemArray'));
var correctAnswerArray = JSON.parse(localStorage.getItem('correctAnswerArray'));
var wrongAnswerArray = JSON.parse(localStorage.getItem('wrongAnswerArray'));
if(wrongAnswerArray==null){
    displayButton();
}
failedButton.addEventListener('click',()=>{
    var failedContainer = document.getElementById('failed-container');
    wrongAnswerArray.forEach((W_answerString,index)=>{
        var div = document.createElement('div');
        div.className = 'wrongProblem-box';
        div.id = 'container' + index;

        if(wrongAnswerArray!=null){
            failedContainer.appendChild(div);
            
            var problemString = problemIndexArray[index]+ ") " +wrongProblemArray[index];
            var C_answerString = correctAnswerArray[index];

            div.appendChild(problemString);
            div.appendChild(document.createElement('br'));
            div.appendChild(C_answerString);
            div.appendChild(document.createElement('br'));
            div.appendChild(W_answerString);

        }
    });
});


backButton.addEventListener('click',()=>{//返回首頁
    window.location.href = 'homePage.html';
});

function displayButton(){
    var button = document.getElementById("failed-problem");
    button.style.display = "block";
}