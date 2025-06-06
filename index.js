const express = require("express")
const Blog = require("./routes/Blog.route.js")
const { mongoose } = require("mongoose")
const app = express()
const cors = require("cors")
// const Connect = require("./db/connection.js")
// Connect()
app.use(cors())
app.use(express.json())

app.use("/uploads", express.static("uploads"))

const Auth = require("./routes/Auth.route.js")
app.use('/auth', Auth)
app.use("/blog", Blog)
app.get('/', (req, res) => {
    res.send({
        message: "API running ....."
    })
})



mongoose.connect(`mongodb+srv://deepchopda01:03YRl4QoQ0o9ipV4@backend.xpjmz.mongodb.net/test_tt`, { useNewUrlParser: true }).then(() => {
    console.log('database connected');
    app.listen(5000, async () => {
        console.log(`server is running on port : 5000`);
    });
});