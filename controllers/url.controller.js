const User = require("../models/user.model");
const Url = require("../models/url.model");
const shortid = require("shortid");

exports.createShortUrl = async (req, res) => {
  try {
    const originalUrl = req.body.url;

    const urlDetails = await Url.findOne({ originalUrl: originalUrl });

    // check if the short url already exists
    if (urlDetails != null) {
      return res.status(200).send({
        message: "Short URL already exists for the specified URL",
        details: urlDetails,
      });
    }

    // create a new short url

    // generate new short url
      const urlId = shortid.generate();
      
    const shortUrl = `${process.env.baseURL}//${urlId}`;

    const urlObjToBeStoredInDB = {
      urlId: urlId,
      originalUrl: req.body.url,
      shortUrl: shortUrl,
    };

    const shortUrlCreated = await Url.create(urlObjToBeStoredInDB);

    if (shortUrlCreated) {
      // store the url id in the user database
      const user = await User.findOne({
        userId: req.userId,
      });
      user.urlsCreated.push(shortUrlCreated);
      await user.save();
      console.log("USER", user);
      return res.status(201).send(shortUrlCreated);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      message: "Internal server error while creating Short URL",
    });
  }
};
