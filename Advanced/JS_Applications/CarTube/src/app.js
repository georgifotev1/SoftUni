import { createListing } from "./api/data.js";
import { logout } from "./api/users.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { catalogView } from "./views/catalog.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { myListingsView } from "./views/myListings.js";
import { registerView } from "./views/register.js";
import { searchView } from "./views/search.js";

const main = document.getElementById("site-content");
document.getElementById("logoutBtn").addEventListener("click", onLogout);

page(decorateContext);

page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/catalog", catalogView);
page("/create", createView);
page("/catalog/:id", detailsView);
page("/edit/:id", editView);
page("/mylistings", myListingsView);
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
  const userLinks = document.getElementById("profile");
  const guestLinks = document.getElementById("guest");

  if (userData) {
    userLinks.style.display = "inline-block";
    guestLinks.style.display = "none";
    document.querySelector(
      "#profile a"
    ).textContent = `Welcome ${userData.username}`;
  } else {
    userLinks.style.display = "none";
    guestLinks.style.display = "inline-block";
  }
}

function onLogout() {
  logout();
  updateNav();
}
