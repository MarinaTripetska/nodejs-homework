const { User } = require("../models/user");

const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

const updateSubscription = async (id, subscription) => {
  return await User.findByIdAndUpdate(id, { ...subscription }, { new: true });
};

module.exports = { updateUser, updateSubscription };
