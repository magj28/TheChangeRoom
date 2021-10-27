
const User = require('../models/users');

exports.signUp = async (req, res) => {
    var userID = req.params.userID
    var password = req.params.pass
    let resp = User.findOne({ "User Id": userID })
    if (!resp) {
        const user = new User({
            "Phone Number": userID,
            "Password": password,
        })
        let resp = await user.save()
    }

    else {
        return res.redirect("/login")
    }

}


exports.login = async (req, res) => {
    var userID = req.params.userID;
    var password = req.params.pass;
    let resp = await User.findOne({ "User Id": userID })
    if (resp["Password"] == password) {
        req.session.isAuth = true
        req.session.username = resp["User Id"]
        return res.status(200).json({
            status: "success",
            message: "User login Success",
            data: {
                User: resp
            }
        })

    }
    else {
        return res.status(200).json({
            status: "success",
            message: "User login Failure",
        })
    }
}

exports.logout = async (req, res) => {
    req.session.destory((err) => {
        if (err) throw err;
        res.redirect("/login")
    })
}



