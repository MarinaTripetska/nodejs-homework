const { createError } = require("../errors/createError");
const { imageService, userService } = require("../services");

const currentUser = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      throw createError(404);
    }

    res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  try {
    // const updatedUser = await userService.updateSubscription(_id, req.body);
    const updatedUser = await userService.updateUser(_id, {
      subscription: req.body.subscription,
    });
    if (!updatedUser) {
      throw createError(404);
    }

    res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        user: {
          email: updatedUser.email,
          subscription: updatedUser.subscription,
          avatarURL: updatedUser.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  const { _id: id } = req.user;
  try {
    const avatarURL = await imageService.uploadImage(id, req.file);
    const updatedUser = await userService.updateUser(id, { avatarURL });
    res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        user: {
          email: updatedUser.email,
          subscription: updatedUser.subscription,
          avatarURL: updatedUser.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  currentUser,
  updateSubscription,
  updateAvatar,
};
