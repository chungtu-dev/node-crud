import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const PostModel = mongoose.model('Post', schema)