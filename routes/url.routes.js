const urlController = require("../controllers/url.controller");
const { authUser, authUrl } = require("../middleware/index");

module.exports = (app) => {
  app.post(
    "/app/api/v1/urls",
    [authUser.verifyToken, authUrl.validateUrl],
    urlController.createShortUrl
  );
};
