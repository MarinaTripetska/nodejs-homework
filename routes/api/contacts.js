const express = require("express");
const contactOperations = require("../../models/contacts");
const { ValidationError } = require("../../errors");
const schema = require("../../validationSchema");

const router = express.Router();

router.get("/", async (_, res, next) => {
  try {
    const contacts = await contactOperations.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await contactOperations.getContactById(contactId);

    if (!contact) {
      throw new ValidationError(404, "Not found");
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.addContact.validate(req.body);
    if (error) {
      const msg = `missing required name field. Error: ${error.message}`;
      throw new ValidationError(400, msg);
    } else {
      const addedContact = await contactOperations.addContact({
        ...req.body,
      });
      res.status(201).json(addedContact);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const deleteContact = await contactOperations.removeContact(contactId);
    console.log(deleteContact);
    if (!deleteContact) {
      throw new ValidationError(404, "Not found");
    } else {
      res.status(200).json(deleteContact);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      throw new ValidationError(400, "missing fields");
    }

    const { error } = schema.updateContact.validate(body);
    if (error) {
      throw new ValidationError(400, `Error: ${error.message}`);
    }

    const updatedContact = await contactOperations.updateContact(
      contactId,
      body
    );

    if (!updatedContact) {
      throw new ValidationError(404, "Not found");
    } else {
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
