const display = document.querySelector(".display");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
let timer;
let seconds = 0;
let isRunning = false;

var cardList = ["eagle", "elephant", "lion", "penguin", "tiger", "wolf"];
var cardSet;
var board = [];
var rows = 3;
var columns = 4;
var card1Selected;
var card2Selected;

function displayTime() {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  display.textContent = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startTimer() {
  if (!isRunning) {
    timer = setInterval(() => {
      seconds++;
      displayTime();
    }, 1000);
    isRunning = true;
    stopBtn.style.visibility = "visible";
    startBtn.style.visibility = "hidden";
    shuffleCards();
    startGame();
  }
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  stopBtn.style.visibility = "hidden";
  startBtn.style.visibility = "visible";
  location.reload();
}

function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  displayTime();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
stopBtn.addEventListener("click", resetTimer);
document.getElementById("stopTimer").addEventListener("click", function () {
  location.reload();
});

//////////MATCH GAME/////////////

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
  let boardElement = document.getElementById("board");

  for (let r = 0; r < rows; r++) {
    let row = document.createElement("tr");
    for (let c = 0; c < columns; c++) {
      let cardImg = cardSet.pop();
      let cell = document.createElement("td");

      let card = document.createElement("img");
      card.id = r.toString() + "-" + c.toString();
      card.src = "back.jpg";
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
}

function hideCards() {
  for (r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(r.toString() + "-" + c.toString());
      card.src = "back.jpg";
    }
  }
}

function selectCard() {
  if (this.src.includes("back")) {
    if (!card1Selected) {
      card1Selected = this;

      let coords = card1Selected.id.split("-"); //"0-1 -> ["0", "1"]
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card1Selected.src = board[r * columns + c] + ".jpg";
      card1Selected.classList.add("flipped"); // Добавить класс flipped для запуска анимации
    } else if (!card2Selected && this !== card1Selected) {
      card2Selected = this;

      let coords = card2Selected.id.split("-");
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card2Selected.src = board[r * columns + c] + ".jpg";
      card2Selected.classList.add("flipped"); // Добавить класс flipped для запуска анимации
      setTimeout(update, 1500);
    }
  }
}

function update() {
  // Сохраняем значения карт
  let card1 = card1Selected;
  let card2 = card2Selected;

  // Если карты не совпадают, окрашиваем их в красный цвет перед скрытием
  if (card1.src !== card2.src) {
    card1.style.border = "3.5px solid red";
    card2.style.border = "3.5px solid red";

    setTimeout(() => {
      card1.src = "back.jpg";
      card2.src = "back.jpg";

      // Убираем обводку после скрытия карт
      setTimeout(() => {
        card1.style.border = "none";
        card2.style.border = "none";
      }, 1);
    }, 500);
  } else {
    // Если карты совпадают, окрашиваем их в зеленый цвет перед скрытием
    card1.style.border = "3.5px solid green";
    card2.style.border = "3.5px solid green";
  }
  setTimeout(() => {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }, 500);

  card1Selected = null;
  card2Selected = null;
}
