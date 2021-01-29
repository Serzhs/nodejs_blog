import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
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

export default mongoose.model('Blog Posts', BlogPostSchema);
