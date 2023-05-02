const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");

// for user signup
exports.signup = async (req, res) => {
  // User sign up Object
  const userObj = {
    name: req.body.name,
    userId: req.body.userId,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  //  Insert this new user into the database
  try {
    const userCreated = await User.create(userObj);
    // Return the response
    const userCreationResponse = {
      name: userCreated.name,
      userId: userCreated.userId,
      email: userCreated.email,
    };

    res.status(201).send({
      message: "User created successfully",
      data: userCreationResponse,
    });
  } catch (err) {
    console.error("Error while creating user", err.message);
    res.status(500).send({
      message: "Internal server error while creating user",
    });
  }
};

// Controller for sign-in
exports.signin = async (req, res) => {
  try {
    // Search the user if exists
    const user = await User.findOne({ userId: req.body.userId });

    if (user == null) {
      return res.status(400).send({
        message: "Failed ! User id doesn't exist",
      });
    }

    // User is existing, so now will do the password matching
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid Password",
      });
    }

    /**
     * Successful  login
     * Need to generate access token now
     */
    const token = jwt.sign({ id: user.userId }, config.secret, {
      expiresIn: 600, // Expires 10 Minutes
    });

    // Send the response
    res.status(200).send({
      message: "Token sent successfully",
      name: user.name,
      userId: user.userId,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      message: "Internal server error while signing user",
    });
  }
};
