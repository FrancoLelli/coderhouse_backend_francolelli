import prodsModel from "../models/products_models.js";

export default class ProductManagerD {
    async create(product) {
        return await prodsModel.create(product);
    }

    async getById(id) {
        return await prodsModel.findById(id);
    }

    async getAll() {
        return await prodsModel.find({});
    }

    async update(id, product) {
        return await prodsModel.findByIdAndUpdate(id, product);
    }

    async delete(id) {
        return await prodsModel.findByIdAndDelete(id);
    }
}
