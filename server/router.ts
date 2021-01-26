import express from 'express';
import {createPost, getAllBlogPosts, getOnePost, deletePost} from "./controllers/blog";

const router = express.Router();

// /http://localhost:8000/posts/
router.get('/', getAllBlogPosts);

router.get('/:slug', getOnePost);

router.post('/create', createPost);
//
// router.put('/update/:slug', (req, res) => {
//     res.send('editojam postu')
// });
//
router.delete('/delete/:slug', deletePost);

// router.get('/add-post', async (req, res) => {
//     const article = new BlogModel({
//         title: 'My First Article',
//         description: 'Lorem ipsum'
//     })

//     const post = await article.save()
//     res.send('Get')
// });

// router.get('/posts', async (req, res) => {
//     // find
//     const test = await BlogModel.find({})
//
//     res.send(test)
// });


export default router;
