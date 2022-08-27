import { searchListing } from "../api/data.js";
import { html } from "../lib.js";

const listingCard = (car) => html`
  <div class="listing">
    <div class="preview">
      <img src=${car.imageUrl} />
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
      <div class="data-info">
        <h3>Year: ${car.year}</h3>
        <h3>Price: ${car.price} $</h3>
      </div>
      <div class="data-buttons">
        <a href="/catalog/${car._id}" class="button-carDetails">Details</a>
      </div>
    </div>
  </div>
`;

const searchTemplate = (onSubmit, cars) => html` <section id="search-cars">
  <h1>Filter by year</h1>

  <div class="container">
    <input
      id="search-input"
      type="text"
      name="search"
      placeholder="Enter desired production year"
    />
    <button @click=${onSubmit} class="button-list">Search</button>
  </div>

  <h2>Results:</h2>
  <div class="listings">
    ${cars.length == 0
      ? html`<p class="no-cars">No results.</p>`
      : cars.map(listingCard)}
  </div>
</section>`;

export async function searchView(ctx) {
  async function onSubmit() {
    let searchEl = document.getElementById("search-input");
    console.log(searchEl.value);
    const cars = await searchListing(searchEl.value);

    ctx.render(searchTemplate(onSubmit, cars));
  }
  ctx.render(searchTemplate(onSubmit, []));
}
