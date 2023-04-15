import express from "express";
import cartsRouter from "../routes/carts_router.js";
import productsRouter from "../routes/products_router.js";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import viewsRouter from "../routes/views_router.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import helpers from "handlebars-helpers";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";
import webRouter from "../routes/web_router.js";
import authRouter from "../routes/auth_router.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initializedPassport } from "./config/passport_config.js";

import prods from "../products.json" assert { type: "json" };

const database =
  "mongodb+srv://francolelli:prueba123@cluster0.hyaqfeo.mongodb.net/ecommerce?retryWrites=true&w=majority";

const app = express();

mongoose.connect(database).then((conn) => {
  console.log("Connected to DB!");
});

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: database,
    }),
    secret: "claveSecreta",
    resave: true,
    saveUninitialized: true,
  })
);

initializedPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({ extended: true }));
app.engine(
  "handlebars",
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: helpers,
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname + "/views"));

app.use(express.static(__dirname + "/../public"));

app.use(webRouter);
app.use("/api/sessions", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/prueba", viewsRouter);
app.use(express.json());

const httpServer = app.listen(8080, () => {
  console.log("Server On");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("New Client");

  socket.on("message", (data) => {
    console.log(data);
  });

  socket.emit("productos_update", prods);
});
