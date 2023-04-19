const authController = require("../controllers/auth.controller");
const {authUser} = require("../middlewares/index");

module.exports = (app) => {
    
    app.post("/app/api/v1/auth/signup", [authUser.validateSignupRequest], authController.signup);
  
    app.post("/app/api/v1/auth/signin", [authUser.validateSigninRequest, authUser.verifyToken], authController.signin);
}