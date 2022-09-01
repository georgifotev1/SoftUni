function addItem() {
  const inputText = document.getElementById("newItemText");
  const inputValue = document.getElementById("newItemValue");

  const addedOption = document.createElement("option");
  addedOption.textContent = inputText.value;
  addedOption.value = inputValue.value;
  document.getElementById("menu").appendChild(addedOption);

  inputText.value = "";
  inputValue.value = "";
}
