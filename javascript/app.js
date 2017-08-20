$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
  startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
  $(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
  event.preventDefault();  // added line to test issue on GitHub Viewer
  generateHTML();

  timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
  //answeredQuestion = true;
  selectedAnswer = $(this).text();
  if(selectedAnswer === correctAnswers[questionCounter]) {
    //alert("correct");

    clearInterval(theClock);
    generateWin();
  }
  else {
    //alert("wrong answer!");
    clearInterval(theClock);
    generateLoss();
  }
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
  resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
  unansweredTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
  correctTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
  incorrectTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
  $(".mainArea").html(gameHTML);
}

function wait() {
  if (questionCounter < 7) {
  questionCounter++;
  generateHTML();
  counter = 30;
  timerWrapper();
  }
  else {
    finalScreen();
  }
}

function timerWrapper() {
  theClock = setInterval(thirtySeconds, 1000);
  function thirtySeconds() {
    if (counter === 0) {
      clearInterval(theClock);
      generateLossDueToTimeOut();
    }
    if (counter > 0) {
      counter--;
    }
    $(".timer").html(counter);
  }
}

function finalScreen() {
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $(".mainArea").html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  correctTally = 0;
  incorrectTally = 0;
  unansweredTally = 0;
  counter = 30;
  generateHTML();
  timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What is the name of Serial Mom?",
                    "What does Serial Mom use to kill Mrs. Jensen?",
                    "Why does Serial Mom hate Rosemary Ackerman?",
                    "Why does Serial Mom hate Dottie Hinkle?",
                    "How many people does Serial Mom kill?",
                    "What did Misty get from Birdie to sell at the flea market?",
                    "How many times did Serial Mom prank Dottie Hinkle?",
                    "What was the sermon that the family attended?",
                    "Who was Serial Mom's first victim?",
                    "What movie does Chip say is the Citizen Kane of horror movies?"];
var answerArray = [["Beverly Sutphin", "Susanne Connely","Jennifer Mowery","Catherine Danahough"], 
                  ["knife","stapler","leg of lamb","lead pipe"], 
                  ["she stole her parking space","she didn't rewind her vhs tape","she doesn't recycle", "she wore white after labour day"], 
                  ["she stole her parking space","she didn't rewind her vhs tape","she doesn't recycle","she wore white after labour day"], 
                  ["2","8","5","7"], 
                  ["Franklin Mint egg","A Pee Wee Herman doll","fire poker","an Annie VHS tape"], 
                  ["3","2","1","4"],
                  ["The Wages of Sin","Capital Punishment & You","God's Commandments & You","The Sinner in You"]
                  ["Dottie Hinkle","Rosmary Ackerman","Carl Pagent","Mr. Stubbins"]
                  ["Blood Feast","Texas Chainsaw Massacre","Pscho","The Shining"]];
var correctAnswers = ["A. Beverly Sutphin", 
                      "C. leg of lamb", 
                      "C. she doesn't recycle", 
                      "A. she stole her parking space", 
                      "D. 7", 
                      "B. A Pee Wee Herman doll", 
                      "B. 2", 
                      "B. Capital Punishment & You",
                      "D. Mr. Stubbins",
                      "A. Blood Feast"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
