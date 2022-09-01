function addItem() {
  let text = document.getElementById("newItemText");
  const li = document.createElement("li");
  li.textContent = text.value;

  const delButton = document.createElement("a");
  delButton.href = "#";
  delButton.textContent = "[Delete]";
  li.appendChild(delButton);
  delButton.addEventListener("click", onDelete);

  document.getElementById("items").appendChild(li);
  text.value = " ";
  function onDelete(event) {
    event.target.parentElement.remove();
  }
}
