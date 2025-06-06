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
  // var key = fs.readFileSync(__dirname + '/certs/privkey.pem');
  // var cert = fs.readFileSync(__dirname + '/certs/cert.pem');
  // var options = {
  //   key: key,
  //   cert: cert
  // };
  // var server = https.createServer(options, app);

  // https nodejs server
  //   server.listen(PORT, async () => {
  //     console.log(`server is running on port : ${PORT}`);
  //   });
  // http nodejs server
  app.listen(5000, async () => {
    console.log(`server is running on port : 5000`);
  });
});