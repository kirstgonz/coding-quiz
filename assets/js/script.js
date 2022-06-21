
// addEventListener("click", startButton)

// var startButton = function(event) {
//     document.getElementById("button").addEventListener.("click," )
//     console.log("clicked!");
// }

//startButton();
var startButton = document.querySelector("#start-btn");

startButton.addEventListener("click", function (event) {
    document.getElementById("intro").style.display = "none"
});



var seconds = 5;
var timer = "";



