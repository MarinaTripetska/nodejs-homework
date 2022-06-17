const { Contact } = require("../models");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const createContact = async (payload) => {
  return await Contact.create(payload);
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
