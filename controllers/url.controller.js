const User = require("../models/user.model");
const Url = require("../models/url.model");
const shortid = require("shortid");
const objectConverter = require("../utils/objectConverter");

// To create short url
exports.createShortUrl = async (req, res) => {
  try {
    const originalUrl = req.body.url;

    // check in DB for the provided url id
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

    // 127.0.0.1:4000/urlId
    const shortUrl = `${process.env.baseURL}/${urlId}`;

    // Obj to be stored in DB
    const urlObjToBeStoredInDB = {
      urlId: urlId,
      originalUrl: req.body.url,
      shortUrl: shortUrl,
    };

    // DB URL Creation
    const shortUrlCreated = await Url.create(urlObjToBeStoredInDB);

    if (shortUrlCreated) {
      // if the url successfully create
      // store the url id in the user database
      const user = await User.findOne({
        userId: req.userId,
      });

      // add the url id user urls array
      user.urlsCreated.push(shortUrlCreated);

      // save the user into DB
      await user.save();

      // return the response
      return res.status(201).send({
        message: "Short URL created Successfully",
        data: shortUrlCreated,
      });
    }
  } catch (err) {
    // To catch exceptions
    console.error(err.message);
    res.status(500).send({
      message: "Internal server error while creating Short URL",
    });
  }
};

// To fetch all the urls
exports.fetchAllUrls = async (req, res) => {
  try {
    const userId = req.userId; // get the userId from Token

    const user = await User.findOne({ userId: userId }); // fetch the user

    const queryObj = {}; // object for storing  URL'S

    queryObj._id = {
      $in: user.urlsCreated, // Obj to search in url DB.
    };

    const urls = await Url.find(queryObj); // returns the array of url's

    // return the response
    res.status(200).send({
      message: "Fetched urls successfully",
      data: objectConverter.urlListResponse(urls), // convert the urls for better readability
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      message: "Internal server error while fetching URL's",
    });
  }
};

// To fetch only one url
exports.fetchUrl = async (req, res) => {
  try {
    const url = await Url.findOne({
      _id: req.params.urlId,
    });

    if (!url) {
      return res.status(500).send({
        message: "URL not found for the requested URL Id",
      });
    }

    return res.status(200).send(objectConverter.urlResponse(url));
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
      message: "Internal server error while fetching URL",
    });
  }
};

// to update the url
exports.updateUrl = async (req, res) => {
  try {
    // to check newUrl provided or not
    if (!req.body.newUrl) {
      return res.status(500).send({
        message: "new url required to update.",
      });
    }
    // to check oldUrl provided or not
    if (!req.body.newUrl) {
      if (!req.body.oldUrl) {
        return res.status(500).send({
          message: "old url should be provided in order to update.",
        });
      }
    }
    // fetch the url from DB based on params id
    const url = await Url.findOne({
      _id: req.params.urlId,
    });

    // check if valid url or not
    if (!url) {
      return res.status(400).send({
        message: "Failed ! not a valid url id",
      });
    }

    const newUrl = req.body.newUrl; // new url

    // validation for whether provided old url is matching with the original url stored in the DB.
    if (url.originalUrl != req.body.oldUrl) {
      return res.status(400).send({
        message:
          "Failed ! provided old url not matching with the saved url in DB.",
      });
    }

    // generate new short url
    const newUrlId = shortid.generate();

    const newShortUrl = `${process.env.baseURL}/${newUrlId}`;

    // update the url object
    url.urlId = newUrlId;
    url.originalUrl = newUrl;
    url.shortUrl = newShortUrl;

    const updatedUrl = await url.save();
    return res.status(200).send({
      message: "Successfully updated url details",
      updatedUrlDetails: updatedUrl,
    });
  } catch (err) {
    // catch the error
    console.error(err.message);
    res.status(500).send({
      message: "Internal server error while updating URL",
    });
  }
};

// to delete url
exports.deleteUrl = async (req, res) => {
  try {
    // fetch the url
    await Url.deleteOne({
      _id: req.params.urlId,
    });

    // delete urlId from the user url list
    const user = await User.findOne({ userId: req.userId });

    // find index of url id in the user url list

    let indexToBeRemoved = user.urlsCreated.indexOf(req.params.urlId); // find the index

    user.urlsCreated.splice(indexToBeRemoved, 1); // remove the index

    await user.save(); // save the user

    return res.status(200).send({
      message: "Successfully deleted Url",
    });
  } catch (err) {
    return res.status(500).send({
      message: "Some internal error occurred while deleting Url.",
    });
  }
};
