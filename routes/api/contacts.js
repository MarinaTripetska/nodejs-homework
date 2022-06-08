const express = require("express");
const contactOperations = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await contactOperations.listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactOperations.getContactById(contactId);
  res.json(contact);
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const addedContact = await contactOperations.addContact(body);
  res.json(addedContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await contactOperations.removeContact(contactId);
  res.json(removedContact);
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const updatedContact = await contactOperations.updateContact(contactId, body);
  res.json(updatedContact);
});

module.exports = router;
