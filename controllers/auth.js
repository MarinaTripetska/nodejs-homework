const { authService, userService, emailService } = require("../services");
const { createError } = require("../errors/createError");

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);

    await emailService.sendEmail(user.email, user.verificationToken);

    return res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        user: {
          email: user.email,
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const confirmRegistration = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await userService.findUser({ verificationToken });

    if (!user) {
      throw createError(404, "User not found");
    }

    await userService.updateUser(user._id, {
      verify: true,
      verificationToken: null,
    });

    return res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        message: "Verification successful",
      },
    });
  } catch (error) {
    next(error);
  }
};

const resendConfirmationToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userService.findUser({ email });

    if (!user) {
      throw createError(404, "User not found");
    }
    if (!user.verificationToken) {
      throw createError(400, "Verification has already been passed");
    }

    await emailService.sendEmail(user.email, user.verificationToken);

    return res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        message: "Verification email sent",
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await authService.loginUser(req.body);

    return res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        token: user.token,
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await authService.logoutUser(req.user._id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  confirmRegistration,
  resendConfirmationToken,
  loginUser,
  logoutUser,
};
