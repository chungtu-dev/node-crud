import { PostModel } from '../models/PostModel.js'

export const createPost = async (req, res) => {
    try {
        if (!req.body) {
            res.status(404).send({ message: "Content cannot empty" })
            return;
        }
        const post = new PostModel(req.body)
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some thing wrong when Create Post"
        })
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await PostModel.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const updatePost = async (req, res) => {
    try {
        const postParams = req.body
        const postUpdate = await PostModel.findByIdAndUpdate(
            req.params.id,
            { $set: postParams },
            { new: true }
        )
        res.status(200).json(postUpdate)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await PostModel.findByIdAndDelete(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}