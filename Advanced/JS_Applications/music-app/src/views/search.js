import { searchAlbum } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const albumCard = (album) => html`<div class="search-result">
  <div class="card-box">
    <img src=${album.imgUrl} />
    <div>
      <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.genre}</p>
        <p class="price">Price: ${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
      </div>
      ${getUserData()
        ? html`<div class="btn-group">
            <a href="/catalog/${album._id}" id="details">Details</a>
          </div>`
        : null}
    </div>
  </div>
</div>`;

const searchTemplate = (onSubmit, albums) => html` <section id="searchPage">
  <h1>Search by Name</h1>

  <div class="search">
    <input
      id="search-input"
      type="text"
      name="search"
      placeholder="Enter desired albums's name"
    />
    <button @click=${onSubmit} class="button-list">Search</button>
  </div>

  <h2>Results:</h2>


  ${
    albums.length == 0
      ? html`<p class="no-result">No result.</p>`
      : albums.map(albumCard)
  }
  
  </div>
</section>`;

export async function searchView(ctx) {
  async function onSubmit(event) {
    let searchEl = document.getElementById("search-input");
    const albums = await searchAlbum(searchEl.value);
    ctx.render(searchTemplate(onSubmit, albums));
  }
  ctx.render(searchTemplate(onSubmit, []));
}
