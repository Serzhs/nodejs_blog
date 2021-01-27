import {Request, Response} from 'express'
import BlogModel from '../models/blogPosts'
import slugify from 'slugify'

export const getAllBlogPosts = async (req: Request, res: Response) => {
    const data = await BlogModel.find()

    res.json(data)
}

export const createPost = async (req: Request, res: Response) => {
    const {title, description} = req.body

    const data = {
        createdAt: new Date(),
        slug: slugify(req.body.title),
        thumbnail: req.file.path.replace('public', ''),
        title,
        description
    }

    const record = new BlogModel(data)
    let error = record.validateSync();

    if (!error) {
        record.save()
        res.status(200).json("all good")
    } else {
        res.status(400).json({error})
    }
}


export const getOnePost = async (req: Request, res: Response) => {
    const record = await BlogModel.findOne({
        slug: req.params.slug
    })

    res.json(record)
}


export const deletePost = async (req: Request, res: Response) => {
    const record = await BlogModel.deleteOne({
        slug: req.params.slug
    })

    res.json(record)
}
