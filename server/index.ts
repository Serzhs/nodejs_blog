import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import postsRouter from './router/posts'
import commentsRouter from './router/comments'
import bodyParser from "body-parser";

const app = express();
const PORT = 8000;

app.use(express.static('public'))

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use('/posts', postsRouter)
app.use('/comments', commentsRouter)

mongoose.connect('mongodb+srv://janis:test123@cluster0.ktzcd.mongodb.net/blog?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to DB')
})

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
