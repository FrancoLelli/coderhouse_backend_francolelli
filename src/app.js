import express from "express";
import cartsRouter from "../routes/carts_router.js";
import productsRouter from "../routes/products_router.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import viewsRouter from "../routes/views_router.js"

import prods from "../products.json" assert { type: "json" };

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/../public"))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/prueba", viewsRouter)
app.use(express.json())


const httpServer = app.listen(8080, () => {
  console.log("Server On");
});

const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) => {
  console.log("New Client");

  socket.on("message", (data) => {
    console.log(data);
  })

  socket.emit("productos_update", prods)
})