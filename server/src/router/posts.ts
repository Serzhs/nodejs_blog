import express from 'express';
import {createPost, getAllBlogPosts, getOnePost, deletePost, editPost} from "../controllers/posts";
import {uploadFile} from "../services/uploadFile";
import {getOnPostValidation, postValidationSchema} from "../validation/posts";
import {isAdmin} from "../permissions/isAdmin";
import {isAuth} from "../permissions/isAuth";

const posts = express.Router();

posts.get('/', getAllBlogPosts);

posts.get('/:slug', getOnePost);

posts.post('/create',
    isAuth,
    uploadFile(postValidationSchema).single('thumbnail'),
    createPost
);

posts.delete('/:slug/delete', isAdmin, deletePost);

posts.put('/:slug/edit', isAuth, uploadFile(postValidationSchema).single('thumbnail'), getOnPostValidation, editPost);

export default posts;
