import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const ProductModel = mongoose.model('Product', schema)