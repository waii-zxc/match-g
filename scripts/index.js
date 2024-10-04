const modal = document.getElementById("modal");
const registerLink = document.getElementById("register-link");
const closeBtn = document.querySelector(".close");
const confirmBtn = document.querySelector(".confirm");
const cancelBtn = document.querySelector(".cancel");

registerLink.addEventListener("click", function (event) {
  event.preventDefault(); // Предотвращаем переход по ссылке
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

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

  if (allFieldsFilled) {
    modal.style.display = "none";
  } else {
    alert("Пожалуйста, введите все данные перед отправкой.");
  }
});

cancelBtn.addEventListener("click", function () {
  modal.style.display = "none";
});
