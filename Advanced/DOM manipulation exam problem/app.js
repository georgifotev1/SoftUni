window.addEventListener("load", solve);

function solve() {
  let inputMake = document.getElementById("make");
  let inputModel = document.getElementById("model");
  let inputYear = document.getElementById("year");
  let inputFuel = document.getElementById("fuel");
  let inputPrice = document.getElementById("original-cost");
  let inputSellingPrice = document.getElementById("selling-price");

  let tableBody = document.getElementById("table-body");
  let soldCars = document.getElementById("cars-list");
  let profitMade = document.getElementById("profit");
  let totalProfit = 0;

  const publishBtn = document
    .getElementById("publish")
    .addEventListener("click", onPublish);

  function onPublish(ev) {
    ev.preventDefault();

    if (
      inputMake.value == "" ||
      inputModel.value == "" ||
      inputYear.value == "" ||
      inputFuel.value == "" ||
      inputPrice.value == "" ||
      inputSellingPrice.value == "" ||
      Number(inputPrice.value) > Number(inputSellingPrice.value)
    ) {
      return;
    }

    let make = inputMake.value;
    let model = inputModel.value;
    let year = inputYear.value;
    let fuel = inputFuel.value;
    let price = inputPrice.value;
    let sellingPrice = inputSellingPrice.value;

    inputMake.value = "";
    inputModel.value = "";
    inputYear.value = "";
    inputFuel.value = "";
    inputPrice.value = "";
    inputSellingPrice.value = "";

    let tr = createElement("tr");
    tr.className = "row";
    tr.appendChild(createElement("td", `${make}`));
    tr.appendChild(createElement("td", `${model}`));
    tr.appendChild(createElement("td", `${year}`));
    tr.appendChild(createElement("td", `${fuel}`));
    tr.appendChild(createElement("td", `${price}`));
    tr.appendChild(createElement("td", `${sellingPrice}`));
    let btnTd = createElement("td");

    const editBtn = createElement("button", "Edit");
    editBtn.className = "action-btn edit";
    const sellBtn = createElement("button", "Sell");
    sellBtn.className = "action-btn sell";
    btnTd.appendChild(editBtn);
    btnTd.appendChild(sellBtn);
    tr.appendChild(btnTd);
    tableBody.appendChild(tr);

    editBtn.addEventListener("click", onEdit);
    sellBtn.addEventListener("click", onSell);

    function onEdit() {
      inputMake.value = `${make}`;
      inputModel.value = `${model}`;
      inputYear.value = `${year}`;
      inputFuel.value = `${fuel}`;
      inputPrice.value = `${price}`;
      inputSellingPrice.value = `${sellingPrice}`;
      tr.remove();
    }
    function onSell() {
      tr.remove();
      let profit = Number(sellingPrice) - Number(price);
      totalProfit += profit;
      let li = createElement("li");
      li.className = "each-list";
      li.appendChild(createElement("span", `${make} ${model}`));
      li.appendChild(createElement("span", `${year}`));
      li.appendChild(createElement("span", `${profit}`));
      soldCars.appendChild(li);
      profitMade.textContent = `${totalProfit.toFixed(2)}`;
    }
  }

  function createElement(type, content) {
    let element = document.createElement(type);
    element.textContent = content;
    return element;
  }
}
