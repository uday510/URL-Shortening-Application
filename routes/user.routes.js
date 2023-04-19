const userController = require("../controllers/user.controller");
const { authUser } = require("../middleware");

module.exports = (app) => {
  app.get(
    "/app/api/v1/users/",
    [authUser.verifyToken],
    userController.fetchUserDetails
  );
  app.put(
    "/app/api/v1/users/",
    [authUser.verifyToken],
    userController.updatePassword
  );

  app.patch(
    "/app/api/v1/users/:userId",
    [authUser.verifyToken],
    userController.updateUser
  );

  app.delete(
    "/app/api/v1/users/:userId",
    [authUser.verifyToken],
    userController.deleteUser
  )
};
