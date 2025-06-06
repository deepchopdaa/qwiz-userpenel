// const multer = require("multer")
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// const upload = multer({ storage: storage })

// module.exports = upload




// middleware/upload.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary.js");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "media", // Cloudinary folder name
        allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4"],
        transformation: [{ width: 800, height: 600, crop: "limit" }],
    },
});

const parser = multer({ storage });

module.exports = parser;

