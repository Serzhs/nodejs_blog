import mongoose from "mongoose";
import {mongoConnection} from "../../dbConnect";

const commentSchema = new mongoose.Schema({
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

export interface Comment {
    author: string,
    comment: string,
    createdAt: string,
}

export default mongoConnection.model('Blog Comments', commentSchema);
