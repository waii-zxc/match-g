document.addEventListener("DOMContentLoaded", function () {
  const bestPlayersContainer = document.querySelector(
    "#bestplayers.bestplayers"
  );
  if (bestPlayersContainer) {
    const totalScore = localStorage.getItem("totalScore");

    if (totalScore) {
      const scoreElement = document.createElement("p");
      scoreElement.textContent = `${totalScore}`;

      bestPlayersContainer.innerHTML = "";
      bestPlayersContainer.appendChild(scoreElement);
    } else {
      console.log("totalScore не найден в localStorage");
    }
  }
});

const avatarElement = document.getElementById("userAvatar");
const userAvatar = localStorage.getItem("userAvatar");
if (userAvatar) {
  avatarElement.setAttribute("src", userAvatar);
} else {
  avatarElement.style.display = "none";
}

const userNameElement = document.getElementById("userName");
const userName = localStorage.getItem("userName");
if (userName) {
  userNameElement.textContent = userName;
} else {
  userNameElement.textContent = "Гость";
}

const userEmailElement = document.getElementById("userEmail");
const userEmail = localStorage.getItem("userEmail");
if (userEmail) {
  userEmailElement.textContent = userEmail;
} else {
  userEmailElement.textContent = "Гость";
}
