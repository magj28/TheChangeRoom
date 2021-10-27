const User = require('../models/users');
const Item = require('../models/items');

//gets uRecommendations to User
exports.getRecommendedItems = async (req, res) => {
    var userID = req.params.userID

    let user = await User.findOne({ "User Id" : userID });

    for (i=0; i<user["Reccommendation"].length; i++){
        let item = await Item.findOne({"Item Id": user["Reccommendation"][i]["Item Id"] });
        user["Reccommendation"][i]['_doc']["Item Name"]= item["Item Name"];
        user["Reccommendation"][i]['_doc']["Picture Link"]= item["Picture Link"];
        user["Reccommendation"][i]['_doc']["Price"]= item["Price"];
    }

    return res.status(200).json({
        status: "success",
        message: "Recommendations given to user",
        User: user
    })
}

//posts recommendation made by user
exports.postRecommendedItem = async (req, res) => {
    var userID = req.params.userID
    var itemID = req.body.itemID
    var toRecommendedUserID = req.body.toRecommendedUserID;

    let resp = await User.findOneAndUpdate({ "User Id" : toRecommendedUserID },{
        $push: {
            "Recommendations":[{
                "User Id": userID,
                "Item Id": itemID
            }]
        }
    });

    return res.status(200).json({
        status: "success",
        message: "Successfully recommended"
    })
}
