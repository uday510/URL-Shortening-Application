const utils = require("../utils/util");
const User = require("../models/user.model");

// To Validate the Url using the Regular Expression
validateUrl = (req, res, next) => {
  if (!req.body.url) {
    return res.status(400).send({
      message: "Failed ! url is not provided",
    });
  }

  // validate the url using Regular Expression
  if (!utils.isValidUrl(req.body.url)) {
    return res.status(400).send({
      message: "Failed ! url is not valid",
    });
  }

  next();
};

// To check whether the body contains the new url ans url id provided in req.params
// that needs to be updated is exists in the user DB.
isUrlExists = async (req, res, next) => {
  if (!req.body.newUrl) {
    return res.status(400).send({
      message: "Failed ! newUrl not provided",
    });
  }
  next();
};

isValidUrl = async (req, res, next) => {
  // check if the params contains urlId or not.
  if (!req.params.urlId) {
    return res.status(400).send({
      message: "Failed ! url Id that needs to be updated not provided ",
    });
  }

  // check where the url id is provided present in the params
  const user = await User.findOne({ userId: req.userId });

  if (!user) {
    return res.status(400).send({
      message: "Failed ! Unable to find the user, try again",
    });
  }

  // Check whether the provided url actually exists in user url's list
  let flag = 0;
  for (const element of user.urlsCreated) {
    let urlId = element.toString();
    if (urlId === req.params.urlId) {
      // if found change flag to 1 and break
      flag = 1;
      break;
    }
  }
  // if url provided not present in user url's list
  if (!flag) {
    return res.status(400).send({
      message:
        "Failed ! Provided url id that needs is not found in the user database",
    });
  }
  // all the ok , revert to the controller
  next();
};

// Exposing the functions to outside of this file
const authUrl = {
  validateUrl: validateUrl,
  isUrlExists: isUrlExists,
  isValidUrl: isValidUrl
};

module.exports = authUrl;
