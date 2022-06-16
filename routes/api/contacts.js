const express = require("express");
const {
  getListContacts,
  getContactById,
  createContact,
  updateContactById,
  updateFavoriteById,
  deleteContactById,
} = require("../../controllers");

const {
  validationSchemaCreate,
  validationSchemaPatch,
} = require("../../models");

const { validateRequest } = require("../../middlewares/validateRequest");

const router = express.Router();

// get all contacts:
router.get("/", getListContacts);

// get one contact by id:
router.get("/:contactId", getContactById);

// create one contact:
router.post("/", validateRequest(validationSchemaCreate), createContact);

// update one contact id id:
router.put("/:contactId", updateContactById);

// update field "favorite" by id:
router.patch(
  "/:contactId/favorite",
  validateRequest(validationSchemaPatch),
  updateFavoriteById
);

// delete one contact by id:
router.delete("/:contactId", deleteContactById);

module.exports = router;
