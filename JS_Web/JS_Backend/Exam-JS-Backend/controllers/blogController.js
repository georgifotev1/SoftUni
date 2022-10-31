const {
  create,
  getById,
  update,
  deleteById,
  followBlog,
  getByUserOwner,
} = require("../services/blogService");
const { findOwnerByID, findFollowers } = require("../services/userService");
const { parseError } = require("../util/parser");

const blogController = require("express").Router();

blogController.get("/:id/details", async (req, res) => {
  const blog = await getById(req.params.id);
  const owner = await findOwnerByID(blog.owner);
  const followers = await findOwnerByID(blog.follows);
  console.log(followers);
  blog.ownerEmail = owner[0].email;
  blog.followers = followers.map((el) => el.email);
  console.log(blog.followers);
  if (req.user) {
    if (blog.owner == req.user._id) {
      blog.isOwner = true;
    } else if (
      blog.follows.map((b) => b.toString()).includes(req.user._id.toString())
    ) {
      blog.isFollowed = true;
    }
  }

  res.render("details", {
    title: "Blog Details",
    blog,
  });
});

blogController.get("/create", (req, res) => {
  res.render("create", {
    title: "Create Blog",
  });
});

blogController.post("/create", async (req, res) => {
  const blog = {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    content: req.body.content,
    category: req.body.category,
    owner: req.user._id,
  };

  try {
    if (Object.values(blog).some((v) => !v)) {
      throw new Error("All fields are required");
    }
    await create(blog);
    res.redirect("/catalog");
  } catch (error) {
    res.render("create", {
      title: "Create Blog",
      body: blog,
      errors: parseError(error),
    });
  }
});

blogController.get("/:id/edit", async (req, res) => {
  const blog = await getById(req.params.id);

  if (blog.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  res.render("edit", {
    title: "Edit Blog",
    blog,
  });
});

blogController.post("/:id/edit", async (req, res) => {
  const blog = await getById(req.params.id);

  if (blog.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  const edited = {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    content: req.body.content,
    category: req.body.category,
  };

  try {
    if (Object.values(edited).some((v) => !v)) {
      throw new Error("All fields are required");
    }

    await update(req.params.id, edited);
    res.redirect(`/blog/${req.params.id}/details`);
  } catch (error) {
    res.render("edit", {
      title: "Edit Blog",
      book: Object.assign(edited, { _id: req.params.id }),
      errors: parseError(error),
    });
  }
});

blogController.get("/:id/delete", async (req, res) => {
  const blog = await getById(req.params.id);

  if (blog.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  await deleteById(req.params.id);
  res.redirect("/catalog");
});

blogController.get("/:id/follow", async (req, res) => {
  const blog = await getById(req.params.id);
  try {
    if (blog.owner == req.user._id) {
      blog.isOwner = true;
      throw new Error("Cannot follow your own blog");
    }

    await followBlog(req.params.id, req.user._id);
    res.redirect(`/blog/${req.params.id}/details`);
  } catch (error) {
    res.render("details", {
      title: "Blog Details",
      blog,
      errors: parseError(error),
    });
  }
});

module.exports = blogController;
