import { Router, json } from "express";
import {
 getProductController,
 getFilterProductController,
 getProductsController,
 createProductController,
 updateProductController,
 deleteProductController,
} from "../src/controllers/product.controller.js";
import { checkRole } from "../src/middlewares/auth.js";

const productsRouter = Router();
productsRouter.use(json());

productsRouter.get("/products", getProductsController);

productsRouter.get("/", getFilterProductController);

productsRouter.get("/:pid", getProductController);

productsRouter.post("/", checkRole("admin"), createProductController);

productsRouter.put(
 "/:pid",
 checkRole(["admin", "superadmin"]),
 updateProductController
);

productsRouter.delete("/:pid", deleteProductController);

export default productsRouter;
