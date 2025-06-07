// config/cloudinary.js
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECREATE_KEY
});
console.log(process.env.SECREATE_KEY, process.env.API_KEY, process.env.SECREATE_KEY)

module.exports = cloudinary;    