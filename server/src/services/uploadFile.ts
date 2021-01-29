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
        fieldNameSize: 50,
        fieldSize: 20000,
        fileSize: 15000000,
    },
    fileFilter: (_req, file, cb) => {
        checkFileType(file, cb);
    }
})
