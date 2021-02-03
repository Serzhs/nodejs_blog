import {Request, Response} from "express";
import CommentModel, {Comment} from "../models/comment";
import PostModel from "../models/posts";

export const createPostComment = async (req: Request, res: Response) => {
    const {author, comment} = req.body
    const {slug} = req.params

    const record = new CommentModel({
        author,
        comment
    })

    let error = record.validateSync();

    if (!error) {
        const post = await PostModel.findOne({slug})
        post.comments.push(record._id)
        post.save()

        record.save()

        res.status(200).json(record)
    } else {
        res.status(400).json({error})
    }
}


export const getPostComment = async (req: Request, res: Response) => {

}
