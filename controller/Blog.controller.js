const Blog = require("../model/Blog.model.js")
const User = require("../model/User.js")
const fs = require("fs")
const path = require("path")
const CreateBlog = async (req, res) => {
    try {
        console.log("Create A Blog Api Called !")
        const { title, description } = req.body
        if (!title, !description) {
            return res.status(400).send("All feild Required !")
        }
        console.log(title, description)
        if (!req.file) {
            return res.status(400).send("File Not Found !")
        }
        console.log(req.file)
        let newblog = await Blog.create({ title, description, mediatype: req.file.mimetype, media: req.file.path })
        return res.status(201).send(newblog)
    } catch (e) {
        console.log("Create A Blog Error", e)
        return res.status(500).send("Internal server Error", e)
    }
}
const GetBlog = async (req, res) => {
    try {
        console.log("Get A Blog Api Called !")
        let Allblog = await Blog.find()
        if (!Allblog) {
            return res.status(400).send("Blog Not Available")
        }
        return res.status(201).send(Allblog)
    } catch (e) {
        console.log("Create A Blog Error", e)
        return res.status(500).send("Internal server Error", e)
    }
}
const UpdateBlog = async (req, res) => {
    try {
        console.log("Update A Blog Api Called !")
        const id = req.params.id
        console.log(id)
        const { title, description } = req.body
        if (!title, !description) {
            return res.status(400).send("All feild Required !")
        }
        if (!req.file) {
            return res.status(400).send("File Not Found !")
        }
        let FindBlog = await Blog.findById(id)
        if (!FindBlog) {
            return res.status(400).send('Blog Not Found !')
        }
        console.log(FindBlog)
        const fileName = FindBlog.media
        console.log(fileName)
        fs.unlink(fileName, (err) => {
            if (err) {
                console.log("old file Delete Error")
            } else {
                console.log("old file Delete Sucessfull")
            }
        })
        let newblog = await Blog.findByIdAndUpdate(id, { title, description, mediatype: req.file.mimetype, media: req.file.path }, { new: true })
        return res.status(201).send(newblog)
    } catch (e) {
        console.log("Create A Blog Error", e)
        return res.status(500).send("Internal server Error", e)
    }
}
const DeleteBlog = async (req, res) => {
    try {
        console.log("Create A Blog Api Called !")
        const id = req.params.id
        let FindBlog = await Blog.findById(id)
        if (!FindBlog) {
            return res.status(400).send('Blog Not Found !')
        }
        const fileName = FindBlog.media
        fs.unlink(fileName, (err) => {
            if (err) {
                console.log("old file Delete Error")
            } else {
                console.log("old file Delete Sucessfull")
            }
        })
        let oldblog = await Blog.findByIdAndDelete(id)
        return res.status(201).send(oldblog)
    } catch (e) {
        console.log("Create A Blog Error", e)
        return res.status(500).send("Internal server Error", e)
    }
}

module.exports = { CreateBlog, GetBlog, UpdateBlog, DeleteBlog }