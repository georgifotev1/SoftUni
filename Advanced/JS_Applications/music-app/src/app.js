import { logout } from "./api/users.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { catalogView } from "./views/catalog.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { searchView } from "./views/search.js";

const main = document.getElementById("main-content");
document.getElementById("logoutBtn").addEventListener("click", onLogout);

page(decorateContext);
page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/catalog", catalogView);
page("/create", createView);
page("/catalog/:id", detailsView);
page("/edit/:id", editView);
page("/search", searchView);
updateNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
  ctx.updateNav = updateNav;
  next();
}

function renderMain(templateResult) {
  render(templateResult, main);
}

function updateNav() {
  const userData = getUserData();
  const userLinks = Array.from(document.querySelectorAll(".user"));
  const guestLinks = Array.from(document.querySelectorAll(".guest"));
  if (userData) {
    userLinks.map((el) => (el.style.display = "inline-block"));
    guestLinks.map((el) => (el.style.display = "none"));
  } else {
    userLinks.map((el) => (el.style.display = "none"));
    guestLinks.map((el) => (el.style.display = "inline-block"));
  }
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
