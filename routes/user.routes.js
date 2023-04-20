const userController = require("../controllers/user.controller");
const { authUser } = require("../middleware");

module.exports = (app) => {
  app.get(
    "/app/api/v1/users/",
    [authUser.verifyToken],
    userController.fetchUserDetails
  ); // for fetching the user details
  
  app.patch(
    "/app/api/v1/users/",
    [authUser.verifyToken],
    userController.updatePassword
  ); // for updating the user password

  app.patch(
    "/app/api/v1/users/:userId",
    [authUser.verifyToken],
    userController.updateUser
  ); // for updating the user details
 
  app.delete(
    "/app/api/v1/users/:userId",
    [authUser.verifyToken],
    userController.deleteUser
  ); // for deleting the user

};
