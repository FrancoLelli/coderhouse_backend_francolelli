import cartModel from "../models/carts_models.js";

export default class CartManagerD {
    async create(product) {
        return await cartModel.create(product);
    }

    async getById(id) {
        return await cartModel.findById(id);
    }

    async getAll() {
        return await cartModel.find({});
    }

    async update(id, product) {
        return await cartModel.findByIdAndUpdate(id, product);
    }

    async delete(id) {
        return await cartModel.findByIdAndDelete(id);
    }
}