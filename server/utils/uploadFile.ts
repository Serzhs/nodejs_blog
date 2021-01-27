import multer from "multer";
const path = require("path");

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

export const uploadFile = multer({
    storage: storage,
    limits:{fileSize: 1000000},
})
