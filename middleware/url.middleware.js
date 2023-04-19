const utils = require("../utils/util");

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

const authUrl = {
  validateUrl: validateUrl,
};

module.exports = authUrl;