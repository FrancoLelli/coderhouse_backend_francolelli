import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const prodsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

prodsSchema.plugin(mongoosePaginate)

const prodsModel = mongoose.model("products", prodsSchema)
export default prodsModel