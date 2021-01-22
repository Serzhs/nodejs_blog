import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import router from './router'

const app = express();
const PORT = 8000;

app.use(cors())
app.use(express.static('public'))

app.use('/posts', router)

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
