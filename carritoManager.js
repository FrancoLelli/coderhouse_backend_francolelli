import { log } from "console";
import fs from "fs";

export default class CarritoManager {
  #path;

  constructor(path) {
    this.#path = path;
  }

  async getCarrito() {
    try {
      const carrito = await fs.promises.readFile(this.#path, "utf-8");

      return JSON.parse(carrito);
    } catch (err) {
      return [];
    }
  }

  async getCarritoById(idBuscar) {
    try {
      const carrito = await this.getCarrito();

      const buscarCarritoById = await carrito.find(
        (carrito) => carrito.id == idBuscar
      );

      return buscarCarritoById;
    } catch (err) {
      return [];
    }
  }

  async addCarrito() {
    const carritos = await this.getCarrito();

    const newCarrito = {
      id: carritos.length + 1,
      productos: [],
    };

    console.log(carritos);

    const updateCarrito = [...carritos, newCarrito];

    await fs.promises.writeFile(this.#path, JSON.stringify(updateCarrito));

    res.send("Producto agregado correctamente")
  }

  async addCarritoProd(cid, pid) {
    const cartId = parseInt(cid);

    const productId = parseInt(pid);

    let carrosTotal = await this.getCarrito();

    let newProdCant = {
      id: productId,
      quantity: 1,
    };

    let existCart = carrosTotal.find((carro) => {
      return carro.id === cartId;
    });

    if (existCart) {
      let productosActual = carrosTotal[cartId - 1].productos;

      let existProd = productosActual.some((prod) => {
        return prod.id == productId;
      });

      if (existProd) {
        
        let prodSeleccionado = carrosTotal[cartId - 1].productos[productId - 1];
        prodSeleccionado.quantity = prodSeleccionado.quantity + 1

        await fs.promises.writeFile(this.#path, JSON.stringify(carrosTotal));

        console.log("Producto agregado correctamente");

      } else {
        carrosTotal[cartId - 1].productos.push(newProdCant);
        await fs.promises.writeFile(this.#path, JSON.stringify(carrosTotal));

        console.log("Producto agregado correctamente");
      }
    } else {
      console.log("El carro no existe");
    }
  }
}
