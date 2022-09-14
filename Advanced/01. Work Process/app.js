function solve() {
  const input = {
    firstName: document.getElementById("fname"),
    lastName: document.getElementById("lname"),
    email: document.getElementById("email"),
    birthDate: document.getElementById("birth"),
    position: document.getElementById("position"),
    salary: document.getElementById("salary"),
  };

  document.getElementById("add-worker").addEventListener("click", addWorker);
  const tableContent = document.getElementById("tbody");
  let sum = 0;

  function addWorker(ev) {
    ev.preventDefault();

    if (
      input.firstName.value == "" ||
      input.lastName.value == "" ||
      input.email.value == "" ||
      input.birthDate.value == "" ||
      input.position.value == "" ||
      input.salary.value == ""
    ) {
      return;
    }

    let firstName = input.firstName.value;
    let lastName = input.lastName.value;
    let email = input.email.value;
    let birthDate = input.birthDate.value;
    let position = input.position.value;
    let salary = input.salary.value;
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("birth").value = "";
    document.getElementById("position").value = "";
    document.getElementById("salary").value = "";
    sum += Number(salary);

    let tr = createElement("tr");
    tr.appendChild(createElement("td", `${firstName}`));
    tr.appendChild(createElement("td", `${lastName}`));
    tr.appendChild(createElement("td", `${email}`));
    tr.appendChild(createElement("td", `${birthDate}`));
    tr.appendChild(createElement("td", `${position}`));
    tr.appendChild(createElement("td", `${salary}`));
    let btnTd = createElement("td");
    const firedBtn = createElement("button", "Fired");
    firedBtn.className = "fired";
    const editBtn = createElement("button", "Edit");
    editBtn.className = "edit";
    btnTd.appendChild(firedBtn);
    btnTd.appendChild(editBtn);
    tr.appendChild(btnTd);
    tableContent.appendChild(tr);
    document.getElementById("sum").textContent = `${sum.toFixed(2)}`;

    firedBtn.addEventListener("click", firedFn);
    editBtn.addEventListener("click", editFn);

    function editFn() {
      tr.remove();
      document.getElementById("fname").value = firstName;
      document.getElementById("lname").value = lastName;
      document.getElementById("email").value = email;
      document.getElementById("birth").value = birthDate;
      document.getElementById("position").value = position;
      document.getElementById("salary").value = salary;
      sum -= Number(salary);
      document.getElementById("sum").textContent = `${sum.toFixed(2)}`;
    }

    function firedFn() {
      tr.remove();
      sum -= Number(salary);
      document.getElementById("sum").textContent = `${sum.toFixed(2)}`;
    }
  }

  function createElement(type, content) {
    let element = document.createElement(type);
    element.textContent = content;
    return element;
  }
}
solve();
