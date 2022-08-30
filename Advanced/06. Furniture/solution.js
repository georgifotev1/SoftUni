function solve() {
  const [generateBtn, addBtn] = Array.from(document.querySelectorAll("button"));

  generateBtn.addEventListener("click", generate);
  addBtn.addEventListener("click", add);

  function generate() {
    const input = JSON.parse(document.querySelector("textarea").value);
    input.forEach((x) => {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const img = document.createElement("img");
      img.src = x.img;
      td1.appendChild(img);
      tr.appendChild(td1);
      const td2 = document.createElement("td");
      const p1 = document.createElement("p");
      p1.textContent = x.name;
      td2.appendChild(p1);
      tr.appendChild(td2);
      const td3 = document.createElement("td");
      const p2 = document.createElement("p");
      p2.textContent = Number(x.price);
      td3.appendChild(p2);
      tr.appendChild(td3);
      const td4 = document.createElement("td");
      const p3 = document.createElement("p");
      p3.textContent = Number(x.decFactor);
      td4.appendChild(p3);
      tr.appendChild(td4);
      const td5 = document.createElement("td");
      const input = document.createElement("input");
      input.type = "checkbox";
      td5.appendChild(input);
      tr.appendChild(td5);
      document.querySelector("tbody").appendChild(tr);
    });
  }

  function add() {
    const result = document.querySelectorAll("textarea")[1];
    let sum = 0;
    let avg = 0;
    let counter = 0;
    let boughtFurn = [];
    Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(
      (x) => {
        if (x.checked) {
          counter++;
          let name = x.parentElement.parentElement.children[1].textContent;
          let price = Number(
            x.parentElement.parentElement.children[2].textContent
          );
          let decorationFactor = Number(
            x.parentElement.parentElement.children[3].textContent
          );
          sum += price;
          avg += decorationFactor;
          boughtFurn.push(name);
        }
      }
    );
    result.textContent = `Bought furniture: ${boughtFurn.join(
      ", "
    )}\nTotal price: ${sum.toFixed(2)}\nAverage decoration factor: ${
      avg / counter
    }`;
  }
}
