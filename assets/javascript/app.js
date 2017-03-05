$(document).ready(function() {

    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }

    initialScreen();

    $("body").on("click", ".start-button", function(event){


        generateHTML();

        timerWrapper();

    });

    $("body").on("click", ".answer", function(event){

        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {


            clearInterval(timer);
            generateWin();
        }
        else {

            clearInterval(timer);
            generateLoss();
        }
    });

    $("body").on("click", ".reset-button", function(event){
        resetGame();
    });

});

var startScreen;
var gameHTML;
var counter = 30;
var questions = ["what is the capital of New York", "What is the capital of Colorado?", "What is the capital of Florida?", "What is the capital of Utah?", "What is the capital of Virginia?", "What is the capital of Maine?", "What is the capital of Texas?", "What is the capital of Arizona?"];
var answers = [["Fayetteville", "Baton Rouge", "Annapolis", "Albany"], ["Denver","Des Moines","Tuzon","Frankfort"], ["Jackson", "Harrisburg", "Tallahassee", "Montpelier"], ["Columbia","Salt Lake City","Annapolis","Olympia"], ["Cheyenne", "Richmond", "Charleston", "Juneau"], ["Hartford","Boise","Topeka","Madison"], ["Pierre", "Austin", "Helena", "Trenton"], ["Little Rock","Atlanta","Raleigh","Phoenix"]];
var correctAnswers = ["D. Albany", "A. Denver", "C. Tallahassee", "B. Salt Lake City", "B. Richmond", "C. Augusta", "B. Austin", "D. Phoenix"];
var questionCounter = 0;
var selecterAnswer;
var timer;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

function generateLossDueToTimeOut() {
    unanswered++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 3000);
}

function generateWin() {
    correct++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-correct' src='assets/images/correct.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 3000);
}

function generateLoss() {
    incorrect++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 3000);
}

function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questions[questionCounter] + "</p><p class='first-answer answer'>A. " + answers[questionCounter][0] + "</p><p class='answer'>B. "+answers[questionCounter][1]+"</p><p class='answer'>C. "+answers[questionCounter][2]+"</p><p class='answer'>D. "+answers[questionCounter][3]+"</p>";
    $(".mainArea").html(gameHTML);
}

function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 25;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

function timerWrapper() {
    timer = setInterval(thirtySeconds, 1000);
function thirtySeconds() {
        if (counter === 0) {
            clearInterval(timer);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correct + "</p>" + "<p>Wrong Answers: " + incorrect + "</p>" + "<p>Unanswered: " + unanswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(gameHTML);
}

function resetGame() {
    questionCounter = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    counter = 30;
    generateHTML();
    timerWrapper();
}


