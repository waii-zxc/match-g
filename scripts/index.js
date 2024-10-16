function openModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "flex";
  } else {
    console.error("Element with id 'modal' not found.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const cornerDisplay = document.getElementById("cornerDisplay");
  if (cornerDisplay) {
    cornerDisplay.innerText = "";
  }

  const logcont = document.getElementById("logcont");
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "LOGOUT";
  logcont.appendChild(logoutBtn);

  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAvatar");
    localStorage.removeItem("totalScore");
    location.reload();

    // document.getElementById("cornerDisplay").innerText = "";
    document.getElementById("selectedAvatar").src = "";
    document.getElementById("selectedAvatar").style.opacity = "0";
    document.getElementById("register-link").style.display = "block";
    document.getElementById("logcont").style.opacity = "0";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const userAvatar = localStorage.getItem("userAvatar");

  if (userName && userEmail && userAvatar) {
    // document.getElementById("cornerDisplay").innerText = userName;
    document.getElementById("selectedAvatar").src = userAvatar;
    document.getElementById("selectedAvatar").style.opacity = "1";
    document.getElementById("logcont").style.opacity = "1";
    document.getElementById("register-link").style.display = "none";
    document.getElementById("logcont").querySelector("button").style.cursor =
      "pointer";
  } else {
    document.getElementById("logcont").style.opacity = "0";
    document.getElementById("logcont").querySelector("button").style.cursor =
      "default";
  }

  const indexElement = document.getElementById("indexElementId");
  if (indexElement) {
    indexElement.addEventListener("click", function () {
      // Обработчик клика для indexElement
    });
  }
});

const modal = document.getElementById("modal");
const registerLink = document.getElementById("register-link");
const closeBtn = document.querySelector(".close");
const confirmBtn = document.querySelector(".confirm");
const cancelBtn = document.querySelector(".cancel");

registerLink.addEventListener("click", function (event) {
  event.preventDefault(); // Предотвращаем переход по ссылке
  modal.style.display = "flex";
});

if (closeBtn) {
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none"; // Предполагается, что modal доступен на этой странице
  });
} else {
  console.error("Element with class 'close' not found.");
}

confirmBtn.addEventListener("click", function () {
  const inputFields = document.querySelectorAll("#modal input");
  let allFieldsFilled = true;

  inputFields.forEach(function (input) {
    if (input.value.trim() === "") {
      allFieldsFilled = false;
      input.style.border = "2px solid red";
    } else {
      input.style.border = "";
    }
  });
});

cancelBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

function previewAvatar(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("avatarImage").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function selectAvatar() {
  document.getElementById("avatarInput").click();
}

function registerUser() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const selectedAvatar = document.getElementById("avatarImage").src;

  if (
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    email.trim() === ""
  ) {
    alert("Please enter all fields: First Name, Last Name, and Email.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailRegex)) {
    alert("Please enter a valid email address.");
    return;
  }

  const fullName = `${firstName} ${lastName}`;
  localStorage.setItem("userName", fullName);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userAvatar", selectedAvatar);

  const displayedAvatar = document.getElementById("selectedAvatar");
  displayedAvatar.src = selectedAvatar;
  displayedAvatar.style.opacity = "1";
  document.getElementById("register-link").style.display = "none";

  document.getElementById("logcont").style.opacity = "1";

  closeModal();
}

function closeModal() {
  modal.style.display = "none";
}
