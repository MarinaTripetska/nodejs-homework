const { auth } = require("../services");

const registerUser = async (req, res, next) => {
  try {
    const user = await auth.registerUser(req.body);

    res.status(201).json({
      status: "Created",
      code: 201,
      data: {
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

const loginUser = async (req, res, next) => {
  try {
    const user = await auth.loginUser(req.body);
    console.log(user);
    res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        token: user.token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await auth.logoutUser(req.user._id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  const user = req.user;
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
};

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const updatedUser = await auth.updateSubscription(_id, req.body);

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
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
};
