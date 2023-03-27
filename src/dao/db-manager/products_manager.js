import prodsModel from "../models/products_models.js";

export default class ProductManagerD {
    async addProducts(product) {
        return await prodsModel.create(product);
    }

    async getById(id) {
        return await prodsModel.findById(id);
    }

    async getProducts() {
        return await prodsModel.find({});
    }

    async updateProd(id, product) {
        return await prodsModel.findByIdAndUpdate(id, product);
    }

    async deleteProducts(id) {
        return await prodsModel.findByIdAndDelete(id);
    }
}
