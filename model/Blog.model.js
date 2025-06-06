const mongoose = require('mongoose')
const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mediatype: {
        type: String,
        enum: ['image', 'image/gif', 'gif', 'video', 'url', 'image/jpeg', "mp4", "video/mp4"],
    },
    media: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    Comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        Comment: String,
        createAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true, versionKey: false })

const Blog = mongoose.model("Blog", BlogSchema)
module.exports = Blog