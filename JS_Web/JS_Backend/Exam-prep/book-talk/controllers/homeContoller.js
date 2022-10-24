const homeController = require("express").Router();
const { getAll } = require("../services/bookService");

//TODO replace with real controller !!
homeController.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
    user: req.user,
  });
});

homeController.get("/catalog", async (req, res) => {
  const books = await getAll();
  res.render("catalog", {
    title: "Catalog",
    books,
  });
});

module.exports = homeController;
