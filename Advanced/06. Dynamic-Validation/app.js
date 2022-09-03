function validate() {
  const input = document.getElementById("email");
  input.addEventListener("change", onChange);
  const pattern = /[a-z]+@[a-z]+\.[a-z]+/g;

  function onChange(ev) {
    ev.target.className = "error";

    if (pattern.exec(ev.target.value) != null) {
      ev.target.className = "";
    }
  }
}
