const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer.js")

const { CreateBlog, GetBlog, UpdateBlog, DeleteBlog, UsersBlog, SingleBlog, likeBlog, commentOnBlog } = require("../controller/Blog.controller.js")
const { AuthVerify, verifyAdmin } = require("../middleware/Auth.middleware.js")

router.get("/get", AuthVerify, verifyAdmin, GetBlog)
router.get("/getuser", UsersBlog)
router.get("/getsingnle/:id", SingleBlog)

router.post("/create", upload.single("media"), CreateBlog)

router.post("/:id/like", AuthVerify, likeBlog)
router.post("/:id/comment", AuthVerify, commentOnBlog)

router.put("/update/:id", upload.single("media"), UpdateBlog)
router.delete("/delete/:id", DeleteBlog)
module.exports = router