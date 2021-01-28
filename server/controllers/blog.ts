import {Request, Response} from 'express'
import PostModel from '../models/posts'
import CommentModel from '../models/comment'
import slugify from 'slugify'

export const getAllBlogPosts = async (req: Request, res: Response) => {
    const data = await PostModel.find()

    res.json(data)
}

export const createPost = async (req: Request, res: Response) => {
    const {title, description} = req.body

    const data = {
        slug: slugify(req.body.title),
        thumbnail: req.file.path.replace('public', ''),
        title,
        description
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
    const record = await PostModel.deleteOne({
        slug: req.params.slug
    })

    res.json(record)
}
