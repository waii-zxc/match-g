const selectElement = document.querySelector(".slct");

selectElement.addEventListener("change", function () {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const selectedValue = selectedOption.value;
  const customValue = selectedOption.getAttribute("data-value");

  localStorage.setItem("selectedDifficulty", selectedValue);
  localStorage.setItem("customDifficultyValue", customValue);
});
