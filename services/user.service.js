const { User } = require("../models/user");

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const findUser = async (filters) => {
  return await User.findOne(filters);
};

module.exports = { findUser, updateUser };
