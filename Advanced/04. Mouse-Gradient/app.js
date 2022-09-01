function attachGradientEvents() {
  const gradient = document.getElementById("gradient");
  gradient.addEventListener("mousemove", mouseMove);
  const result = document.getElementById("result");

  function mouseMove(ev) {
    result.textContent =
      Math.floor((ev.offsetX / gradient.clientWidth) * 100) + "%";
  }
}
