import multer from "multer";
const path = require("path");

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const checkFileType = (file:Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb(new Error('Error: Images Only!'));
    }
}

export const uploadFile = multer({
    storage: storage,
    limits: {
        fields: 5,
        fieldNameSize: 50, // TODO: Check if this size is enough
        fieldSize: 20000, //TODO: Check if this size is enough
        fileSize: 15000000, // 150 KB for a 1080x1080 JPG 90
    },
    fileFilter: (_req, file, cb) => {
        checkFileType(file, cb);
    }
})
