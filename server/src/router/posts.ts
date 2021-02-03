import express from 'express';
import {createPost, getAllBlogPosts, getOnePost, deletePost, editPost} from "../controllers/posts";
import {uploadFile} from "../services/uploadFile";
import {getOnPostValidation, postValidationSchema} from "../validation/posts";

const posts = express.Router();

posts.get('/', getAllBlogPosts);

posts.get('/:slug', getOnePost);

posts.post('/create',
    uploadFile(postValidationSchema).single('thumbnail'),
    createPost
);

posts.delete('/:slug/delete', deletePost);

posts.put('/:slug/edit', uploadFile(postValidationSchema).single('thumbnail'), getOnPostValidation, editPost);

export default posts;
