import express from "express";
import {createProduct, getAllProduct, getProductById, updateProduct, deleteProduct} from '../controller/product.js'

const router = express.Router()

router.post('/createProduct', createProduct)

router.get('/productList', getAllProduct)

router.get('/product/:id', getProductById)

router.post('/updateProduct/:id', updateProduct)

router.post('/deleteProduct/:id', deleteProduct)

export default router;