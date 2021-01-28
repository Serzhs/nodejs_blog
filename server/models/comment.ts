import mongoose from "mongoose";

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

export default mongoose.model('Blog Comments', BlogCommentSchema);
