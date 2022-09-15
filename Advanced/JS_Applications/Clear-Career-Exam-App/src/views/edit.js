import { editOffer, getOfferById } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (offer, onSubmit) => html` <section id="edit">
  <div class="form">
    <h2>Edit Offer</h2>
    <form @submit=${onSubmit} class="edit-form">
      <input
        type="text"
        name="title"
        id="job-title"
        placeholder="Title"
        .value=${offer.title}
      />
      <input
        type="text"
        name="imageUrl"
        id="job-logo"
        placeholder="Company logo url"
        .value=${offer.imageUrl}
      />
      <input
        type="text"
        name="category"
        id="job-category"
        placeholder="Category"
        .value=${offer.category}
      />
      <textarea
        id="job-description"
        name="description"
        placeholder="Description"
        .value=${offer.description}
        rows="4"
        cols="50"
      ></textarea>
      <textarea
        id="job-requirements"
        name="requirements"
        placeholder="Requirements"
        .value=${offer.requirements}
        rows="4"
        cols="50"
      ></textarea>
      <input
        type="text"
        name="salary"
        id="job-salary"
        .value=${offer.salary}
        placeholder="Salary"
      />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function editView(ctx) {
  const offer = await getOfferById(ctx.params.id);
  ctx.render(editTemplate(offer, onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const offer = {
      title: formData.get("title").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      category: formData.get("category").trim(),
      description: formData.get("description").trim(),
      requirements: formData.get("requirements").trim(),
      salary: formData.get("salary").trim(),
    };

    if (
      offer.title == "" ||
      offer.imageUrl == "" ||
      offer.category == "" ||
      offer.description == "" ||
      offer.requirements == "" ||
      offer.salary == ""
    ) {
      return alert("All fields are required!");
    }

    await editOffer(ctx.params.id, offer);
    ctx.page.redirect("/dashboard/" + ctx.params.id);
  }
}
