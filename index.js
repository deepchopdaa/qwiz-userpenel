const express = require("express")
const app = express()
const Connect = require("./db/connection.js")
Connect()
const cors = require("cors")
app.use(cors())
app.use(express.json())

app.use("/uploads", express.static("uploads"))

const Auth = require("./routes/Auth.route.js")
app.use('/auth', Auth)
const Blog = require("./routes/Blog.route.js")
app.use("/blog", Blog)
app.get('/',(req ,res )=>{
    res.send({
        message : "API running ....."
    })
})

app.listen(5000, () => {
    console.log("App Is Running On 5000")
})