import express from 'express';
import {createPost, getAllBlogPosts, getOnePost, deletePost} from "../controllers/blog";
import {uploadFile} from "../services/uploadFile";

const posts = express.Router();

posts.get('/', getAllBlogPosts);

posts.get('/:slug', getOnePost);

posts.post('/create', uploadFile.single('thumbnail'),  createPost);

posts.delete('/delete/:slug', deletePost);

export default posts;
