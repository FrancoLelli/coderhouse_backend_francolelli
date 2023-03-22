import mongoose from "mongoose";

const prodsSchema = new mongoose.Schema({
    title: {
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

const prodsModel = mongoose.model("products", prodsSchema)
export default prodsModel