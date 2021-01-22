import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
    createdAt: String,
    title: String,
    description: String,
    posterUrl: String,
});

export default mongoose.model('Blog Posts', BlogPostSchema);
