const User = require('../models/users');

//gets user data
exports.getData = async (req, res) => {
    var userID = req.params.userID

    let resp = await User.findOne({ "User Id" : userID });

    return res.status(200).json({
        status: "success",
        message: "User login",
        User: resp
    })
}
