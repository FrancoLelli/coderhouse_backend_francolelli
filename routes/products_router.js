import { Router, json } from "express";
import { uploader } from '../file_uploads.js'
import { ProductManager } from "../src/dao/index.js";



const productsRouter = Router();
productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
  try {
    const { limit } = req.query;

    const producto = new ProductManager("./products.json");
    console.log(producto);
    let prods = await producto.getProducts();
    console.log(prods);

    if (limit) {
      res.send(prods.slice(0, limit));
    } else {
      res.send(prods);
    }
  } catch (error) {
    console.log(error);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    let { pid } = req.params;

    const producto = new ProductManager("./products.json");

    let prods = await producto.getProductById(pid);

    if (prods) {
      res.send(prods);
    } else {
      res.send({ error: `No existe producto con id: ${pid}` });
    }
  } catch (error) {
    console.log(error);
  }
});

productsRouter.post("/", uploader.single('thumbnails') ,async (req, res) => {

  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category, 
      quantity
    } = req.body;

    let thumbnails = req.file.path

    const newProd = {
      title,
      description,
      code,
      price,
      status,
      stock,
      thumbnails,
      category,
      quantity
    };

    console.log("Prueba: "+newProd+" Fin Prueba");

    const producto = new ProductManager("./products.json");



    await producto.addProducts({
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      category,
      status,
      quantity
  });

    console.log(newProd);
    
    res.send(newProd);
  } catch (error) {
    console.log(error);
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const id = parseInt(pid);
    const { prop, dato } = req.body;

    const producto = new ProductManager("./products.json");
    let prods = await producto.updateProd(id, prop, dato);

    console.log(prods);

    res.send(prods);
  } catch (error) {
    console.log(error);
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    let { pid } = req.params;

    const producto = new ProductManager("./products.json");

    let prods = await producto.deleteProducts(pid);

    res.send("El producto se elimino correctamente")
    if (prods) {
      res.send(prods);
    } else {
      res.send({ error: `No existe producto con id: ${pid}` });
    }
  } catch (error) {
    console.log(error);
  }
});

export default productsRouter;
