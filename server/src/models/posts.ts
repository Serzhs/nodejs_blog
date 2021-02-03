import mongoose from "mongoose";
import {mongoConnection} from "../../dbConnect";
import {Comment} from './comment'

const postSchema = new mongoose.Schema({
    createdAt: {
        type: Number,
        required: false,
        default: Date.now()
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    comments: {
        type: [String],
        required: false,
        default: []
    }
});

export interface Post {
    title: string,
    createdAt: string,
    description: string,
    slug: string,
    comments: Comment[],
    thumbnail: string,
}

export default mongoConnection.model('Blog Posts', postSchema);
