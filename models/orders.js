const mongoose = require('mongoose')

const ItemsSchema = new mongoose.Schema({
    _id: false,
    "Item Id": {
        type: String,
    },
    "Recommendation Status (Y/N)": {
        type: String,
        enum: ["Y", "N"]
    },
    "Friendship Counter Points": {
        type: String,
    },
    "Recommended By": {
        type: String,
    },
});

const OrderSchema = new mongoose.Schema({
    "Order Id": {
        type: String,
    },
    "User Id": {
        type: String,
    },
    "Items": [ItemsSchema],
    "Status": {
        type: String,
        enum: ["Order", "Cart"]
    },
    "Order Date": {
        type: Date,
    },
})

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;