import express from 'express';
import {createPost, getAllBlogPosts, getOnePost, deletePost} from "../controllers/blog";
import {uploadFile} from "../services/uploadFile";
import {createPostComment, getPostComment} from "../controllers/comments";

const blogPostsRouter = express.Router();

blogPostsRouter.get('/', getPostComment);
blogPostsRouter.post('/:slug/create/', createPostComment);

export default blogPostsRouter;
