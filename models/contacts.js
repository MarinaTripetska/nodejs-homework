const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsbPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const resp = await fs.readFile(contactsbPath);
    const contacts = JSON.parse(resp);
    return contacts;
  } catch (error) {
    console.log("error:", error.message);
  }
};

async function updateContacts(contacts) {
  await fs.writeFile(contactsbPath, JSON.stringify(contacts));
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = await contacts.find((el) => el.id === contactId);

    if (!contact) {
      throw new Error(`\x1B[31m Contact with id=${contactId} not found`);
    }

    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const indx = await contacts.findIndex((el) => el.id === contactId);

    if (indx === -1) {
      throw new Error(`\x1B[31m Contact with id=${contactId} not found`);
    }

    const [removedContact] = await contacts.splice(indx, 1);
    await updateContacts(contacts);
    return removedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    if (!name || !email || !phone) {
      throw new Error("`\x1B[31m Please, provide full information!");
    }

    const contacts = await listContacts();

    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    };

    await updateContacts([...contacts, newContact]);

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;

    const contacts = await listContacts();
    const idx = await contacts.findIndex((el) => el.id === contactId);

    if (idx === -1) {
      throw new Error(`\x1B[31m Contact with id=${contactId} not found`);
    }

    contacts[idx] = {
      contactId,
      name: name || contacts[idx].name,
      email: email || contacts[idx].email,
      phone: phone || contacts[idx].phone,
    };

    await updateContacts(contacts);
    return contacts[idx];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
