const Crypto = require("../models/Crypto");

async function create(crypto) {
  return Crypto.create(crypto);
}

async function update(id, crypto) {
  const existing = await Crypto.findById(id);
  existing.title = crypto.title;
  existing.price = crypto.price;
  existing.imageUrl = crypto.imageUrl;
  existing.description = crypto.description;
  existing.paymentMethod = crypto.paymentMethod;
  await existing.save();
}

async function deleteById(id) {
  await Crypto.findByIdAndRemove(id);
}

async function getAll() {
  return Crypto.find({}).lean();
}

async function getById(id) {
  return Crypto.findById(id).lean();
}

async function buyCrypto(cryptoId, userId) {
  const crypto = await Crypto.findById(cryptoId);

  if (crypto.buys.includes(userId)) {
    throw new Error("Cannot buy twice");
  }

  crypto.buys.push(userId);
  await crypto.save();
}

async function getByUserBuy(userId) {
  return Crypto.find({ buys: userId }).lean();
}
module.exports = {
  create,
  update,
  getAll,
  getById,
  deleteById,
  buyCrypto,
  getByUserBuy,
};
