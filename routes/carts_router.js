import { Router, json } from "express";
import { CartManager } from "../src/dao/index.js";

const cartsRouter = Router();
cartsRouter.use(json());

cartsRouter.post("/", async (req, res) => {
  try {
    const newCarrito = await new CartManager("./carrito.json");

    let prod = await newCarrito.addCarrito();

    res.send(prod);
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const newCarrito = await new CartManager("./carrito.json");

    await newCarrito.addCarritoProd(cid, pid);

    res.send("Producto agregado correctamente");
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const newCarrito = await new CartManager("./carrito.json");

    let carts = await newCarrito.getCarritoById(cid);

    res.render("cart", carts )  
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const prodIds = req.body.prods_id

    const newCarrito = await new CartManager("./carrito.json");

    await newCarrito.deleteAllProd(cid)

    prodIds.forEach( async (id) => {
      await newCarrito.updateCarrito(cid, id)
    })

    res.send("Carrito actualizado correctamente")

  } catch (error) {
    console.log(error);
  }
})

cartsRouter.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const newQuantity = req.body.newQuantity

    const newCarrito = await new CartManager("./carrito.json");

    const result = await newCarrito.updateQuantity(cid, pid, newQuantity);

    console.log(result);
    res.send("Producto modificado correctamente");

  } catch (error) {
    console.log(error);
  }
})

cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    
    const newCarrito = await new CartManager("./carrito.json");

    let prods = await newCarrito.deleteProd(cid, pid);

    console.log(prods);
    console.log("Producto eliminado del carrito");

  } catch (error) {
    console.log(error);
  }
});

cartsRouter.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params

    const newCarrito = await new CartManager("./carrito.json");

    await newCarrito.deleteAllProd(cid)

    res.send("Se ha eliminado todos los productos del carrito")
    console.log("Se ha eliminado todos los productos del carrito");

  } catch (error) {
    console.log(error);
  }
});

export default cartsRouter;
