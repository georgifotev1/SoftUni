function encodeAndDecodeMessages() {
  const textAreas = document.querySelectorAll("textarea");
  const buttons = document.querySelectorAll("button");

  buttons[0].addEventListener("click", encode);
  buttons[1].addEventListener("click", decode);

  function encode() {
    let enCodedText = "";
    textAreas[0].value
      .split("")
      .forEach((x) => (enCodedText += String.fromCharCode(x.charCodeAt() + 1)));
    textAreas[0].value = "";
    textAreas[1].value = enCodedText;
  }

  function decode() {
    let deCodedText = "";
    textAreas[1].value
      .split("")
      .forEach((x) => (deCodedText += String.fromCharCode(x.charCodeAt() - 1)));
    textAreas[1].value = deCodedText;
  }
}
