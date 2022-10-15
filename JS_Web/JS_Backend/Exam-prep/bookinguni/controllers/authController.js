const { register, login } = require("../services/userService");
const { parseError } = require("../util/parser");
const validator = require("validator");

const authController = require("express").Router();

authController.get("/register", (req, res) => {
  // TODO replace with actual view by assignment
  res.render("register", {
    title: "Register Page",
  });
});

authController.post("/register", async (req, res) => {
  try {
    if (validator.isEmail(req.body.email) == false) {
      throw new Error("Inalid email");
    }
    if (req.body.username == "" || req.body.password == "") {
      throw new Error("All fields are required");
    }
    if (req.body.password.length < 5) {
      throw new Error("Passwords must be at least 5 characters");
    }
    if (req.body.password != req.body.repass) {
      throw new Error("Passwords don`t match");
    }
    const token = await register(
      req.body.email,
      req.body.username,
      req.body.password
    );
    // TODO check assignment if register creates session
    res.cookie("token", token);
    res.redirect("/"); // TODO replace with redirect by assignment
  } catch (error) {
    const errors = parseError(error);
    // TODO add error display to actual template from assignment
    res.render("register", {
      title: "Register Page",
      errors,
      body: {
        email: req.body.email,
        username: req.body.username,
      },
    });
  }
});

authController.get("/login", (req, res) => {
  // TODO replace with actual view by assignment
  res.render("login", {
    title: "Login Page",
  });
});

authController.post("/login", async (req, res) => {
  try {
    const token = await login(req.body.email, req.body.password);

    res.cookie("token", token);
    res.redirect("/"); // TODO replace with redirect by assignment
  } catch (error) {
    const errors = parseError(error);
    res.render("login", {
      title: "Login Page",
      errors,
      body: {
        email: req.body.email,
      },
    });
  }
});

authController.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = authController;
