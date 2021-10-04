// Questions
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Arrays in Javascript can be used to store ____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
  },
  {
    title: "String values must be enclosed within ______ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes"
  },
  {
    title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console log"
  },

];

// variable declaration
var score = 0;
var questionIndex = 0;

// Start working code 

var timerDiv = document.querySelector("#timerDiv");
var startTimer = document.querySelector("#startQuiz");
var quizChalenge = document.querySelector("#quizChalenge");
var wrapper = document.querySelector("#wrapper");

// 30 seconds per question:
var secondsLeft = 150;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new list of elements
var createUl = document.createElement("ul");

// Timer on button
startTimer.addEventListener("click", function () {

  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      timerDiv.textContent = "Time: " + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
        timerDiv.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
  // Clears existing data 
  quizChalenge.innerHTML = "";
  createUl.innerHTML = "";

  for (var i = 0; i < questions.length; i++) {

    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].choices;
    quizChalenge.textContent = userQuestion;
  }
  // New for each for question choices
  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    quizChalenge.appendChild(createUl);
    createUl.appendChild(listItem);
    listItem.addEventListener("click", (compare));
  })
}
// Event to compare choices with answer
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {

    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");
    if (element.textContent == questions[questionIndex].answer) {
      score++;
      createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
    } else {
      //Deducting -5 seconds for wrong answers
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
    }

  }
  // Question Index determines number question user is on
  questionIndex++;

  if (questionIndex >= questions.length) {
    allDone();
    createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
  } else {
    render(questionIndex);
  }
  quizChalenge.appendChild(createDiv);

}
// Last page
function allDone() {
  quizChalenge.innerHTML = "";
  timerDiv.innerHTML = "";

  // Heading:
  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!"

  quizChalenge.appendChild(createH1);

  // Paragraph
  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  quizChalenge.appendChild(createP);

  // Calculates time remaining
  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    quizChalenge.appendChild(createP2);
  }

  // Label
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  quizChalenge.appendChild(createLabel);

  // input
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  quizChalenge.appendChild(createInput);

  // submit
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  quizChalenge.appendChild(createSubmit);

  // Capturing initials and local storage for initials and score
  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {

      console.log("No value entered!");

    } else {
      var finalScore = {
        initials: initials,
        score: timeRemaining
      }
      console.log(finalScore);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
      // Final page
      window.location.replace("./indexHighScore.html")
    }
  });

}
