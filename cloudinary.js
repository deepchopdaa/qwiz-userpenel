const cloudinary = require('cloudinary').v2;
const API_KEY = "646419516787558"
const SECREATE_KEY = "HAqfwihWrJjcZCt63sVcHMY58oU"
const CloudName = "dwoqb0fua"
cloudinary.config({
    cloud_name: CloudName,
    api_key: SECREATE_KEY,
    api_secret: API_KEY
});

module.exports = cloudinary;
