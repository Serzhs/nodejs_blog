import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
    createdAt: {
        type: String,
        required: true
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
        required: true
    },
    // posterUrl: {
    //     type: String,
    //     required: true
    // },
});

export default mongoose.model('Blog Posts', BlogPostSchema);
