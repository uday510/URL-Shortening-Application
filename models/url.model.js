const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    /**
     * urlId, originalUrl, shortUrl, userId, createdAt, updatedAt
     */
    urlId: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
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

module.exports = mongoose.model("urlSchema", urlSchema);
