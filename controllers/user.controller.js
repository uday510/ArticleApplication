const bcrypt = require("bcryptjs");
const Users = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");

exports.updateUser = async (req, res) => {
  // Update User
  if (req.body.email) {
    return res.status(200).send({
      statusCode: 200,
      message: "Email is not editable",
    });
  }

  // check for userId in params
  if (!req.params.userId) {
    return res.status(400).send({
      statusCode: 400,
      message: "User Id not provided",
    });
  }

  // check for userName in params is equals to current user id
  if (req.params.userId != req.userId) {
    return res.status(400).send({
      statusCode: 400,
      message:
        "user id provided in req.params does not match with token userId",
    });
  }

  try {
    // get the user details
    const user = await Users.findOne({ userId: req.userId });

    // update the user details

    user.name = req.body.name != undefined ? req.body.name : user.name;
    user.age = req.body.age != undefined ? req.body.age : user.age;

    // save the user in DB
    await user.save();

    // return the response
    return res.status(200).send({
      statusCode: 200,
      data: {
        name: user.name,
        email: user.email,
        userId: user.userId,
        age: user.age,
      },
      message: "User record successfully updated",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error while updating user record",
    });
  }
};

// For Updating password
exports.updatePassword = async (req, res) => {
  // for newPassword in body
  if (!req.body.newPassword) {
    return res.status(400).send({
      statusCode: 400,
      message: "newPassword not provided",
    });
  }
  // check for oldPassword in body
  if (!req.body.oldPassword) {
    return res.status(400).send({
      statusCode: 400,
      message: "oldPassword not provided",
    });
  }
  try {
    // fetch the user
    const user = await Users.findOne({ userId: req.userId });

    // compare the provided oldPassword with stored password

    const isPasswordValid = bcrypt.compareSync(
      req.body.oldPassword,
      user.password
    );

    // if not valid , return
    if (!isPasswordValid) {
      return res.status(401).send({
        statusCode: 401,
        message: "Invalid old Password",
      });
    }

    // update the password, and hash using the bcrypt algorithm
    user.password = bcrypt.hashSync(req.body.newPassword, 8);

    await user.save(); // save the user object

    res
      .status(200)
      .send({ statusCode: 200, message: "Password successfully updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error while updating password",
    });
  }
};
// Fetch user details
exports.fetchUserDetails = async (req, res) => {
  try {
    // find the user
    const user = await Users.findOne({ userId: req.userId });

    // return the response without password
    res.status(200).send({
      statusCode: 200,
      data: objectConverter.userObject(user),
      message: "Fetched user details successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error while fetching user details",
    });
  }
};

// Delete the user
exports.deleteUser = async (req, res) => {
  // check for userId in params
  if (!req.params.userId) {
    return res.status(400).send({
      statusCode: 400,
      message: "User Id not provided",
    });
  }

  // check for userId validation
  if (req.params.userId != req.userId) {
    return res.status(400).send({
      statusCode: 400,
      message:
        "user id provided in req.params does not match with token userId",
    });
  }
  try {
    // Delete the user
    await Users.deleteOne({
      userId: req.params.userId,
    });

    // return success message
    return res.status(200).send({
      statusCode: 200,
      message: "Successfully deleted User",
    });
  } catch (err) {
    return res.status(500).send({
      statusCode: 500,
      message: "Some internal error occurred while deleting movie.",
    });
  }
};
