import {Request, Response} from 'express'
import PostModel, {Post} from '../models/posts'
import CommentModel from '../models/comment'
import slugify from 'slugify'
import { v4 as uuidv4 } from 'uuid';
import {deleteFile} from "../services/deleteFile";

export const getAllBlogPosts = async (req: Request, res: Response) => {
    const data = await PostModel.find()

    res.json(data)
}

export const createPost = async (req: Request, res: Response) => {
    const {title, description} = req.body
    const {file} = req

    if(!file?.path) {
        res.status(400).json('File is requred')
        return
    }

    let slug = slugify(req.body.title)
    const postWithSameSlug = await PostModel.findOne({slug: slug})

    if (postWithSameSlug) {
        slug += `-${uuidv4().substr(0, 5)}`
    }

    const data = {
        slug,
        title,
        description,
        thumbnail: req.file.path.replace('public', ''),
    }

    const record = new PostModel(data)

    let error = record.validateSync();

    if (!error) {
        record.save()
        res.status(200).json("all good")
    } else {
        res.status(400).json({error})
    }
}

export const getOnePost = async (req: Request, res: Response) => {
    const {slug} = req.params
    const record = await PostModel.findOne({
        slug
    })

    const commentRecords = record.comments.map((_id: string) => {
        return CommentModel.findOne({_id})
    })

    const comments = await Promise.all(commentRecords)

    const {thumbnail, title, description, createdAt, _id} = record

    res.json({_id, thumbnail, title, description, comments, createdAt})
}

export const deletePost = async (req: Request, res: Response) => {

    return res.json(123)

    const {slug} = req.params

    const record = await PostModel.findOneAndDelete({
        slug
    })

    await deleteFile(`./public/${record.thumbnail}`).catch((error) => {
        res.status(400).json({error})
    })

    res.json(record)
}

export const editPost = async (req: Request, res: Response) => {
    const {slug} = req.params
    const updatedData = req.body as Post

    if(req.file) {

        const record = await PostModel.findOne({
            slug
        })

        await deleteFile(`./public/${record.thumbnail}`)

        updatedData.thumbnail = req.file.path.replace('public', '')
    }

   await PostModel.findOneAndUpdate({slug}, updatedData)

    res.json('all good')
}
