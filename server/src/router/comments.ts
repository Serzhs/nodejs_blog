import express from 'express';
import {createPost, getAllBlogPosts, getOnePost, deletePost} from "../controllers/posts";
import {uploadFile} from "../services/uploadFile";
import {createPostComment, getPostComment} from "../controllers/comments";
import {createCommentValidation} from "../validation/comments";

const blogPostsRouter = express.Router();

blogPostsRouter.get('/', getPostComment);
blogPostsRouter.post('/:slug/create/', createCommentValidation, createPostComment);

export default blogPostsRouter;
