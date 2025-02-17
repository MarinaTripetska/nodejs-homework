const { User } = require("../models/user");
const { createError } = require("../errors/createError");
const { SECRET_KEY } = require("../helpers/env");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateVarifycationToken,
} = require("../helpers/generateVerifycationToken");

const registerUser = async ({ email, password }) => {
  const isExist = await User.findOne({ email });
  if (isExist) {
    throw createError(409, "User already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const verificationToken = generateVarifycationToken();
  const user = await User.create({
    email,
    password: hashedPassword,
    verificationToken,
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (user && !user.verify) {
    throw createError(401, "Please, confirm your email address.");
  }

  if (!user) {
    throw createError(401, "Email or password is wrong.");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw createError(401, "Email or password is wrong.");
  }

  const payload = {
    id: user._id,
    email: user.email,
    subscription: user.subscription,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });

  return await User.findByIdAndUpdate(user._id, { token }, { new: true });
};

const authenticateUser = async (token) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    const { id } = payload;
    return await User.findById(id);
  } catch (error) {
    return null;
  }
};

const logoutUser = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

module.exports = {
  registerUser,
  loginUser,
  authenticateUser,
  logoutUser,
};
