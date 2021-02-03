import multer from "multer";
import Joi from "joi";
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


export const uploadFile = (schema: Joi.ObjectSchema<any>) => multer({
    storage: storage,
    limits: {
        fields: 5,
        fieldNameSize: 50,
        fieldSize: 20000,
        fileSize: 15000000,
    },
    fileFilter: (_req, file, cb) => {

        const { error } = schema.validate(_req.body);

        if (error) {
            cb(new Error(`${error}`));
        } else {
            checkFileType(file, cb);
        }
    }
})
