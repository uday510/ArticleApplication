const userController = require("../controllers/user.controller");
const { authUser } = require("../middleware");

module.exports = (app) => {
  app.get(
    "/api/users/",
    [authUser.verifyToken],
    userController.fetchUserDetails
  ); // for fetching the user details
  
  app.patch(
    "/api/users/",
    [authUser.verifyToken],
    userController.updatePassword
  ); // for updating the user password

  app.patch(
    "/api/users/:userId",
    [authUser.verifyToken],
    userController.updateUser
  ); // for updating the user details
 
  app.delete(
    "/api/users/:userId",
    [authUser.verifyToken],
    userController.deleteUser
  ); // for deleting the user

};
