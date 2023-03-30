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

    addCarritoProd = async (cart_id, product_id) => {
        const cart = await cartModel.findById(cart_id)

        const existingProd = cart.products.some((product) => {
            return product.product_id == product_id
        })

        let updateProducts

        if(existingProd){

            updateProducts = cart.products.map((product) => {
                if(product.product_id === product_id){
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    }
                }

                return product
            })
            console.log("El producto se ha sumado a la cantidad existente!");
        }else{
            console.log("Nuevo Producto en el carrito!");
            updateProducts = [...cart.products, { product_id, quantity: 1 }]
        }

        cart.products = updateProducts

        return cart.save()
    }

    async delete(id) {
        return await cartModel.findByIdAndDelete(id);
    }
}