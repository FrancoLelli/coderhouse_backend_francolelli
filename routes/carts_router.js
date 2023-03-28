import { Router, json } from "express";
import { CartManager } from "../src/dao/index.js";

const cartsRouter = Router();
cartsRouter.use(json());

cartsRouter.post("/",async (req, res) => {
  try {
    const newCarrito = await new CartManager("./carrito.json");
    let prod = await newCarrito.addCarrito();

    res.send(prod);
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const newCarrito = await new CartManager("./carrito.json");

    let prods = await newCarrito.getCarritoById(cid);

    console.log(prods);
    res.send(prods);
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;

    const newCarrito = await new CartManager("./carrito.json");

    let carga = await newCarrito.addCarritoProd(cid, pid);

    res.send("Producto agregado correctamente")
    next()
  } catch (error) {
    console.log(error);
  }
});

export default cartsRouter;
