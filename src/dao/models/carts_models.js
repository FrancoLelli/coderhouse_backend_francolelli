import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: {
        type: String,
        required: true
    }
})

const cartModel = mongoose.model("carts", cartSchema)
export default cartModel