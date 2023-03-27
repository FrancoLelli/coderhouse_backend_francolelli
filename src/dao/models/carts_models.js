import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.ObjectId,
        ref: "Producto"
    }]
})

const cartModel = mongoose.model("carts", cartSchema)
export default cartModel