const express = require("express");
const contactOperations = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await contactOperations.listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactOperations.getContactById(contactId);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json(contact);
  }
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    const addedContact = await contactOperations.addContact({
      name,
      email,
      phone,
    });
    res.status(201).json(addedContact);
  }
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await contactOperations.removeContact(contactId);

  if (!deleteContact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(204).json({ message: "Contact deleted" });
  }
});

router.put("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing fields" });
  } else {
    const updatedContact = await contactOperations.updateContact(
      contactId,
      body
    );

    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(updatedContact);
    }
  }
});

module.exports = router;
