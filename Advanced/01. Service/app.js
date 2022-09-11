window.addEventListener("load", solve);

function solve() {
  let selectElementArea = document.getElementById("type-product");
  let descriptionArea = document.getElementById("description");
  let clientNameArea = document.getElementById("client-name");
  let clientPhoneArea = document.getElementById("client-phone");
  let sendFormBtn = document.querySelector("#right form button");
  let clearBtn = document.querySelector(".clear-btn");
  sendFormBtn.addEventListener("click", sendForm);
  clearBtn.addEventListener("click", clear);

  let receivedOrdersArea = document.getElementById("received-orders");
  let completedOrdersArea = document.getElementById("completed-orders");

  function sendForm(ev) {
    ev.preventDefault();

    let selectElement = selectElementArea.value;
    let description = descriptionArea.value;
    let clientName = clientNameArea.value;
    let clientPhone = clientPhoneArea.value;

    descriptionArea.value = "";
    clientNameArea.value = "";
    clientPhoneArea.value = "";

    if (description == "" || clientName == "" || clientPhone == "") {
      return;
    }

    let div = createElement("div");
    div.className = "container";
    let h2 = createElement("h2", `Product type for repair: ${selectElement}`);
    let h3 = createElement(
      "h3",
      `Client information: ${clientName}, ${clientPhone}`
    );
    let h4 = createElement("h4", `Description of the problem: ${description}`);
    let startBtn = createElement("button", "Start repair");
    startBtn.className = "start-btn";
    let finishBtn = createElement("button", "Finish repair");
    finishBtn.className = "finish-btn";
    finishBtn.disabled = true;
    startBtn.addEventListener("click", startRepair);
    finishBtn.addEventListener("click", finishRepair);

    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(h4);
    div.appendChild(startBtn);
    div.appendChild(finishBtn);
    receivedOrdersArea.appendChild(div);

    function startRepair() {
      startBtn.disabled = true;
      finishBtn.disabled = false;
    }

    function finishRepair() {
      receivedOrdersArea.removeChild(div);
      div.removeChild(startBtn);
      div.removeChild(finishBtn);
      completedOrdersArea.appendChild(div);
    }
  }

  function createElement(type, content) {
    let element = document.createElement(type);
    element.textContent = content;
    return element;
  }

  function clear(ev) {
    Array.from(ev.target.parentElement.querySelectorAll(".container")).forEach(
      (el) => el.remove()
    );
  }
}
