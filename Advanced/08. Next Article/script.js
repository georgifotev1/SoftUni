function getArticleGenerator(articles) {
  let content = document.getElementById("content");
  return function () {
    const article = articles.shift();
    if (article != undefined) {
      const element = document.createElement("article");
      element.textContent = article;
      content.appendChild(element);
    }
  };
}
