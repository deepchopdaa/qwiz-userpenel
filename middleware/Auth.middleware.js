const jwt = require("jsonwebtoken")
const User = - require("../model/User.js")
const AuthVerify = (req, res, next) => {
    try {
        const header = req.headers.authorization.split("")[1]
        const token = header
        console.log(token)
        const verify = jwt.verify(token, "secretkey")
        if (!verify) {
            return res.status(400).send("verification Faild")
        }
        console.log(verify)
        const userid = verify._id
        const FindUser = User.findById(userid)
        if (!FindUser) {
            return res.status(400).send("User Not Found !")
        }
        req.user = FindUser
        return next()

    } catch (e) {
        console.log("Auth Middleware Error", e)
        return res.status(500).send("intermal server error", e)
    }
}
module.exports = AuthVerify