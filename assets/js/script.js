var startButton = document.querySelector("#start-btn");

// Clicking start to start the test. It makes the text disappear and calls the workingTimer function to start the 1 minute timer
startButton.addEventListener("click", function (event) {
    document.getElementById("intro").style.display = "none"
    workingTimer();
});

// Making the timer hidden at 01:00
var timerEl = document.getElementById("timer")
    timerEl.innerHTML="<p>01:00</p>";
    timerEl.style.visibility="hidden";

var seconds = 59;

// Timer set to 1 minute
function workingTimer() {
timerEl.style.visibility = "visible";
var timer = setInterval(function() {
    seconds--;
      if (seconds >= 10) {
        timerEl.innerHTML="<p>00:"+seconds+"</p>";
      }
      if (seconds < 10) {
        timerEl.innerHTML="<p>00:0"+seconds;
      }
      if (seconds <= 0) {
        clearInterval(timer);
        //CALL END GAME FUNCTION?
      }  
}, 1000);
}





