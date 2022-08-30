function lockedProfile() {
  const arr = Array.from(document.querySelectorAll("button"));
  arr.forEach((b) => b.addEventListener("click", onClick));

  function onClick(event) {
    let profile = event.target.parentElement;
    let isUnlocked = profile.querySelector(
      'input[type="radio"][value="unlock"]'
    ).checked;

    if (isUnlocked) {
      let div = profile.querySelector("div");

      if (event.target.textContent == "Show more") {
        div.style.display = "block";
        event.target.textContent = "Hide it";
      } else {
        div.style.display = "none";
        event.target.textContent = "Show more";
      }
    }
  }
}
