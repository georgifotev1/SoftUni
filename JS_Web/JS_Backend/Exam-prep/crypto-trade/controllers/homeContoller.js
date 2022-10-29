const { getAll } = require("../services/cryptoServices");

const homeController = require("express").Router();

homeController.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
    user: req.user,
  });
});

homeController.get("/catalog", async (req, res) => {
  const cryptos = await getAll();
  res.render("catalog", {
    title: "Catalog",
    cryptos,
    search: req.query.search,
  });
});

module.exports = homeController;
