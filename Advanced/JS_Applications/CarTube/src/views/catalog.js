import { html } from "../lib.js";
import { getAllCarListings } from "../api/data.js";

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

const catalogTemplate = (cars) => html` <section id="car-listings">
  <h1>Car Listings</h1>
  <div class="listings">
    ${cars.length == 0
      ? html`<p class="no-cars">No cars in database.</p>`
      : cars.map(listingCard)}
  </div>
</section>`;

export async function catalogView(ctx) {
  const cars = await getAllCarListings();
  ctx.render(catalogTemplate(cars));
}
