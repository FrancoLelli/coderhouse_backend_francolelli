import { Router, json } from "express";
import { getProductController, getFilterProductController, getProductsController, createProductController, updateProductController, deleteProductController } from "../src/controllers/product.controller.js";

const productsRouter = Router();
productsRouter.use(json());

productsRouter.get("/products", getProductsController);

productsRouter.get("/", getFilterProductController);

productsRouter.get("/:pid", getProductController);

productsRouter.post("/", createProductController);

productsRouter.put("/:pid", updateProductController);

productsRouter.delete("/:pid", deleteProductController);

export default productsRouter;
