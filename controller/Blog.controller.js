const Blog = require("../model/Blog.model.js")
const User = require("../model/User.js")
const fs = require("fs")
const mongoose = require('mongoose')
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

// POST /api/blogs/:id/like
const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        console.log(blog)
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        const user = req.user
        console.log(user)
        const id = user.id

        console.log(id)
        const alreadyLiked = blog.likes.some(id => id.equals(id)); // ✅ use equals()

        if (alreadyLiked) {
            blog.likes.pull(id);  // ✅ Correct field: blog.likes
        } else {
            blog.likes.push(id);
        }

        await blog.save();
        res.status(200).json({
            message: alreadyLiked ? "Unliked" : "Liked",
            likes: blog.likes.length
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// POST /api/blogs/:id/comment
const commentOnBlog = async (req, res) => {
    try {
        console.log("comment api called!")
        const blog = await Blog.findById(req.params.id);
        const user = req.user
        console.log(user)
        const id = user.id

        console.log(id)
        const { Comment } = req.body;

        if (!blog) return res.status(404).json({ message: "Blog not found" });
        if (!Comment) return res.status(400).json({ message: "Comment is required" });

        blog.Comments.push({
            user: id,
            Comment,
        });

        await blog.save();
        console.log(blog)
        res.status(200).json({ message: "Comment added", comments: blog.comments });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};



/* for user api */

const UsersBlog = async (req, res) => {
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

const SingleBlog = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        console.log("Get A Blog Api Called !")
        let Singleblog = await Blog.findById(id).populate({
            path: 'Comments.user',
            select: 'name' // assuming "name" is the field in your User model
        });
        if (!Singleblog) {
            return res.status(400).send("Blog Not Available")
        }
        return res.status(201).send(Singleblog)
    } catch (e) {
        console.log("Create A Blog Error", e)
        return res.status(500).send("Internal server Error", e)
    }
}

module.exports = { CreateBlog, GetBlog, UpdateBlog, DeleteBlog, SingleBlog, UsersBlog, likeBlog, commentOnBlog }