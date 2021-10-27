const mongoose = require('mongoose')

const ChangeRoomsSchema = new mongoose.Schema({
    _id: false,
    "ChangeRoom Id": {
        type: String,
    }
});

const CollectionSchema = new mongoose.Schema({
    _id: false,
    "Item Id": {
        type: String,
    }
});

const RecommendationSchema = new mongoose.Schema({
    _id: false,
    "User Id": {
        type: String,
    },
    "Item Id": {
        type: String,
    }
});

const FriendListSchema = new mongoose.Schema({
    _id: false,
    "User Id": {
        type: String,
    },
    "Friendship Counter": {
        type: String,
    },
    "Online Status": {
        type: String,
    },
    "Change Rooms": [ChangeRoomsSchema]
});

const FriendRequestsSchema = new mongoose.Schema({
    _id: false,
    "User Id": {
        type: String,
    }
});

const UserSchema = new mongoose.Schema({
    "Phone Number": {
        type: String,
    },
    "Password": {
        type: String,
    },
    "Collection": [CollectionSchema],
    "Recommendation": [RecommendationSchema],
    "Friend Lists": [FriendListSchema],
    "Friend Requests": [FriendRequestsSchema]
})

const User = mongoose.model('User', UserSchema);
module.exports = User;