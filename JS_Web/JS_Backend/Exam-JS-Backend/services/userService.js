const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "qwueihq912he1diuwq";

async function register(email, username, password) {
  const existingEmail = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  const existingUsername = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });

  if (existingUsername) {
    throw new Error("Username is taken");
  }

  if (existingEmail) {
    throw new Error("Email is taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    username,
    hashedPassword,
  });

  return createSeassion(user);
}

async function login(email, password) {
  const user = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const hasMatch = await bcrypt.compare(password, user.hashedPassword);

  if (hasMatch == false) {
    throw new Error("Incorrect email or password");
  }

  return createSeassion(user);
}

function createSeassion({ _id, email, username }) {
  const payload = {
    _id,
    email,
    username,
  };
  return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

async function findOwnerByID(ownerId) {
  return User.find({ _id: ownerId }).lean();
}

async function findFollowers(followers) {
  return followers.map((el) => User.find({ _id: el }).lean());
}

module.exports = {
  register,
  login,
  verifyToken,
  findOwnerByID,
  findFollowers,
};
