const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.signup = async (req, res) => {

    // User sign up Object
    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    }
    
    //  Insert this new user into the database
   try {
     const userCreated = await User.create(userObj);
     console.log("user created", userCreated);

     // Return the response
    const userCreationResponse = {
        name: userCreated.name,
        userId: userCreated.userId,
        email: userCreated.email,
    }
    res.status(201).send(userCreationResponse);
   } catch (err) {
        console.error("Error while creating user", err.message);
        res.status(500).send({
            message: "Internal server error while creating user"
        });
   }    
}

