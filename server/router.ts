import express from 'express';
import {createPost, getAllBlogPosts, getOnePost, deletePost} from "./controllers/blog";
import {uploadFile} from "./utils/uploadFile";

const router = express.Router();

router.get('/', getAllBlogPosts);

router.get('/:slug', getOnePost);

router.post('/create', uploadFile.single('thumbnail'),  createPost);

router.delete('/delete/:slug', deletePost);

export default router;
