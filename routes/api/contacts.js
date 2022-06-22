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
  validationSchemaUpdate,
  validationSchemaPatch,
} = require("../../models");

const { validateRequest } = require("../../middlewares/validateRequest");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

// get all contacts:
router.get("/", auth, getListContacts);

// get one contact by id:
router.get("/:contactId", auth, getContactById);

// create one contact:
router.post("/", auth, validateRequest(validationSchemaCreate), createContact);

// update one contact id id:
router.put("/:contactId", auth,validateRequest(validationSchemaUpdate), updateContactById);

// update field "favorite" by id:
router.patch(
  "/:contactId/favorite",
  validateRequest(validationSchemaPatch),
  auth,
  updateFavoriteById
);

// delete one contact by id:
router.delete("/:contactId", auth, deleteContactById);

module.exports = router;
