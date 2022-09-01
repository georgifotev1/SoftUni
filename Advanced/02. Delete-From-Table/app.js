function deleteByEmail() {
  const content = Array.from(document.querySelectorAll("tbody tr"));
  let result = document.getElementById("result");
  const text = document.querySelector('input[name="email"]');

  for (let row of content) {
    if (text.value == row.children[1].textContent) {
      row.parentElement.removeChild(row);
      result.textContent = "Deleted.";
    } else {
      result.textContent = "Not found.";
    }
  }
}
