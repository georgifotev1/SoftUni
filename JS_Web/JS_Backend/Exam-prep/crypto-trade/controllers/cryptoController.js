const {
  create,
  getById,
  update,
  deleteById,
  buyCrypto,
} = require("../services/cryptoServices");
const { parseError } = require("../util/parser");

const cryptoController = require("express").Router();

cryptoController.get("/:id/details", async (req, res) => {
  const crypto = await getById(req.params.id);
  if (req.user) {
    if (crypto.owner == req.user._id) {
      crypto.isOwner = true;
    } else if (
      crypto.buys.map((b) => b.toString()).includes(req.user._id.toString())
    ) {
      crypto.isBought = true;
    }
  }

  res.render("details", {
    title: "Crypto Details",
    crypto,
  });
});

cryptoController.get("/create", (req, res) => {
  res.render("create", {
    title: "Create coin",
  });
});

cryptoController.post("/create", async (req, res) => {
  const crypto = {
    title: req.body.title,
    price: Number(req.body.price),
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    paymentMethod: req.body.paymentMethod,
    owner: req.user._id,
  };

  try {
    if (Object.values(crypto).some((v) => !v)) {
      throw new Error("All fields are required");
    }
    await create(crypto);
    res.redirect("/catalog");
  } catch (error) {
    res.render("create", {
      title: "Create coin",
      body: crypto,
      errors: parseError(error),
    });
  }
});

cryptoController.get("/:id/edit", async (req, res) => {
  const crypto = await getById(req.params.id);

  if (crypto.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  res.render("edit", {
    title: "Edit Crypto",
    crypto,
  });
});

cryptoController.post("/:id/edit", async (req, res) => {
  const crypto = await getById(req.params.id);

  if (crypto.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  const edited = {
    title: req.body.title,
    price: Number(req.body.price),
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    paymentMethod: req.body.paymentMethod,
  };

  try {
    if (Object.values(edited).some((v) => !v)) {
      throw new Error("All fields are required");
    }

    await update(req.params.id, edited);
    res.redirect(`/crypto/${req.params.id}/details`);
  } catch (error) {
    res.render("edit", {
      title: "Edit Crypto",
      crypto: Object.assign(edited, { _id: req.params.id }),
      errors: parseError(error),
    });
  }
});

cryptoController.get("/:id/delete", async (req, res) => {
  const crypto = await getById(req.params.id);

  if (crypto.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  await deleteById(req.params.id);
  res.redirect("/catalog");
});

cryptoController.get("/:id/buy", async (req, res) => {
  const crypto = await getById(req.params.id);
  try {
    if (crypto.owner == req.user._id) {
      crypto.isOwner = true;
      throw new Error("Cannot buy your coin");
    }

    await buyCrypto(req.params.id, req.user._id);
    res.redirect(`/crypto/${req.params.id}/details`);
  } catch (error) {
    res.render("details", {
      title: "Crypto Details",
      crypto,
      errors: parseError(error),
    });
  }
});

module.exports = cryptoController;
