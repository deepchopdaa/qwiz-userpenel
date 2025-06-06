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


const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'media', // Cloudinary folder
        allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'webm'],
        resource_type: 'auto',
    },

});
const upload = multer({ storage });

module.exports = storage;


module.exports = upload;
