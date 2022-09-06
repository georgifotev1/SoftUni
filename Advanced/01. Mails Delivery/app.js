function solve() {
  const input = {
    recipient: document.getElementById("recipientName"),
    title: document.getElementById("title"),
    message: document.getElementById("message"),
  };

  const addBtn = document.getElementById("add").addEventListener("click", add);
  const resetBtn = document
    .getElementById("reset")
    .addEventListener("click", reset);

  function add(ev) {
    ev.preventDefault();
    if (
      input.recipient.value == "" ||
      input.title.value == "" ||
      input.message.value == ""
    ) {
      return;
    }
    const listMails = document.getElementById("list");
    const li = document.createElement("li");
    li.innerHTML = `<h4>Title: ${input.title.value}</h4>
      <h4>Recipient Name: ${input.recipient.value}</h4>
      <span>${input.message.value}</span>
      <div id="list-action">
          <button type="submit" id="send">Send</button>
          <button type="submit" id="delete">Delete</button>
      </div>`;
    listMails.appendChild(li);
    let curName = input.recipient.value;
    let curTitle = input.title.value;
    input.recipient.value = "";
    input.title.value = "";
    input.message.value = "";
    document.getElementById("send").addEventListener("click", send);
    document.getElementById("delete").addEventListener("click", onDelete);

    function send() {
      let sentList = document.querySelector(".sent-list");
      li.remove();
      sentList.innerHTML += `<li>
        <span>To: ${curName}</span>
        <span>Title: ${curTitle}</span>
        <div class="btn">
            <button type="submit" class="delete">Delete</button>
        </div>
          </li>`;
      document.querySelector(".delete").addEventListener("click", onDelete);
    }
    function onDelete(ev) {
      ev.target.parentElement.parentElement.remove();
      let deleteList = document.querySelector(".delete-list");
      deleteList.innerHTML += `<li>
        <span>To: ${curName}</span>
        <span>Title: ${curTitle}</span>
    </li>`;
    }
  }
  function reset(ev) {
    ev.preventDefault();
    input.recipient.value = "";
    input.title.value = "";
    input.message.value = "";
  }
}
solve();
