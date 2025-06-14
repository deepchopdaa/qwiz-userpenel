const User = require("../model/User.js")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const Register = async (req, res) => {
    try {
        console.log("Register Api")
        const { name, email, password } = req.body
        if (!name, !email, !password) {
            return res.status(400).send("All feild Required !")
        }
        const hashpassword = await bcrypt.hash(password, 10)
        console.log(hashpassword)
        const responce = await User.create({ name, email, password: hashpassword })
        if (!responce) {
            return res.status(400).send("User Not Sucessfully Register !")
        }
        return res.status(201).send(responce)
    } catch (e) {
        console.log("Register Error", e)
        return res.status(500).send("Internal server Error")
    }
}
const Login = async (req, res) => {
    try {
        console.log("Login Api")
        const { email, password } = req.body
        if (!email, !password) {
            return res.status(400).send("All feild Required !")
        }
        const findUser = await User.findOne({ email: email })
        if (!findUser) {
            return res.status(400).send("User Not Found !")
        }
        const checkpassword = findUser.password
        const match = await bcrypt.compare(password, checkpassword)
        console.log(match)
        if (!match) {
            return res.status(400).send("Password Not Match !")
        }
        const token = jwt.sign({ id: findUser._id }, "secretkey", { expiresIn: "24h" });
        if (!token) {
            return res.status(400).send("User Not Sucessfully Login !")
        }
        return res.status(201).send({ token })
    } catch (e) {
        console.log("Login Error", e)
        return res.status(500).send("Internal server Error")
    }
}

module.exports = { Register, Login }