const bcrypt = require("bcryptjs");
const Users = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");


 exports.updateUser = async (req, res) => {
     /**
      * Update User
      */

     if(!req.params.userId) {
            return res.status(400).send({
            message: "User Id not provided"
        });
     }

     if (req.params.userId != req.userId) {
       return res.status(400).send({
         message:
           "user id provided in req.params does not match with token userId",
       });
     } 

     try {

        const user = await Users.findOne({ userId: req.userId });

        user.name = (req.body.name != undefined) ? req.body.name : user.name;
        user.email = (req.body.email != undefined) ? req.body.email : user.email;

         await user.save();
         return res.status(200).send({
             message: "User record successfully updated",
             data: {
                name: user.name,
                email: user.email,
                userId: user.userId,
            }
         });
     } catch (err) {
         console.log(err.message);
         res.status(500).send({
            message: "Internal server error while updating user record"
         });
     }
 }

 exports.updatePassword = async (req, res) => {
     
        if(!req.body.newPassword) {
            return res.status(400).send({
            message: "newPassword not provided"
        });
     }
        if(!req.body.oldPassword) {
            return res.status(400).send({
            message: "oldPassword not provided"
        });
     }
      try {
         
        const user = await Users.findOne({userId: req.userId});
        const isPasswordValid = bcrypt.compareSync(req.body.oldPassword, user.password);
        
        if(!isPasswordValid) {
        return res.status(401).send({
            message: "Invalid old Password"
            });
        }
        
        user.password = bcrypt.hashSync(req.body.newPassword, 8);

        await user.save();

        res.status(200).send({message: "Password successfully updated"});

     } catch (err) {
         console.log(err.message);
         res.status(500).send({
            message: "Internal server error while updating password"
         });
     }
 }
 exports.fetchUserDetails = async (req, res) => {
   try {
       const user = await Users.findOne({ userId: req.userId });
    
     res.status(200).send({
       message: "Fetched user details successfully",
       data: objectConverter.userObject(user)
       });
       
   } catch (err) {
     console.log(err.message);
     res.status(500).send({
       message: "Internal server error while fetching user details",
     });
   }
 };

exports.deleteUser = async (req, res) => {
    if (!req.params.userId) {
      return res.status(400).send({
        message: "User Id not provided",
      });
    }

    if (req.params.userId != req.userId) {
      return res.status(400).send({
        message:
          "user id provided in req.params does not match with token userId",
      });
    } 
    try {
        await Users.deleteOne({
          userId: req.params.userId,
        });

        return res.status(200).send({
            message : "Successfully deleted User"
        });

    } catch (err) {
        return res.status(500).send({
            message: "Some internal error occurred while deleting movie."
        });
    }
}