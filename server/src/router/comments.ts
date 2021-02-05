import express from 'express';
import {createPost, getAllBlogPosts, getOnePost, deletePost} from "../controllers/posts";
import {uploadFile} from "../services/uploadFile";
import {createPostComment, getPostComment} from "../controllers/comments";
import {createCommentValidation} from "../validation/comments";
import {isAuth} from "../permissions/isAuth";

const blogPostsRouter = express.Router();

blogPostsRouter.post('/:slug/create/', isAuth, createCommentValidation, createPostComment);

export default blogPostsRouter;
