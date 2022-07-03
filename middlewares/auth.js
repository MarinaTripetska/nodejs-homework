const { createError } = require("../errors/createError");
const { authService } = require("../services");

const auth = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(createError(401, "Not authorized"));
  }

  const user = await authService.authenticateUser(token);

  if (!user || !user.token) {
    next(createError(401, "Not authorized"));
  }

  req.user = user;
  next();
};

module.exports = { auth };
