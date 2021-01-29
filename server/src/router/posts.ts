import express from 'express';
import {createPost, getAllBlogPosts, getOnePost, deletePost, editPost} from "../controllers/blog";
import {uploadFile} from "../services/uploadFile";

const posts = express.Router();

posts.get('/', getAllBlogPosts);

posts.get('/:slug', getOnePost);

posts.post('/create', uploadFile.single('thumbnail'),  createPost);

posts.delete('/:slug/delete', deletePost);

posts.put('/:slug/edit', uploadFile.single('thumbnail'), editPost);

export default posts;
