import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import posts from './routes/post.js'
import products from './routes/product.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors())

// app.use(express.json({ limit: '350mb' })) //
// app.use(express.urlencoded({ extended: true, limit: '350mb' }))

app.use('/posts', posts)
app.use('/products', products)

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

