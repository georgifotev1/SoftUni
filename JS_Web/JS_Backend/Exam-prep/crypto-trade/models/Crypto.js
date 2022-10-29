const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const cryptoSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, "Title name must be at least 2 characters long"],
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => {
        value > 0;
      },
      message: "Price must be greater than 0",
    },
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        URL_PATTERN.test(value);
      },
      message: "Image URL is not valid",
    },
  },
  description: {
    type: String,
    required: true,
    minlength: [10, "Description must be at least 10 characters long"],
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  buys: { type: [Types.ObjectId], ref: "User", default: [] },
  owner: { type: Types.ObjectId, ref: "User", required: true },
});

cryptoSchema.index(
  { title: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const Crypto = model("Crypto", cryptoSchema);

module.exports = Crypto;
