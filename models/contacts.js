const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsbPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const resp = await fs.readFile(contactsbPath);
  const contacts = JSON.parse(resp);
  return contacts;
};

async function updateContacts(contacts) {
  await fs.writeFile(contactsbPath, JSON.stringify(contacts));
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = await contacts.find((el) => el.id === contactId);
  return contact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    ...body,
  };
  await updateContacts([...contacts, newContact]);
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indx = await contacts.findIndex((el) => el.id === contactId);

  if (indx === -1) {
    return undefined;
  }

  const [removedContact] = await contacts.splice(indx, 1);
  await updateContacts(contacts);
  return removedContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const contacts = await listContacts();
  const idx = await contacts.findIndex((el) => el.id === contactId);

  if (idx === -1) {
    return undefined;
  }

  contacts[idx] = {
    id: contactId,
    name: name || contacts[idx].name,
    email: email || contacts[idx].email,
    phone: phone || contacts[idx].phone,
  };

  await updateContacts(contacts);

  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
