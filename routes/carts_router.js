import { Router, json } from "express";
import { CartManager } from "../src/dao/index.js";
import cartController from "../src/controllers/cart.controller.js";
import { checkRole } from "../src/middlewares/auth.js";

const cartsRouter = Router();
cartsRouter.use(json());

cartsRouter.post("/", cartController.createCart);

cartsRouter.post(
  "/:cid/products/:pid",
  checkRole("user"),
  cartController.updateCart
);

cartsRouter.delete("/:cid/products/:pid", cartController.deleteProductCart);

cartsRouter.delete("/:cid", cartController.deleteCart);

export default cartsRouter;
