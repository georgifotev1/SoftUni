function create(words) {
  let content = document.getElementById("content");

  for (const word of words) {
    const div = document.createElement("div");
    const paragraph = document.createElement("p");
    paragraph.textContent = word;
    paragraph.style.display = "none";
    content.appendChild(div);
    div.appendChild(paragraph);
  }

  Array.from(content.children).forEach((w) =>
    w.addEventListener("click", onClick)
  );

  function onClick(ev) {
    console.log((ev.target.children[0].style.display = ""));
  }
}
