import { del } from "../api/api.js";
import {
  deleteBook,
  getBooksById,
  getLikesByBookId,
  getMyLikesByBookId,
  likeBook,
} from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (
  book,
  isOwner,
  onDelete,
  likes,
  showLikeButtons,
  onLike
) => html` <section id="details-page" class="details">
  <div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl} /></p>
    <div class="actions">
      ${bookControlTemplates(book, isOwner, onDelete)}
      ${likesControlsTemplate(showLikeButtons, onLike)}
      <div class="likes">
        <img class="hearts" src="../images/heart.png" />
        <span id="total-likes">Likes: ${likes}</span>
      </div>
    </div>
  </div>
</section>`;

const bookControlTemplates = (book, isOwner, onDelete) => {
  if (isOwner) {
    return html` <a class="button" href="/edit/${book._id}">Edit</a>
      <a @click=${onDelete} class="button" href="javascript:void(0)"
        >Delete</a
      >`;
  } else {
    return null;
  }
};

const likesControlsTemplate = (showLikeButtons, onLike) => {
  if (showLikeButtons) {
    return html`<a @click=${onLike} class="button" href="javascript:void(0)"
      >Like</a
    >`;
  } else {
    return null;
  }
};

export async function detailsView(ctx) {
  const userData = getUserData();
  const [book, likes, hasLike] = await Promise.all([
    getBooksById(ctx.params.id),
    getLikesByBookId(ctx.params.id),
    userData ? getMyLikesByBookId(ctx.params.id, userData.id) : 0,
  ]);

  const isOwner = userData && userData.id == book._ownerId;
  const showLikeButtons =
    isOwner == false && hasLike == false && userData != null;

  ctx.render(
    detailsTemplate(book, isOwner, onDelete, likes, showLikeButtons, onLike)
  );

  async function onDelete() {
    await deleteBook(ctx.params.id);
    ctx.page.redirect("/");
  }

  async function onLike() {
    await likeBook(ctx.params.id);
    ctx.page.redirect("/details/" + ctx.params.id);
  }
}
