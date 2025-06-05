const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer.js")

const { CreateBlog, GetBlog, UpdateBlog, DeleteBlog } = require("../controller/Blog.controller.js")

router.get("/get", GetBlog)
router.post("/create", upload.single("media"), CreateBlog)
router.put("/update/:id", upload.single("media"), UpdateBlog)
router.delete("/delete/:id", DeleteBlog)
module.exports = router