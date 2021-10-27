const User = require('../models/users');
const Order = require('../models/orders');
const Item = require('../models/items');

//gets Cart
exports.getOrders = async (req, res) => {
    var userID = req.params.userID

    let order = await Order.find({ "User Id": userID, "Status": "Order" }).sort({"Order Date": -1});

    for (i = 0; i < order["Items"].length; i++) {
        let item = await Item.findOne({ "Item Id": order["Items"][i]["Item Id"] });
        order["Items"][i]['_doc']["Item Name"] = item["Item Name"];
        order["Items"][i]['_doc']["Picture Link"] = item["Picture Link"];
        order["Items"][i]['_doc']["Price"] = item["Price"];
    }

    return res.status(200).json({
        status: "success",
        message: "Recommendations given to user",
        Cart: order
    })
}

//converts cart to order
exports.postOrder = async (req, res) => {
    var userID = req.params.userID;

    let order = await Order.findOneAndUpdate({ "User Id": userID, "Status": "Cart" }, {
        "Status": "Order",
        "Order Date": Date.now()
    }, { new: true });

    for (i = 0; i < order["Items"].length; i++) {
        if (order["Items"][i]["Recommended Status (Y/N)"] == 'Y') {
            var friendshipCounter;
            let user = await User.findOne({ "User Id": userID, })
            for (j = 0; j < user["Friend List"]; j++) {
                if (user["Friend List"][j] == order["Items"][i]["Recommended By"]) {
                    friendshipCounter = user["Friend List"][j]["Friendship Counter"]
                    break;
                }
            }
            friendshipCounter = (parseFloat(friendshipCounter) + parseFloat(order["Items"][i]["Friendship Counter Points"])).toString()
            await User.findOneAndUpdate({ "User Id": userID, "Friend List.User Id": order["Items"][i]["Recommended By"] }, {
                "Friend List.$.Friendship Counter": friendshipCounter
            })
            await User.findOneAndUpdate({ "User Id": order["Items"][i]["Recommended By"], "Friend List.User Id": userID }, {
                "Friend List.$.Friendship Counter": friendshipCounter
            })
        }
    }

    return res.status(200).json({
        status: "success",
        message: "Successfully ordered"
    })
}
