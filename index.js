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



mongoose.connect(`mongodb+srv://deepchopda01:Deepu1155@backend.xpjmz.mongodb.net/test_tt`, { useNewUrlParser: true }).then(() => {
  console.log('database connected');
  app.listen(5000, async () => {
    console.log(`server is running on port : 5000`);
  });
});