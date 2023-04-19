const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    /**
     * name, userId, email, password, createdAt, updatedAt
     */
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowerCase: true,
        minLength: 10,
        unique: true
    },
    urls: {
       type: [mongoose.SchemaTypes.ObjectId],
        ref: "Url",
    },
     createdAt: {
        type: Date,
        immutable: true,
        default: () => { 
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
});

module.exports = mongoose.model("User", userSchema);