window.addEventListener("load", solve);

function solve() {
  const input = {
    title: document.getElementById("post-title"),
    category: document.getElementById("post-category"),
    content: document.getElementById("post-content"),
  };
  const lists = {
    review: document.getElementById("review-list"),
    published: document.getElementById("published-list"),
  };

  document.getElementById("publish-btn").addEventListener("click", publish);
  document.getElementById("clear-btn").addEventListener("click", clear);

  function publish(ev) {
    ev.preventDefault();
    let title = input.title;
    let category = input.category;
    let content = input.content;
    if (title.value == "" || category.value == "" || content.value == "") {
      return;
    }
    let li = createElement("li");
    li.setAttribute("class", "rpost");
    let article = createElement("article", "", li);
    let titleText = createElement("h4", `${title.value}`, article);
    let categoryText = createElement(
      "p",
      `Category: ${category.value}`,
      article
    );
    let contentText = createElement("p", `Content: ${content.value}`, article);
    const editBtn = createElement("button", "Edit", li);
    editBtn.setAttribute("class", "action-btn edit");
    editBtn.addEventListener("click", edit);
    const approveBtn = createElement("button", "Approve", li);
    approveBtn.setAttribute("class", "action-btn approve");
    approveBtn.addEventListener("click", approve);
    lists.review.appendChild(li);

    clearFields(title, category, content);

    function edit() {
      title.value = titleText.textContent;
      category.value = categoryText.textContent;
      content.value = contentText.textContent;
      li.remove();
    }

    function approve() {
      li.remove();
      editBtn.remove();
      approveBtn.remove();
      lists.published.appendChild(li);
    }
  }

  function clear() {
    lists.published.innerHTML = "";
  }

  function createElement(type, content, parent) {
    const element = document.createElement(type);
    element.textContent = content;

    if (parent) {
      parent.appendChild(element);
    }
    return element;
  }

  function clearFields(p1, p2, p3) {
    p1.value = "";
    p2.value = "";
    p3.value = "";
  }
}
