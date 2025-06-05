const express = require("express")
const app = express()
const Connect = require("./db/connection.js")
Connect()
const cors = require("cors")
app.use(cors())
app.use(express.json())

const Blog = require("./routes/Blog.route.js")
app.use("/blog", Blog)

app.listen(5000, () => {
    console.log("App Is Running On 5000")
})