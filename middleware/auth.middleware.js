const jwt = require("jsonwebtoken");
const Config = require("../configs/auth.config");
const User = require("../models/user.model");
const Util = require("../utils/util");

// To Validate whether the sign in request contains name and password
validateSigninRequest = (req, res, next) => {
  // check for the name in body
  if (!req.body.email) {
    return res.status(400).send({
      statusCode: 400,
      message: "Failed ! email is not provided",
    });
  }
  // check for the password in body
  if (!req.body.password) {
    return res.status(400).send({
      statusCode: 400,
      message: "Failed ! password is not provided",
    });
  }
  // if required fields are provided the frwarding the request to the controller
  next();
};
// To Validate whether the sign up request contains name and password
validateSignupRequest = async (req, res, next) => {
  // Validate if fields that are required are provided
  if (!req.body.name) {
    return res.status(400).send({
      statusCode: 400,
      message: "Failed ! user name is not provided",
    });
  }
  if (!req.body.userId) {
    return res.status(400).send({
      statusCode: 400,
      message: "Failed ! UserId is not provided",
    });
  }
  if (!req.body.age) {
    return res.status(400).send({
      statusCode: 400,
      message: "Failed ! Age is not provided",
    });
  }
  if (!req.body.email) {
    return res.status(400).send({
      statusCode: 400,
      message: "Failed ! Email is not provided",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      statusCode: 400,
      message: "Failed ! Password is not provided",
    });
  }
  
  // Validate if the userId is already exists
  const user = await User.findOne({ email: req.body.email });
  if (user != null) {
    return res.status(400).send({
      statusCode: 400,
      message: "Failed ! User Id already exists",
    });
  }

  // Validate Email using Regular Expression

  if (!Util.validateEmail(req.body.email)) {
    return res.status(400).send({
      statusCode: 400,
      message: "Failed ! Email id is not valid",
    });
  }

  // validate Password using Regular Expression

  if (!Util.validatePassword(req.body.password)) {
    return res.status(400).send({
      statusCode: 400,
      message: "Failed ! Password id not valid",
      hint: "Password should be min 8 length, with at least a symbol, upper and lower case letters and a number ",
    });
  }

  // If all OK then
  next(); // Revert back to the controller
};

// Verify the Provided Token
verifyToken = (req, res, next) => {
  // Read the token from the header

  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({
      statusCode: 401,
      message: "No token provided",
    });
  }

  //If the token was provided, we need to verify it against
  jwt.verify(token, Config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        statusCode: 401,
        message: "Token expired or not valid, please create new token",
      });
    }
    // Try to read the userId from the decoded token and store it in the req.userId property
    req.userId = decoded.id;
    next(); // revert back to the controller
  });
};

// Exposing the functions to outside of this file
const authUser = {
  validateSignupRequest: validateSignupRequest,
  validateSigninRequest: validateSigninRequest,
  verifyToken: verifyToken,
};

module.exports = authUser;