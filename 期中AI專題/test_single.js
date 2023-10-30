const URL_JSON = 'https://raw.githubusercontent.com/goldenFishing/AI_midterm/main/problemDatebase.json';
implementCounter=localStorage.getItem('implementCounter');

var selectedChapter = localStorage.getItem('selectedChapter');//讀取使用者選取的章節
/*創建一空陣列儲存答案*/
var answerArray = [];
console.log("implementCounter="+implementCounter)
if(implementCounter=1){
  fetch(URL_JSON)
  .then(response => response.json()) // 將response轉換為JSON格式
  .then(problemData => { // 用JSON動態生成表單內容
    var problemValue = problemData["chapter"][selectedChapter]["problemValue"];
    
    var questionContainer = document.getElementById('question-container');// 將問題DIV添加到文檔中的question-container元素中
    
    var problemIndexShuffle = [];
    for (let i = 0; i < problemValue; i++){
      problemIndexShuffle.push(i);
    }
    shuffleArray(problemIndexShuffle);

    problemIndexShuffle.forEach((problem_index,index) => {
      /*依題數動態生成div區塊*/
      var div = document.createElement('div');
      div.className = 'problem-box';
      div.id = 'container' + problem_index;
      questionContainer.appendChild(div);// 將問題DIV添加到question-container中
      

      /*將\\n置換成<br>標籤*/
      var printedQuestionString = problemData["chapter"][selectedChapter]["problem"][problem_index]["question"];
      var formatSrting = printedQuestionString.replace(/\\n/g, '<br>');
      /*列印題號*/
      var print_index= index;
      div.innerHTML = (print_index + 1) + '）' + formatSrting + '<br>';
      
      /*依照打亂的順序儲存該題答案*/
      var answerString = problemData["chapter"][selectedChapter]["problem"]["answer"];
      answerArray[index] = answerString;

      /*打亂該題選項順序*/
      var optionValue = problemData["chapter"][selectedChapter]["problem"][problem_index]["optionValue"];
      var optionIndexShuffle = [];
      for (let i = 0; i < optionValue; i++) {
        optionIndexShuffle.push(i);
      }

      shuffleArray(optionIndexShuffle);
      optionIndexShuffle.forEach(option_index => {
        var option = document.createElement('input');// 創建一個新的選項(input元素)和標籤(label元素)
        option.type = 'radio';
        option.id = 'option_' + problem_index + '_index' + option_index;
        option.name = 'option_problem_' + problem_index; // name = 屬於哪一題的選項
        div.appendChild(option);

        var label = document.createElement('label');
        label.setAttribute('for', 'option_' + problem_index + '_index' + option_index);  // 使用setAttribute設定label的for屬性
        label.appendChild(document.createTextNode(problemData["chapter"][selectedChapter]["problem"][problem_index]["option"][option_index]));
        div.appendChild(label);
        div.appendChild(document.createElement('br'));
      });
    })
    console.log("fetch結束");
    implementCounter = 0;
    console.log("implementCounter="+implementCounter)
  })
  .catch(error => {// 處理錯誤
    console.error('Error:', error);
  });
}
  

  document.addEventListener("DOMContentLoaded", ()=>{//確保所有元素都被加載完成後才能使用這些按鈕
    console.log('DOMContentLoaded 觸發了！');
    var submitButton = document.getElementById('submit-button');
    var backButton = document.getElementById('back-button');
  
    backButton.addEventListener('click',()=>{//返回首頁
      console.log('homePage 觸發了！');
      window.location.href = 'homePage.html';
  });

  var problemIndexArray, correctAnswerArray, wrongAnswerArray, wrongProblemArray;
  
  submitButton.addEventListener('click', ()=>{//送出表單並紀錄錯題與分數
    var confirmEvent = confirm("確定送出答案嗎？");
    console.log(confirmEvent);
    
    if (confirmEvent) {
      //console.log(送出答案並計算分數);
      var selectedOptionsArray = getCheckedOptions();
      var scoreValue = markAndScore(problemValue,selectedOptionsArray,answerArray);
      console.log(scoreValue);
      localStorage.setItem('FinalScore',scoreValue);//儲存使用者分數

      if(scoreValue!=100){//儲存使用者錯誤的答案
        var wanswerArray = markAndRecordAnswer(problemValue,selectedOptionsArray,answerArray);
        var wproblemArray = [];
        fetch(URL_JSON)
        .then(response => response.json()) // 將response轉換為JSON格式
        .then(problemData => {
          wanswerArray.forEach((data,index)=>{
            if(data!=null){
              problem_index = problemIndexShuffle[index];
              wproblemArray[index] = problemData["chapter"][selectedChapter]["problem"][problem_index]["question"];
            }
            localStorage.setItem('problemIndexArray',JSON.stringify(problemIndexShuffle));
            console.log(problemIndexArray)
            localStorage.setItem('correctAnswerArray', JSON.stringify(answerArray));
            console.log(correctAnswerArray)
            localStorage.setItem('wrongAnswerArray', JSON.stringify(wanswerArray));
            console.log(wrongAnswerArray)
            localStorage.setItem('wrongProblemArray',JSON.stringify(wproblemArray));
            console.log(wrongProblemArray)
            window.location.href = 'result_single.html';
          })
        })
        .catch(error => {// 處理錯誤
          console.error('Error:', error);
        });
      }
    }
  });
});

function shuffleArray(Array) {              // Fisher-Yates演算法：將陣列洗牌
  for (let i = Array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [Array[i], Array[j]] = [Array[j], Array[i]];
  }
}

function getCheckedOptions(){ // 取得使用者勾選的選項
  var form = document.getElementById("question-form");
  var checkDataBoxes = form.querySelectorAll('input[type=checkbox]:checked');
  var selectedOptions = [];

  checkDataBoxes.forEach(function(checkDataBoxes) {
    selectedOptions.push(checkDataBoxes.value);
  });

  return selectedOptions; // 這裡會顯示被選中的選項index陣列
}

function markAndScore(problemValue,userArray,answerArray){
  
  var uncorrectQuantity = 0;
  for(let i=0 ; i<problemValue ; i++){
    if(userArray[i]!=answerArray[i]){
      uncorrectQuantity++;
    }
  }
  var score = 0;
  var pointSdeducted = 100/problemValue;
  pointSdeducted = Math.floor(pointSdeducted);

  if(uncorrectQuantity==0){
    score = 100;
  }
  else if(uncorrectQuantity==problemValue){
    score = 0;
  }
  else{
    score = 100 - pointSdeducted*uncorrectQuantity;
  }
  return score;

}
function markAndRecordAnswer(problemValue,userArray,answerArray){
  var wrongAnswerArray = [];
  for(let i=0 ; i<problemValue ; i++){
    if(userArray[i]!=answerArray[i]){
      wrongAnswerArray.push(userArray[i]);
    }
  }
  return wrongAnswerArray;
}
