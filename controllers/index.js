const {
  getListContacts,
  getContactById,
  createContact,
  updateContactById,
  updateFavoriteById,
  deleteContactById,
} = require("./contacts");

const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
} = require("./auth");

module.exports = {
  getListContacts,
  getContactById,
  createContact,
  updateContactById,
  updateFavoriteById,
  deleteContactById,
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
};
