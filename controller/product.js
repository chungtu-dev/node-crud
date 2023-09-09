import { ProductModel } from '../models/ProductModel.js'

export const createProduct = async (req, res) => {
    try {
        if (!req.body) {
            res.status(404).json({ message: 'Invalid product' })
            return
        }
        const product = await ProductModel(req.body)
        res.status(200).json(product)
        await product.save()
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const products = await ProductModel.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(product)
    } catch (error) {
        res.status(200).json(product)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}