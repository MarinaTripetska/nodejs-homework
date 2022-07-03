const express = require("express");
const { contacts: contactsControllers } = require("../../controllers");

const {
  validationSchemaCreate,
  validationSchemaUpdate,
  validationSchemaPatch,
} = require("../../models");

const { validateRequest } = require("../../middlewares/validateRequest");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

// get all contacts:
router.get("/", auth, contactsControllers.getListContacts);

// get one contact by id:
router.get("/:contactId", auth, contactsControllers.getContactById);

// create one contact:
router.post(
  "/",
  auth,
  validateRequest(validationSchemaCreate),
  contactsControllers.createContact
);

// update one contact id id:
router.put(
  "/:contactId",
  auth,
  validateRequest(validationSchemaUpdate),
  contactsControllers.updateContactById
);

// update field "favorite" by id:
router.patch(
  "/:contactId/favorite",
  validateRequest(validationSchemaPatch),
  auth,
  contactsControllers.updateFavoriteById
);

// delete one contact by id:
router.delete("/:contactId", auth, contactsControllers.deleteContactById);

module.exports = router;
