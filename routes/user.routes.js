const userController = require("../controllers/user.controller");
const {authUser} = require("../middleware");


module.exports = (app) => {

    app.put("/app/api/v1/users/", [authUser.verifyToken], userController.updatePassword);
    
    app.put("/app/api/v1/users/:userId",[authUser.verifyToken], userController.updateUser);

}
