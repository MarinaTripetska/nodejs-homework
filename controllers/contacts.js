const { contactsService } = require("../services");
const { createError } = require("../errors/createError");

const getListContacts = async (_, res, next) => {
  try {
    const contacts = await contactsService.listContacts();

    if (!contacts) {
      throw createError(404, "Not found");
    }

    res.status(200).json({
      status: "OK",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await contactsService.getContactById(contactId);

    if (!contact) {
      throw createError(404, "Contact not found");
    }

    res.status(200).json({
      status: "OK",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const addedContact = await contactsService.createContact(req.body);
    res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        result: addedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const payload = req.body;

  try {
    const updatedContact = await contactsService.updateContactById(
      contactId,
      payload
    );

    if (!updatedContact) {
      throw createError(404, "Contact not found");
    }

    res.status(200).json({
      status: "OK",
      code: 200,
      data: {
        result: updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateFavoriteById = async (req, res, next) => {
  const { contactId } = req.params;
  const payload = req.body;

  try {
    const updatedContact = await contactsService.updateContactById(
      contactId,
      payload
    );

    if (!updatedContact) {
      throw createError(404, "Contact not Found");
    }

    res.status(201).json({
      status: "OK",
      code: 200,
      data: {
        result: updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const deletedContact = await contactsService.removeContactById(contactId);

    if (!deletedContact) {
      throw createError(404, "Contact not found");
    }

    res.status(200).json({
      status: "Deleted",
      code: 200,
      data: {
        result: deletedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListContacts,
  getContactById,
  createContact,
  updateContactById,
  updateFavoriteById,
  deleteContactById,
};
