// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Show rules alert on page load
  alertRules();

  // Add click event listeners to player choice buttons
  document.querySelectorAll("#player-choice .btn").forEach((button) => {
    button.addEventListener("click", () => selectPlayerChoice(button));
  });
});

function alertRules() {
  alert(
    "Rules:\n1) You cannot make the computer's decision.  \n2) Make your selection and press 'Play' button."
  );
}

function selectPlayerChoice(button) {
  // Remove 'selected' class from all buttons
  document
    .querySelectorAll("#player-choice .btn")
    .forEach((btn) => btn.classList.remove("selected"));
  // Add 'selected' class to the clicked button
  button.classList.add("selected");
}

function play() {
  const playerChoice = getSelectedChoice();
  if (!playerChoice) {
    alert("Please select your play.");
    return;
  }

  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);

  displayResults(playerChoice, computerChoice, result);
}

function getSelectedChoice() {
  const selectedButton = document.querySelector("#player-choice .btn.selected");
  return selectedButton ? selectedButton.id : null;
}

function getComputerChoice() {
  const choices = ["Rock", "Paper", "Scissor"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (playerChoice === "Rock" && computerChoice === "Scissor") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissor" && computerChoice === "Paper")
  ) {
    console.log("HERE");
    return "You win!";
  } else {
    return "Computer wins!";
  }
}

function displayResults(playerChoice, computerChoice, result) {
  const playerResult = document.getElementById("player-result");
  const compResult = document.getElementById("comp-result");
  const gameResult = document.getElementById("game-result");
  const resultContainer = document.getElementById("winner-card");
  const blurContainer = document.querySelector(".blur");

  playerResult.innerText = `Player chose: ${playerChoice}`;
  compResult.innerText = `Computer chose: ${computerChoice}`;
  gameResult.innerText = `Result: ${result}`;

  blurContainer.style.display = "block";
  // Show result container
  resultContainer.classList.toggle("hidden");
  scatterGlitter(result);
}

function scatterGlitter(result) {
  const body = document.body;

  if (result === "It's a tie!") {
    return;
  }

  for (let i = 0; i < 9; i++) {
    const glitter = document.createElement("div");
    glitter.className = "glitter";
    const leftPosition = Math.random() * window.innerWidth;
    const topPosition = Math.random() * window.innerHeight;
    glitter.style.left = `${leftPosition}px`;
    glitter.style.top = `${topPosition}px`;

    // Set the color based on the result
    if (result == "You win!") {
      // console.log("Setting background color to #ffeb3b");
      glitter.style.backgroundColor = "#ffeb3b";
    } else {
      // console.log("Setting background color to #40e0d0");
      glitter.style.backgroundColor = "#40e0d0";
    }

    // console.log(
    //   "Background color after setting:",
    //   glitter.style.backgroundColor
    // );

    body.appendChild(glitter);

    // Remove the glitter element after the animation ends
    glitter.addEventListener("animationend", () => {
      glitter.remove();
    });
  }
}

function resetGame() {
  // Hide result container
  document.getElementById("winner-card").classList.add("hidden");
  const blurContainer = document.querySelector(".blur");
  blurContainer.style.display = "none";
  // Deselect all player choice buttons
  document
    .querySelectorAll("#player-choice .btn")
    .forEach((btn) => btn.classList.remove("selected"));
}
