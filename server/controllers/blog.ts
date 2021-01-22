import {Request, Response} from 'express'
import BlogModel from '../models/blogPosts'

export const getAllBlogPosts = async (req: Request, res: Response) => {
    const data = await BlogModel.find()

    res.send(data)
}
