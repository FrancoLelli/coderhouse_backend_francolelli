import cartModel from "../models/carts_models.js";

export default class CartManagerD {
    async addCarrito(product) {
        return await cartModel.create(product);
    }

    async getCarritoById(id) {
        return await cartModel.findById(id);
    }

    async getCarrito() {
        return await cartModel.find({});
    }

    async addCarritoProd(id, product) {
        return await cartModel.findByIdAndUpdate(id, product);
    }

    async delete(id) {
        return await cartModel.findByIdAndDelete(id);
    }
}