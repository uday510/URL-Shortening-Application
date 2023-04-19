const authController = require("../controllers/auth.controller");

module.exports = (app) => {
    
    app.post("/app/api/v1/auth/signup", authController.signup);
  
    app.post("/app/api/v1/auth/signin", authController.signin);
}