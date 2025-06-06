const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer.js")

const { CreateBlog, GetBlog, UpdateBlog, DeleteBlog, UsersBlog, SingleBlog, likeBlog, commentOnBlog } = require("../controller/Blog.controller.js")
const { AuthVerify, verifyAdmin } = require("../middleware/Auth.middleware.js")
/* get route */
router.get("/get", AuthVerify, verifyAdmin, GetBlog)

/* add blog admin route */
router.post("/create", AuthVerify, verifyAdmin, upload.single("media"), CreateBlog)
/* update and delete admin route */
router.put("/update/:id", AuthVerify, verifyAdmin, upload.single("media"), UpdateBlog)
router.delete("/delete/:id", AuthVerify, verifyAdmin, DeleteBlog)
/* like and comment */
router.post("/:id/like", AuthVerify, likeBlog)
router.post("/:id/comment", AuthVerify, commentOnBlog)
/* user Route */
router.get("/getuserblog", UsersBlog)
router.get("/getsingnle/:id", SingleBlog)
module.exports = router