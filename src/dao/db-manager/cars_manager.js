import cartModel from "../models/carts_models.js";
import prodsModel from "../models/products_models.js";

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

  async addCarritoProd(cart_id, product_id) {
    const cart = await cartModel.findById(cart_id);

    const product = await prodsModel.findById(product_id);

    const existingProd = cart.products.find((prod) => {
      return prod.product.code == product.code;
    });

    if (existingProd) {
      existingProd.quantity += 1;
      await cart.save();
    } else {
      cart.products.push({ product: product_id });
      await cart.save();
    }
  }

  async updateQuantity(cid, pid, newQuantity) {
    const cart = await cartModel.findById(cid);

    const existingProd = cart.products.some((product) => {
      return product.product_id == pid;
    });

    let updateProducts;

    if (existingProd) {
      updateProducts = cart.products.map((product) => {
        if (product.product_id == pid) {
          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      });
      console.log("El producto se ha actualizado!");

      cart.products = updateProducts;

      return cart.save();
    } else {
      console.log("El producto no existe!");
    }
  }

  async updateCarrito(cid, pid){
    const cart = await cartModel.findById(cid);
    cart.products.push({ product: pid });
    await cart.save();
  }

  async delete(id) {
    return await cartModel.findByIdAndDelete(id);
  }

  async deleteProd(cid, pid) {
    const cart = await cartModel.findById(cid);

    const existingProd = cart.products.some((product) => {
      return product.product_id == pid;
    });

    let updateProducts;

    if (existingProd) {
      updateProducts = cart.products.filter((prod) => prod.product_id !== pid);
    } else {
      console.log("El producto no existe");
    }

    cart.products = updateProducts;

    return cart.save();
  }

  async deleteAllProd(cid) {
    const cart = await cartModel.findById(cid);

    let newArrayProd = [];

    cart.products = newArrayProd;

    return cart.save();
  }
}
