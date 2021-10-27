const Cart = require('../models/orders');
const Item = require('../models/items');

//gets Cart
exports.getCart = async (req, res) => {
    var userID = req.params.userID

    let cart = await Cart.findOne({ "User Id": userID, "Status": "Cart" });

    for (i = 0; i < cart["Items"].length; i++) {
        let item = await Item.findOne({ "Item Id": cart["Items"][i]["Item Id"] });
        cart["Items"][i]['_doc']["Item Name"] = item["Item Name"];
        cart["Items"][i]['_doc']["Picture Link"] = item["Picture Link"];
        cart["Items"][i]['_doc']["Price"] = item["Price"];
    }

    return res.status(200).json({
        status: "success",
        message: "Recommendations given to user",
        Cart: cart
    })
}

//posts item to Cart
exports.postItemToCart = async (req, res) => {
    var userID = req.params.userID;
    var itemID = req.body.itemID;
    var recStatus = req.body.recStatus;
    var points = req.body.points;
    var recBy = req.body.recBy;

    let cart = await Cart.findOneAndUpdate({ "User Id": userID, "Status": "Cart" }, {
        $push: {
            "Items": [{
                "Item Id": itemID,
                "Recommendation Status (Y/N)": recStatus,
                "Friendship Counter Points": recStatus == 'Y' ? points : null,
                "Recommended By": recStatus == 'Y' ? recBy : null,
            }]
        }
    }, { new: true });

    return res.status(200).json({
        status: "success",
        message: "Successfully added",
        Cart: cart
    })
}
