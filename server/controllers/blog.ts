import {Request, Response} from 'express'
import BlogModel from '../models/blogPosts'
import slugify from 'slugify'

export const getAllBlogPosts = async (req: Request, res: Response) => {
    const data = await BlogModel.find()

    res.json(data)
}

export const createPost = async (req: Request, res: Response) => {
    const data = {
        createdAt: new Date(),
        slug: slugify(req.body.title),
        ...req.body
    }

    // res.json('hello')
    const record = new BlogModel(data)
    let error = record.validateSync();

    if(error) {
        res.status(400).json({error})
    } else {
        record.save()
        res.status(200).json("all good")
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
