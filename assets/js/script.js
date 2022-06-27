var startButton = document.querySelector("#start-btn");
var score = 0;
var seconds = 59;
var timer;

// Making the timer hidden at 01:00
var timerEl = document.getElementById("timer")
    timerEl.innerHTML = "<p>01:00</p>";
    timerEl.style.visibility = "hidden";

//making quiz section hidden at beginning
var quizEl = document.getElementById("quiz")
    quizEl.style.visibility = "hidden"

// Clicking start to start the test. It makes the text disappear and calls the workingTimer function to start the 1 minute timer
startButton.addEventListener("click", function (event) {
    document.getElementById("intro").style.display = "none";
    quizEl.style.visibility = "visible";
    workingTimer();
    displayQuestion(questionIndex);
});

// Timer set to 1 minute
function workingTimer() {
timerEl.style.visibility = "visible";
    timer = setInterval(function() {
        seconds--;
        if (seconds >= 10) {
            timerEl.innerHTML="<p>00:"+seconds+"</p>";
        }
        if (seconds < 10) {
            timerEl.innerHTML="<p>00:0"+seconds+"</p>";
        }
        if (seconds <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

//Questions that will be used with correct answer
var questions = [
    {question: "Which of the following is NOT one of the 9 JavaScript data types?",
    answers: {
        A: "Big Int",
        B: "Undefined",
        C: "Symbol",
        D: "Decimal" 
    },
    correct: "D"
    },
    {question: "Which of the following HTML tags is self closing?",
    answers: {
        A: "img",
        B: "li",
        C: "body",
        D: "button"
    },
    correct: "A"
    },
    {question: "What does CSS stand for?",
    answers: {
        A: "Computer Science Script",
        B: "Cascading Style Sheets",
        C: "Creative Styling Setup",
        D: "Continuous Scripting Style"
    },
    correct: "B"
    },
    {question: "API stands for Application Programming ____?",
    answers: {
        A: "Iteration",
        B: "Industry",
        C: "Interface",
        D: "Internet"
    },
    correct: "C"
    },
]

var questionIndex = 0;

//For loop to go through all of the questions
function displayQuestion(questionAsked) {
        document.getElementById("question").innerText = questions[questionAsked].question;

        document.getElementById("a").innerText = "A. " + questions[questionAsked].answers.A;
        document.getElementById("b").innerText = "B. " + questions[questionAsked].answers.B;
        document.getElementById("c").innerText = "C. " + questions[questionAsked].answers.C;
        document.getElementById("d").innerText = "D. " + questions[questionAsked].answers.D;
}

function getAnswer(userSelection) {
    var wrongCorrectEl = document.getElementById("wrong-correct");

    if(userSelection == questions[questionIndex].correct){
        questionIndex++;
        score += 13 * seconds;
        wrongCorrectEl.innerText = "correct!"
            if(questionIndex > 3 || seconds <= 0) {
                endGame();
            } else {
                displayQuestion(questionIndex)
            };
    } else {
        seconds -= 10;
        wrongCorrectEl.innerText = "wrong!"
    }
}

function endGame() {
    if (seconds > 0) {
        document.getElementById("ending").innerHTML = "You did it! <br> Your final score is " + score + " with " + seconds + " second(s) left!</br>";
    } else {
        document.getElementById("ending").innerHTML = "Uh-oh! You ran out of time. <br> Your final score is " + score + "!</br>";
    }
    
    quizEl.remove();
    timerEl.remove();
    clearInterval(timer);
}
 
