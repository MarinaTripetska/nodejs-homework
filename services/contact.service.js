const { createError } = require("../errors/createError");
const { Contact } = require("../models");

const listContacts = async (query, _id) => {
  const { page, limit } = query;
  const searchParameters = { owner: _id };

  const isLimitValid = limit === undefined || !isNaN(limit);
  const isPageValid = page === undefined || !isNaN(page);
  if (!isLimitValid || !isPageValid) {
    throw createError(400, "Unacceptable query params");
  }

  const skipped = (page - 1) * limit;
  const skip = skipped < 0 ? 0 : skipped;

  const { favorite = null } = query;

  if (favorite !== null) {
    searchParameters.favorite = !!favorite;
  }

  return await Contact.find(searchParameters, {}, { skip, limit }).populate(
    "owner",
    "email subscription"
  );
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const createContact = async (payload, userId) => {
  return await Contact.create({ ...payload, owner: userId });
};

const updateContactById = async (id, payload) => {
  return await Contact.findByIdAndUpdate(id, payload, { new: true });
};

const removeContactById = async (id) => {
  return await Contact.findByIdAndRemove(id);
};

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  createContact,
  updateContactById,
};
