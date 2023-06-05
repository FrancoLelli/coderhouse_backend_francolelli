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
import { options } from "./config/options.js";
import transporter from "./config/gmail.js";
import { twilioClient, twilioPhone } from "./config/twilio.js";
import { checkRole } from "./middlewares/auth.js";
import compression from "express-compression";
import { errorHandler } from "./middlewares/auth.js";
import { addLogger } from "./utils/logger.js";
import { mockProductController } from "./controllers/mockProduct.controller.js";

import prods from "../products.json" assert { type: "json" };

const database = options.mongoDB.url;
const port = options.server.port;

const app = express();

mongoose.connect(database).then((conn) => {
  console.log("Connected to DB!");
});

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: database,
    }),
    secret: options.server.secretSession,
    resave: true,
    saveUninitialized: true,
  })
);

initializedPassport();
app.use(passport.initialize());
app.use(passport.session());

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
app.use(errorHandler);
app.use(addLogger);

const httpServer = app.listen(port, () => {
  console.log("Server On");
});

const emailTemplate = `<div>
        <h1>Bienvenido!!</h1>
        <img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
        <p>Ya puedes empezar a usar nuestros servicios</p>
        <a href="https://www.google.com/">Explorar</a>
</div>`;

app.post("/register", async (req, res) => {
  try {
    await transporter.sendMail({
      from: "E-Commerce Franco's Market",
      to: "franlelli1966@gmail.com",
      subject: "Register Succesfull",
      html: emailTemplate,
    });
    res.json({ status: "success", message: "Nice register" });
  } catch (error) {
    res.json({ status: "error", message: "Error when try register an user" });
  }
});

app.post("/twilio-coder", async (req, res) => {
  try {
    const message = await twilioClient.messages.create({
      body: "Holi charly, te lo mando desde el codigo que estoy creando",
      from: twilioPhone,
      to: "+543465415803",
    });
    res.json({ status: "success", message: "Nice buy and send a message" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Error when try doing a buy" });
  }
});

app.get("/mockingproducts", mockProductController);

app.get("/logger", (req, res) => {
  res.send("Bienvenido");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", checkRole(["user"]), (socket) => {
  console.log("New Client");

  socket.on("message", (data) => {
    console.log(data);
  });

  socket.emit("productos_update", prods);
});
