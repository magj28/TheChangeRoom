const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    "Item Id": {
        type: String,
    },
    "Item Name": {
        type: String,
    },
    "Picture Link": {
        type: String,
    },
    "Price": {
        type: String,
    },
    "Rating": {
        type: String,
    }
})

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;