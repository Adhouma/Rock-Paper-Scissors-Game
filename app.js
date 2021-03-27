const startGameBtn = document.querySelector(".start-btn");
const computerChoiceSection = document.querySelector(".computer-choice");
const playerChoiceSection = document.querySelector(".player-choice");
const result = document.querySelector(".result");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSOR = "SCISSOR";
const DEFAULT_SELECTION = ROCK;
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WIN = "PLAYER WIN";
const RESULT_COMPUTER_WIN = "COMPUTER WIN";

let gameIsRunning = false;
let playerImg;
let ComputerImg;
let displayedResultMessage;

const getPlayerChoice = () => {
  let selection = prompt("Choose ROCK, PAPER or SCISSOR?", "");
  if (selection === null || selection === undefined || selection === "") {
    return;
  }
  selection = selection.toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSOR) {
    alert("Invalid choice! default choice is ROCK");
    return DEFAULT_SELECTION;
  }
  return selection;
};

const getComputerChoice = () => {
  const randomValue = Math.floor(Math.random() * 3) + 1;
  if (randomValue === 1) {
    return ROCK;
  } else if (randomValue === 2) {
    return PAPER;
  } else {
    return SCISSOR;
  }
};

const getWinner = (computerChoice, playerChoice) => {
  if (computerChoice === playerChoice) {
    return RESULT_DRAW;
  } else if (
    (computerChoice === ROCK && playerChoice === PAPER) ||
    (computerChoice === PAPER && playerChoice === SCISSOR) ||
    (computerChoice === SCISSOR && playerChoice === ROCK)
  ) {
    return RESULT_PLAYER_WIN;
  } else {
    return RESULT_COMPUTER_WIN;
  }
};

startGameBtn.addEventListener("click", () => {
  if (gameIsRunning) {
    return;
  }
  if (playerImg !== undefined && ComputerImg !== undefined) {
    playerImg.remove();
    ComputerImg.remove();
  }

  if (displayedResultMessage !== undefined) {
    displayedResultMessage.remove();
  }

  gameIsRunning = true;

  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();

  if (playerChoice !== undefined) {
    const winner = getWinner(computerChoice, playerChoice);

    let resultMessage = `You picked ${playerChoice}, The computer picked ${computerChoice} therefore `;
    playerImg = document.createElement("img");
    ComputerImg = document.createElement("img");

    if (playerChoice === ROCK) {
      playerImg.src = "images/rock.png";
      playerImg.setAttribute("class", "rotated-rock");
      playerChoiceSection.append(playerImg);
    } else if (playerChoice === PAPER) {
      playerImg.src = "images/paper.png";
      playerChoiceSection.append(playerImg);
    } else {
      playerImg.src = "images/scissors.png";
      playerChoiceSection.append(playerImg);
    }

    if (computerChoice === ROCK) {
      ComputerImg.src = "images/rock.png";
      computerChoiceSection.append(ComputerImg);
    } else if (computerChoice === PAPER) {
      ComputerImg.src = "images/paper.png";
      ComputerImg.setAttribute("class", "rotated-paper");
      computerChoiceSection.append(ComputerImg);
    } else {
      ComputerImg.src = "images/scissors.png";
      ComputerImg.setAttribute("class", "rotated-scissor");
      computerChoiceSection.append(ComputerImg);
    }

    if (winner === RESULT_DRAW) {
      resultMessage += "you had a draw";
      displayedResultMessage = document.createElement("h3");
      displayedResultMessage.setAttribute("class", "h3-draw");
      displayedResultMessage.textContent = "YOU HAD A DRAW";
      result.append(displayedResultMessage);
    } else if (winner === RESULT_PLAYER_WIN) {
      resultMessage += "you won";
      displayedResultMessage = document.createElement("h3");
      displayedResultMessage.setAttribute("class", "h3-won");
      displayedResultMessage.textContent = "YOU WON";
      result.append(displayedResultMessage);
    } else {
      resultMessage += "you lost";
      displayedResultMessage = document.createElement("h3");
      displayedResultMessage.setAttribute("class", "h3-lost");
      displayedResultMessage.textContent = "YOU LOST";
      result.append(displayedResultMessage);
    }
    alert(resultMessage);
    gameIsRunning = false;
  } else {
    gameIsRunning = false;
  }
});
