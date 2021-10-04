// Declared variables
var highScore = document.querySelector("#highScore");
var clearHighscore = document.querySelector("#clearHighscore");
var goBack = document.querySelector("#goBack");

// Event listener to clear scores 
clearHighscore.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
// Retreives local stroage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

  for (var i = 0; i < allScores.length; i++) {

    var createLi = document.createElement("li");
    createLi.textContent = allScores[i].initials + " " + allScores[i].score;
    highScore.appendChild(createLi);

  }
}
// Move to index page
goBack.addEventListener("click", function () {
  window.location.replace("./index.html");
})
