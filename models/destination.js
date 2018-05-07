var mongoose = require("mongoose");

// SCHEMA SETUP
var destinationSchema = new mongoose.Schema({
    name: String,
    location: String,
    map: String,
    image: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
    
module.exports = mongoose.model("Destination", destinationSchema);