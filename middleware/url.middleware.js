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

isValidUrl = async (req, res, next) => {
  if (!req.body.newUrl) {
    return res.status(400).send({
      message: "Failed ! newUrl not provided",
    });
  }
  // check if the params contains is or not.
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

  let flag = 0;
  for (const element of user.urlsCreated) {
    let urlId = element.toString();
    if (urlId === req.params.urlId) {
      flag = 1;
      break;
    }
  }
  if (!flag) {
    return res.status(400).send({
      message:
        "Failed ! Provided url id that needs to be updated is not found in the user database",
    });
  }
  next();
};

const authUrl = {
  validateUrl: validateUrl,
  isValidUrl: isValidUrl,
};

module.exports = authUrl;
