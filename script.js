var startSectionEl = document.querySelector("#start-section");
var quizSectionEl = document.querySelector("#quiz-section");
var highScoresSectionEl=document.querySelector("#high-scores-section")
var highScoreFinalEl=document.querySelector("#high-score-final")

var startGameButtonEl = startSectionEl.querySelector("button");
var questionTextEl =quizSectionEl.querySelector("h2");
var answerButtonEls=Array.from(quizSectionEl.querySelectorAll("button"));
var highScoreSubBtn=highScoresSectionEl.querySelector("button");



let timeEl = document.querySelector(".time");
let secondsLeft = 80;
let quizActive=true;



var questions=[
  {
    text:"Question 1",
    answers:["Answer 1a","Answer 1b","Answer 1c","Answer 1d"],
    correctIndex:2
  },
  {
    text:"Question 2",
    answers:["Answer 2a","Answer 2b","Answer 2c","Answer 2d"],
    correctIndex:2
  },
  {
    text:"Question 3",
    answers:["Answer 3a","Answer 3b","Answer 3c","Answer 3d"],
    correctIndex:2
  },
  {
    text:"Question 4",
    answers:["Answer 4a","Answer 4b","Answer 4c","Answer 4d"],
    correctIndex:2
  },
  {
    text:"Question 5",
    answers:["Answer 5a","Answer 5b","Answer 5c","Answer 5d"],
    correctIndex:2
  },
];

var questionIndex=0;

var displayQuestion=function(){
  questionTextEl.textContent=questions[questionIndex].text
  for (var i=0;i<answerButtonEls.length;i +=1){
    answerButtonEls[i].textContent=questions[questionIndex].answers[i];
  }
};

startGameButtonEl.addEventListener("click", function () {
    startSectionEl.hidden = true;
    displayQuestion()
    setTime()
    quizSectionEl.hidden = false;
});

// Quiz functionality
for (let i=0;i<answerButtonEls.length;i +=1){
  answerButtonEls[i].addEventListener("click",function(){
    if(i===questions[questionIndex].correctIndex){
      // Do correct things
      console.log("Right")
      
    }else{
      // Do incorrect things
      secondsLeft-=5;
      console.log("Wrong")
      }
    if (questionIndex<questions.length-1){
      questionIndex+=1,
    displayQuestion();
    }else{
      // Quiz Over
      quizSectionEl.hidden=true;
      highScoresSectionEl.hidden=false;
      quizActive=false;
      let secondsLeftLs=JSON.stringify(secondsLeft);
      let highScoreInt = function() {
        localStorage.setItem("high-score",secondsLeftLs);
        console.log(secondsLeftLs);
      }
      highScoreInt();
    }
  });
}
highScoreSubBtn.addEventListener("click",function(){
  highScoresSectionEl.hidden=true;
  highScoreFinalEl.hidden=false;
});

// Timer
function setTime() {
  quizActive=true
  // Sets interval in variable
  let timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft===0||quizActive===false) {
    clearInterval(timerInterval);
    }

  }, 1000);
}


