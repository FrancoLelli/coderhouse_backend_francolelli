import { Router, json } from "express";
import CarritoManager from "../carritoManager.js";

const cartsRouter = Router();
cartsRouter.use(json());

cartsRouter.post("/",async (req, res) => {
  try {
    const newCarrito = await new CarritoManager("./carrito.json");
    let prod = await newCarrito.addCarrito();

    res.send(prod);
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const id = parseInt(cid);

    const newCarrito = await new CarritoManager("./carrito.json");

    let prods = await newCarrito.getCarritoById(id);

    console.log(prods);
    res.send(prods);
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const newCarrito = await new CarritoManager("./carrito.json");

    let carga = await newCarrito.addCarritoProd(cid, pid);

    res.send("Producto agregado correctamente")
    console.log(carga);
    res.send(carga);
  } catch (error) {
    console.log(error);
  }
});

export default cartsRouter;
