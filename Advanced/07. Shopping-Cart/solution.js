function solve() {
  const result = document.querySelector("textarea");
  Array.from(document.querySelectorAll(".add-product")).forEach((x) =>
    x.addEventListener("click", onAdd)
  );
  document.querySelector(".checkout").addEventListener("click", onCheckout);
  const prices = {
    Bread: 0.8,
    Milk: 1.09,
    Tomatoes: 0.99,
  };
  let text = "";
  let list = [];
  let finalPrice = 0;

  function onAdd(ev) {
    const current =
      ev.target.parentElement.parentElement.querySelector(".product-details")
        .children[0].textContent;
    if (list.includes(current) == false) {
      list.push(current);
    }
    let price = prices[current];
    finalPrice += price;
    text += `Added ${current} for ${price.toFixed(2)} to the cart.\n`;
    result.textContent = text;
  }
  function onCheckout() {
    result.textContent += `You bought ${list.join(
      ", "
    )} for ${finalPrice.toFixed(2)}.`;
    Array.from(document.querySelectorAll("button")).forEach(
      (x) => (x.disabled = true)
    );
  }
}
