import ProductManagerF from "./file-managers/primer-entrega_francolelli.js";
import CartManagerF from "./file-managers/carritoManager.js";
import ProductManagerD from "./db-manager/products_manager.js";
import CartManagerD from "./db-manager/cars_manager.js";

const config = {
    persistenceType: "db"
}

let CartManager, ProductManager

if(config.persistenceType === "db"){
    CartManager = CartManagerD
    ProductManager = ProductManagerD
}else if(config.persistenceType === "file"){
    CartManager = CartManagerF
    ProductManager = ProductManagerF
}else{
    console.log("Error");
}

export { CartManager, ProductManager }