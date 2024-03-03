import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
// import posts from './routes/post.js'
// import products from './routes/product.js'
import { PostModel } from './models/PostModel.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors())

app.use(express.json({ limit: '350mb' }))
app.use(express.urlencoded({ extended: true, limit: '350mb' }))

// app.use('/posts', posts)
// app.use('/products', products)

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
    } catch (error) {
        console.log("Error To Connect: ", error);
    }
}

mongoose.connection.on("connected", () => {
    console.log("MONGO Connected");
})

app.listen(PORT, () => {
    connect();
    console.log(`Server listen port: ${PORT}`);
    console.log("Connect Started");
})

app.get('/posts', async (req, res) => {
    try {
        const posts = await PostModel.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.get('/post/:id', async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.post('/create-post', async (req, res) => {
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
})

app.post('/update-post/:id', async (req, res) => {
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
})

app.post('/delete-post/:id', async (req, res) => {
    try {
        const post = await PostModel.findByIdAndDelete(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})