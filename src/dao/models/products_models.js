import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const prodsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        required: true
    }
})

prodsSchema.plugin(mongoosePaginate)

const prodsModel = mongoose.model("products", prodsSchema)
export default prodsModel