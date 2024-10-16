const display = document.querySelector(".display");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");

let timer;
let isRunning = false;
let numPairs = 0;
let numSeries = 0;
let remainingTime = 0;
let errors = 0;
let seriesBonuses = 0;
let totalScore = 0;

var cardList = ["eagle", "elephant", "lion", "penguin", "tiger", "wolf"];
var cardSet;
var board = [];
var rows = 3;
var columns = 4;
var card1Selected;
var card2Selected;

const selectedDifficulty = localStorage.getItem("selectedDifficulty");
const customDifficultyValue = localStorage.getItem("customDifficultyValue");

function updateBoardSize(difficulty) {
  let cardWidth, cardHeight;

  switch (difficulty) {
    case "ez":
      cardList = ["eagle", "elephant", "lion", "penguin", "tiger", "wolf"];
      rows = 3;
      columns = 4;
      break;
    case "normal":
      cardList = [
        "eagle",
        "elephant",
        "lion",
        "penguin",
        "tiger",
        "wolf",
        "eagle",
        "elephant",
      ];
      rows = 4;
      columns = 4;
      break;
    case "hard":
      cardWidth = "80px"; // Ширина карты для сложной сложности
      cardHeight = "80px";
      cardList = [
        "eagle",
        "elephant",
        "lion",
        "penguin",
        "tiger",
        "wolf",
        "eagle",
        "elephant",
        "lion",
        "tiger",
        "wolf",
        "penguin",
      ];
      rows = 4;
      columns = 6;

      break;
    default:
      rows = 3;
      columns = 4;
  }
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.width = cardWidth;
    card.style.height = cardHeight;
  });
}

//updateBoardSize с выбранной сложностью
updateBoardSize(selectedDifficulty);

function displayTime() {
  const minutes = Math.floor(remainingTime / 60);
  const secs = remainingTime % 60;
  display.textContent = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
function startTimer() {
  if (!isRunning) {
    remainingTime = customDifficultyValue;
    displayTime();

    timer = setInterval(() => {
      remainingTime--;
      displayTime();
      if (remainingTime <= 0) {
        alert("Time is up!!!");
        clearInterval(timer);
        isRunning = false;
        stopBtn.style.visibility = "hidden";
        startBtn.style.visibility = "visible";
        location.reload();
      }
    }, 1000);

    isRunning = true;
    stopBtn.style.visibility = "visible";
    startBtn.style.visibility = "hidden";

    shuffleCards();
    startGame();
  }
}

function stopTimer() {
  localStorage.setItem("lastStoppedSeconds", remainingTime);
  clearInterval(timer);
  isRunning = false;
  stopBtn.style.visibility = "hidden";
  startBtn.style.visibility = "visible";
  location.reload();
}

function resetTimer() {
  clearInterval(timer);
  remainingTime = 0;
  displayTime();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
stopBtn.addEventListener("click", resetTimer);
document.getElementById("stopTimer").addEventListener("click", function () {
  location.reload();
});
let selectedTheme = localStorage.getItem("selectedTheme") || "standart";

function saveSelectedTheme() {
  const selectedTheme = document.getElementById("selectedTheme").value;
  localStorage.setItem("selectedTheme", selectedTheme);
  location.reload();
}
function shuffleCards() {
  cardSet = cardList.concat(cardList);
  // Перемешиваем карты
  for (let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length); // Получаем случайный индекс
    // Обмен значениями
    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }
  console.log(cardSet);
}

function startGame() {
  let lastStoppedSeconds = localStorage.getItem("lastStoppedSeconds");
  let boardElement = document.getElementById("board");
  let selectedTheme = localStorage.getItem("selectedTheme") || "standart";

  let themeImages = {
    standart: "back.jpg",
    pokemon: "pokemon.jpg",
    spiderman: "spiderman.jpg",
  };

  for (let r = 0; r < rows; r++) {
    let row = document.createElement("tr");
    row.classList.add("custom-row");
    for (let c = 0; c < columns; c++) {
      let cardImg = cardSet.pop();
      let cell = document.createElement("td");
      cell.classList.add("custom-cell");

      let card = document.createElement("img");
      card.id = r.toString() + "-" + c.toString();
      card.src = themeImages[selectedTheme]; // Устанавливаем изображение в зависимости от выбранной темы
      card.src = cardImg + ".jpg";
      card.classList.add("card");
      cell.appendChild(card);
      row.appendChild(cell);
      board.push(cardImg);
      card.addEventListener("click", selectCard);
    }
    boardElement.appendChild(row);
  }
  console.log(board);
  setTimeout(hideCards, 1500);

  // Сохраняем игровое поле в localStorage
  localStorage.setItem("savedBoard", JSON.stringify(board));
}

function hideCards() {
  let selectedTheme = localStorage.getItem("selectedTheme") || "standart";
  let themeImages = {
    standart: "back.jpg",
    pokemon: "pokemon.jpg",
    spiderman: "spiderman.jpg",
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(r.toString() + "-" + c.toString());
      card.src = themeImages[selectedTheme];
    }
  }
}

function selectCard() {
  let selectedTheme = localStorage.getItem("selectedTheme") || "standart";
  let themeImages = {
    standart: "back.jpg",
    pokemon: "pokemon.jpg",
    spiderman: "spiderman.jpg",
  };

  if (this.src.includes(themeImages[selectedTheme])) {
    if (!card1Selected) {
      card1Selected = this;

      let coords = card1Selected.id.split("-");
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card1Selected.src = board[r * columns + c] + ".jpg";
      card1Selected.classList.add("flipped");
    } else if (!card2Selected && this !== card1Selected) {
      card2Selected = this;

      let coords = card2Selected.id.split("-");
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card2Selected.src = board[r * columns + c] + ".jpg";
      card2Selected.classList.add("flipped");
      setTimeout(update, 1500);
    }
  }
}

function update() {
  let selectedTheme = localStorage.getItem("selectedTheme") || "standart";
  let themeImages = {
    standart: "back.jpg",
    pokemon: "pokemon.jpg",
    spiderman: "spiderman.jpg",
  };

  let card1Src = themeImages[selectedTheme];
  let card2Src = themeImages[selectedTheme];

  let card1 = card1Selected;
  let card2 = card2Selected;

  if (card1.src !== card2.src) {
    card1.style.border = "3.5px solid red";
    card2.style.border = "3.5px solid red";
    errors++;
    numSeries = 0;
    setTimeout(() => {
      card1.src = card1Src;
      card2.src = card2Src;

      setTimeout(() => {
        card1.style.border = "3.5px solid white";
        card2.style.border = "3.5px solid white";
      }, 1);
    }, 500);
  } else {
    card1.style.border = "3.5px solid green";
    card2.style.border = "3.5px solid green";
    numPairs++;
    numSeries++;
  }
  setTimeout(() => {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }, 500);

  card1Selected = null;
  card2Selected = null;
  checkGameEnd();
}

function checkGameEnd() {
  let selectedTheme = localStorage.getItem("selectedTheme") || "standart";
  let themeImages = {
    standart: "back.jpg",
    pokemon: "pokemon.jpg",
    spiderman: "spiderman.jpg",
  };

  if (
    document.querySelectorAll('.card[src="' + themeImages[selectedTheme] + '"]')
      .length === 0
  ) {
    clearInterval(timer);
    showModal();
  }
}

function showModal() {
  const score = calculateScore();

  const modal = document.createElement("div");
  modal.classList.add("game-over-modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const selectedDifficulty = localStorage.getItem("selectedDifficulty");
  const customDifficultyValue = localStorage.getItem("customDifficultyValue");
  const message = document.createElement("p");
  message.textContent = `Congratulations! Your score is ${score}. Difficulty ⮕ ${selectedDifficulty}`;

  const restartButton = document.createElement("button");
  restartButton.textContent = "Close";
  restartButton.addEventListener("click", function () {
    modal.remove();
    location.reload();
  });

  modalContent.appendChild(message);
  modalContent.appendChild(restartButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// Восстановление данных из localStorage при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  let lastStoppedSeconds = localStorage.getItem("lastStoppedSeconds");
  if (lastStoppedSeconds) {
    seconds = parseInt(lastStoppedSeconds, 10);
    displayTime();
  }

  let savedBoard = localStorage.getItem("savedBoard");
  if (savedBoard) {
    board = JSON.parse(savedBoard);
  }
});

function calculateScore() {
  if (numSeries >= 2) {
    seriesBonuses = 50 * (numSeries - 1);
  }
  totalScore = numPairs * 100 + remainingTime * 10 - errors * 5 + seriesBonuses;
  if (selectedDifficulty === "hard") {
    totalScore += 9000;
  }
  if (selectedDifficulty === "normal") {
    totalScore += 5000;
  }

  // Сохраняем общий счет в localStorage
  localStorage.setItem("totalScore", totalScore);

  return totalScore;
}
