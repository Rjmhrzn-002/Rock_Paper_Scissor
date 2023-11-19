//todo:alert a rule card showing the rules after loading the game
//todo: Winner display card with play again button,z-index & blur effect

document.addEventListener("DOMContentLoaded", () => {
  alertRules();
});

function alertRules() {
  alert(
    "Rules:\n1) You cannot make the computer's decision.  \n2) Make your selection and press 'Play' button."
  );
}

const choices = ["Rock", "Paper", "Scissor"];

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function play() {
  // var selectChoice = document.querySelector(".select-choice");
  const playerChoiceButtons = document.querySelectorAll("#player-choice .btn");
  var playerChoice = "";

  playerChoiceButtons.forEach((button) => {
    if (button.classList.contains("selected")) {
      playerChoice = button.id;
    }
  });

  if (!playerChoice) {
    alert("please select your play.");
    // selectChoice.classList.toggle("hidden");
    return false;
  }

  const computerChoice = getComputerChoice();
  var result = determineWinner(playerChoice, computerChoice);
  const playerResult = document.getElementById("player-result");
  const compResult = document.getElementById("comp-result");
  const gameResult = document.getElementById("game-result");

  playerResult.innerText = `${playerChoice}`;
  compResult.innerText = getComputerChoice();
  gameResult.innerText = result;

  // const resultText = `Player chose: ${playerChoice}\nComputer chose: ${computerChoice}\nResult: ${result}`;
  // alert(resultText);
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissor") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissor" && computerChoice === "paper")
  ) {
    return "You win!";
  } else {
    return "Computer wins!";
  }
}

document.querySelectorAll("#player-choice .btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Remove 'selected' class from all buttons
    document
      .querySelectorAll("#player-choice .btn")
      .forEach((btn) => btn.classList.remove("selected"));
    // Add 'selected' class to the clicked button
    button.classList.add("selected");
  });
});
