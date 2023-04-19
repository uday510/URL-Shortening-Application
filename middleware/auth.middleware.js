const jwt = require("jsonwebtoken");
const Config = require("../configs/auth.config");
const User = require("../models/user.model");
const Util = require("../utils/util");

validateSigninRequest = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Failed ! name is not provided",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "Failed ! password is not provided",
    });
  }
  next();
};

validateSignupRequest = async (req, res, next) => {
  // Validate if userName exists
  if (!req.body.name) {
    return res.status(400).send({
      message: "Failed ! user name is not provided",
    });
  }
  if (!req.body.userId) {
    return res.status(400).send({
      message: "Failed ! UserId is not provided",
    });
  }
  if (!req.body.email) {
    return res.status(400).send({
      message: "Failed ! Email is not provided",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "Failed ! Password is not provided",
    });
  }
  /**
   *  Validate if the userId is already exists
   */
  const user = await User.findOne({ userId: req.body.userId });
  // console.log(user);
  if (user != null) {
    return res.status(400).send({
      message: "Failed ! User Id already exists",
    });
  }

  // validate email

  if (!Util.validateEmail(req.body.email)) {
    return res.status(400).send({
        message: "Failed ! Email id is not valid",
    });
  }

  // validate password
    
  if (!Util.validatePassword(req.body.password)) {
      return res.status(400).send({
        message: "Failed ! Password id not valid",
        hint: "Password should be min 8 length, with at least a symbol, upper and lower case letters and a number ",
      });
  }

  next(); //! Revert back to the controller
};

verifyToken = (req, res, next) => {
  /**
   * ! Read the token from the header
   */

  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({
      message: "No token provided",
    });
  }

  //If the token was provided, we need to verify it against
  jwt.verify(token, Config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message:
          "Token expired at " + err.expiredAt + ", please create new token",
      });
    }
    // Try to read the userId from the decoded token and store it in the req.userId property
    req.userId = decoded.id;
    next();
  });
};


const authUser = {
  validateSignupRequest: validateSignupRequest,
  validateSigninRequest: validateSigninRequest,
  verifyToken: verifyToken,
};

module.exports = authUser;
