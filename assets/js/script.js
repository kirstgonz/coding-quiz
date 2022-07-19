var startButton = document.querySelector("#start-btn");
var score = 0;
var seconds = 59;
var timer;

//Making high scores hidden until high score button is clicked
var highScoreEl = document.getElementById("highscore");
    highScoreEl.style.display = "none";
var highScoreButton = document.getElementById("score-btn");
var scoresShown = false;

// Making the timer hidden at 01:00
var timerEl = document.getElementById("timer");
    timerEl.innerHTML = "<p>01:00</p>";
    timerEl.style.visibility = "hidden";

//Making the end of the quiz hidden until timer reaches 0 or quiz is completed
var endingEl = document.getElementById("end-of-quiz");
    endingEl.style.visibility = "hidden";

//Making quiz section hidden at beginning
var quizEl = document.getElementById("quiz");
    quizEl.style.visibility = "hidden";

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

//Index of question in the questions array
var questionIndex = 0;

//Initials and submit button for high score
var initialsInputEl = document.getElementById("initial");
var submitButtonEl = document.getElementById("submit");

//Get reference to the #reset element to reset the quiz
var resetButton = document.querySelector("#reset");

// Clicking start to start the test. It makes the text disappear and calls the workingTimer function to start the 1 minute timer
startButton.addEventListener("click", function (event) {
    document.getElementById("intro").style.display = "none";
    quizEl.style.visibility = "visible";
    scoresShown = true;
    showScores();
    workingTimer();
    displayQuestion(questionIndex);
});

// Timer set to 1 minute and ends game if 0
function workingTimer() {
timerEl.style.visibility = "visible";
    timer = setInterval(function() {
        if (seconds >= 10) {
            timerEl.innerHTML="<p>00:"+seconds+"</p>";
        }
        if (seconds < 10) {
            timerEl.innerHTML="<p>00:0"+seconds+"</p>";
        }
        if (seconds <= 0) {
            clearInterval(timer);
            endGame();
        };
        seconds--;
    }, 1000);
}

//Displays the question by accessing different values in the "questions" array
function displayQuestion(questionAsked) {
        document.getElementById("question").innerText = questions[questionAsked].question;

        document.getElementById("a").innerText = "A. " + questions[questionAsked].answers.A;
        document.getElementById("b").innerText = "B. " + questions[questionAsked].answers.B;
        document.getElementById("c").innerText = "C. " + questions[questionAsked].answers.C;
        document.getElementById("d").innerText = "D. " + questions[questionAsked].answers.D;
}

//Checks if user picked the correct answer. Updates score and timer.
function getAnswer(userSelection) {
    var wrongCorrectEl = document.getElementById("wrong-correct");
    var btn = userSelection.toLowerCase();

    if(userSelection == questions[questionIndex].correct){
        questionIndex++;
        score += 13 * seconds;
        wrongCorrectEl.innerText = "correct!"

            if(questionIndex > 3 || seconds <= 0) {
                endGame();
            } else {
                var buttonColor = "rgb(230, 191, 251)";

                document.getElementById("a").style.backgroundColor = buttonColor;
                document.getElementById("b").style.backgroundColor = buttonColor;
                document.getElementById("c").style.backgroundColor = buttonColor;
                document.getElementById("d").style.backgroundColor = buttonColor;
                displayQuestion(questionIndex);
            };
    } else {
        seconds -= 10;
        wrongCorrectEl.innerText = "wrong!";

    //Make selected choices red if wrong
    var redBtn = document.getElementById(btn);
        redBtn.style.backgroundColor = "red";
    }
}

//Ends the game
function endGame() {
    quizEl.remove();
    timerEl.remove();
    clearInterval(timer);
    endingEl.style.visibility = "visible";

    if (seconds > 0) {
        document.getElementById("ending").innerHTML = "You did it! <br> Your final score is " + score + " with " + seconds + " second(s) left!</br>";
    } else {
        document.getElementById("ending").innerHTML = "Uh-oh! You ran out of time. <br> Your final score is " + score + "!</br>";
    }
}

//Grabbing user input for initials. Placing initians and high score in localStorage
submitButtonEl.addEventListener("click", function(event){
    event.preventDefault();

    var user = {
        initials: initialsInputEl.value.trim(),
        scores: score,
    };

    localStorage.setItem(user.initials, JSON.stringify(user));
    storeScores();
});

function storeScores() {
    highScoreEl.innerHTML = null;

    var archiveScores = [];
    var archiveInitials = [];
    
    keys = Object.keys(localStorage);

    for (key = 0; key < keys.length; key++){
        var temporary = JSON.parse(localStorage.getItem(keys[key]));
        archiveScores.push(temporary.scores);
        archiveInitials.push(temporary.initials);
        
        highScoreEl.innerHTML += "<br>" + archiveInitials[archiveInitials.length-1] + ": " + archiveScores[archiveScores.length-1];
    }
    return archiveScores;
}


function showScores() {
    if(scoresShown){
        scoresShown = false;
        highScoreEl.style.display = "none";
    } else {
        scoresShown = true;
        highScoreEl.style.display = "block";
    }
};

highScoreButton.addEventListener("click", showScores);

//resets the quiz
function resetQuiz() {
  document.location.reload();
};

//Add event listener to reset button
resetButton.addEventListener("click", resetQuiz);

storeScores();