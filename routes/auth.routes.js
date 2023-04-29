const authController = require("../controllers/auth.controller");
const { authUser } = require("../middleware/index");

module.exports = (app) => {
  app.post(
    "/api/signup",
    [authUser.validateSignupRequest], //db calls all in one place
    authController.signup
  ); // for user creation

  app.post(
    "/api/login",
    [authUser.validateSigninRequest],
    authController.signin
  ); // for user signin
};
