const mongoose = require('mongoose')

const ResultsSchema = new mongoose.Schema({
    _id: false,
    "User Id": {
        type: String,
    },
    "Thumbs Up/Down": {
        type: String,
        enum: ["Y", "N"]
    }
});

const PollsSchema = new mongoose.Schema({
    _id: false,
    "Item Id": {
        type: String,
    },
    "Results":[ResultsSchema]
});

const ParticipantsSchema = new mongoose.Schema({
    _id: false,
    "Friend Id": {
        type: String,
    }
});

const ChatSchema = new mongoose.Schema({
    _id: false,
    "User Id": {
        type: String,
    },
    "Text": {
        type: String,
    },
    "Polls": [PollsSchema],
});

const ChangeRoomSchema = new mongoose.Schema({
    "ChangeRoom Id": {
        type: String,
    },
    "ChangeRoom Name": {
        type: String,
    },
    "Owner Id": {
        type: String,
    },
    "Participants": [ParticipantsSchema],
    "Chat": [ChatSchema],
    "Status": {
        type: String,
        enum: ["Order", "Cart"]
    },
    "Order Date": {
        type: Date,
    },
})

const ChangeRooms = mongoose.model('ChangeRoom', ChangeRoomSchema);
module.exports = ChangeRooms;