// Sections of the quiz that are use the .hidden attribute to display
var startSectionEl = document.querySelector("#start-section");
var quizSectionEl = document.querySelector("#quiz-section");
var highScoresSectionEl=document.querySelector("#high-scores-section")
var highScoreFinalEl=document.querySelector("#high-score-final")
// BUttons that function in the quiz
var startGameButtonEl = startSectionEl.querySelector("button");
var questionTextEl =quizSectionEl.querySelector("h2");
var answerButtonEls=Array.from(quizSectionEl.querySelectorAll("button"));
var highScoreSubBtn=highScoresSectionEl.querySelector("button");
var initialEl = document.querySelector('#fname')
var submitBtn=document.querySelector("#submit-btn")
var clearHighScoresBtn=document.querySelector("#clear-btn")
var goBackBtn=document.querySelector("#go-back")
var highScoresBtn=document.querySelector("#high-score-btn")


let timeEl = document.querySelector(".time");
let secondsLeft = 80;
let quizActive=true;


// All the questions in the quiz that are randomized
var questions=[
  {
    text:"Commonly used data types\n Do Not include:",
    answers:["strings","booleans","alerts","numbers"],
    correctIndex:2
  },
  {
    text:"The condition in an if/else statement is enclosed with _______",
    answers:["quotes","curly brackets","parenthesis","square brackets"],
    correctIndex:2
  },
  {
    text:"Arrays in javascript can be used to store ________",
    answers:["numbers and strings","all of the above","other arrays","booleans"],
    correctIndex:1
  },
  {
    text:"String values must be enclosed withing____ when being assigned to variables.",
    answers:["commas","curly brackets","quotes","parenthesis"],
    correctIndex:3
  },{
    text:"A very useful tool used during development and debugging for printing content to the debugger is:",
    answers:["javascript","terminal/bash","for loops","console.log"],
    correctIndex:3
  }
];
// Helps to randomize the quiz
var questionIndex=0;
// function to display the questions with answers and question
var displayQuestion=function(){
  questionTextEl.textContent=questions[questionIndex].text
  for (var i=0;i<answerButtonEls.length;i +=1){
    answerButtonEls[i].textContent=questions[questionIndex].answers[i];
  }
};
// button to hide all the sections menus the high scores page
highScoresBtn.addEventListener("click",function(){
      quizSectionEl.hidden=true;
      highScoresSectionEl.hidden=true;
      startSectionEl.hidden =true;
      highScoreFinalEl.hidden=false;
      highScoresBtn.hidden=true;
      printScores()

});

// First button that starts the game
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
    }
  });
}
// Submit button
highScoreSubBtn.addEventListener("click",function(){
  highScoresSectionEl.hidden=true;
  highScoreFinalEl.hidden=false;
  saveHighScores()
  printScores()
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
// Used to add the scores to local storage
function saveHighScores(){
  var initials = initialEl.value
  var highScoresArray = JSON.parse(localStorage.getItem('high-scores')) || []

  var newScoreObj = {
    initial: initials,
    score: secondsLeft
  }

  highScoresArray.push(newScoreObj)
  console.log(highScoresArray);

  localStorage.setItem("high-scores",JSON.stringify(highScoresArray))

}
// submitBtn.onclick = saveHighScores

// function that takes the scores that were sent to local storage and then sends it back into a li in a ol section
function printScores(){
  var highScoresArray = JSON.parse(localStorage.getItem('high-scores')) || []
  for (var i =0; i < highScoresArray.length; i++) {
    var currentScoreObj = highScoresArray[i]
    var ol = document.querySelector('#highscores')
    var liTag = document.createElement('li')
    liTag.textContent = currentScoreObj.initial + ':' + currentScoreObj.score
    ol.append(liTag)
    highScoresBtn.hidden=true;
    // var li = document.createElement('li')
    // li.textContent = highscorearr[i].initial
  }
}
// Removes all high-scores from local storage
clearHighScoresBtn.addEventListener("click",function(){
  window.localStorage.removeItem("high-scores")
  location.reload()
});
// Takes you back to the main page
goBackBtn.addEventListener("click",function(){
  highScoreFinalEl.hidden=true;
  startSectionEl.hidden = false;
  timeEl.hidden=true
  location.reload()

})

