const jwt = require("jsonwebtoken")
const User = require("../model/User.js")
const AuthVerify = async (req, res, next) => {
    try {
        const header = req.headers.authorization?.split(" ")[1];
        const token = header
        console.log(token)
        const verify = jwt.verify(token, "secretkey")
        if (!verify) {
            return res.status(400).send("verification Faild")
        }
        console.log(verify)
        const userid = verify.id
        const FindUser = await User.findById(userid)
        if (!FindUser) {
            return res.status(400).send("User Not Found !")
        }
        console.log(FindUser)
        req.user = FindUser
        return next()
    } catch (e) {
        console.log("Auth Middleware Error", e)
        return res.status(500).send("intermal server error", e)
    }
}

const verifyAdmin = (req, res, next) => {
    console.log(req.user)
    if (req.user?.role == "1") {
        next();
    } else {
        res.status(403).json({ message: "Admin only" });
    }
};

module.exports = { AuthVerify, verifyAdmin }