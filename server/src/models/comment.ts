import mongoose from "mongoose";
import {mongoConnection} from "../../mongoConfig";

const BlogCommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: false,
        default: Date.now()
    },
});

export default mongoConnection.model('Blog Comments', BlogCommentSchema);
