const authController = require("../controllers/auth.controller");
const { authUser } = require("../middleware/index");

module.exports = (app) => {
  app.post(
    "/app/api/v1/auth/signup",
    [authUser.validateSignupRequest], //db calls all in one place
    authController.signup
  ); // for user creation

  app.post(
    "/app/api/v1/auth/signin",
    [authUser.validateSigninRequest],
    authController.signin
  ); // for user signin
};
