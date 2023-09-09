import express from 'express';
import { createPost, getAllPost, getPostById, deletePost, updatePost } from '../controller/post.js'

const router = express.Router()

router.get('/', getAllPost)

router.get('/getPostId/:id', getPostById)

router.post('/create', createPost)

router.post('/updatePost/:id', updatePost)

router.delete('/deletePost/:id', deletePost)

export default router