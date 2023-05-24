import cartModel from "../dao/models/carts_models.js";
import prodsModel from "../dao/models/products_models.js";
import { v4 as uuidv4 } from "uuid";
import { ticketsModel } from "../dao/models/ticket_models.js";

const createCart = async (req, res) => {
 try {
  const cartCreated = await cartModel.create({});
  res.send(cartCreated);
 } catch (error) {
  res.send(error.message);
 }
};

const updateCart = async (req, res) => {
 try {
  const { cartId, productId, quantity } = req.body;
  const cart = await cartModel.findById(cartId);
  cart.products.push({ id: productId, quantity: quantity });
  cart.save();
  res.send("producto agregado");
 } catch (error) {
  res.send(error.message);
 }
};

const deleteCart = async (req, res) => {
 try {
  const { cid } = req.params;

  const newCarrito = await new CartManager("./carrito.json");

  await newCarrito.deleteAllProd(cid);

  res.send("Se ha eliminado todos los productos del carrito");
  console.log("Se ha eliminado todos los productos del carrito");
 } catch (error) {
  console.log(error);
 }
};

const deleteProductCart = async (req, res) => {
 try {
  const { cid, pid } = req.params;

  const newCarrito = await new CartManager("./carrito.json");

  let prods = await newCarrito.deleteProd(cid, pid);

  console.log(prods);
  console.log("Producto eliminado del carrito");
 } catch (error) {
  console.log(error);
 }
};

const createPurchase = async (req, res) => {
 try {
  const cartId = req.params.cid;
  const cart = await cartModel.findById(cartId);
  if (cart) {
   if (!cart.products.length) {
    return res.send(
     "es necesario que agrege productos antes de realizar la compra"
    );
   }
   const ticketProducts = [];
   const rejectedProducts = [];
   for (let i = 0; i < cart.products.length; i++) {
    const cartProduct = cart.products[i];
    const productDB = await prodsModel.findById(cartProduct.id);
    if (cartProduct.quantity <= productDB.stock) {
     ticketProducts.push(cartProduct);
    } else {
     rejectedProducts.push(cartProduct);
    }
   }
   console.log("ticketProducts", ticketProducts);
   console.log("rejectedProducts", rejectedProducts);
   const newTicket = {
    code: uuidv4(),
    purchase_datetime: new Date().toLocaleString(),
    amount: 500,
    purchaser: req.user.email,
   };
   const ticketCreated = await ticketsModel.create(newTicket);
   res.send(ticketCreated);
  } else {
   res.send("el carrito no existe");
  }
 } catch (error) {
  res.send(error.message);
 }
};

const cartController = {
 createCart,
 updateCart,
 deleteCart,
 deleteProductCart,
 createPurchase,
};

export default cartController;
