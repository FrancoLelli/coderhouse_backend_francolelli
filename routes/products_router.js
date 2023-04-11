import { Router, json } from "express";
import { uploader } from "../file_uploads.js";
import { ProductManager } from "../src/dao/index.js";
import prodsModel from "../src/dao/models/products_models.js";
import userModel from "../src/dao/models/users_models.js";

const productsRouter = Router();
productsRouter.use(json());

productsRouter.get("/products", async (req, res) => {
  const usuario = req.session.user;
  let userDatos = await userModel.findOne({ email: usuario });
  let rol;

  /* Verificar si es Admin o Usuario */
  const emailEntrada = usuario
  let email = emailEntrada.toLowerCase()
  const isAdmin = /admin/.test(email);

  if (isAdmin) {
    rol = "Admin";
  } else {
    rol = "Usuario";
  }
  userDatos = { ...userDatos, rol };
  const products = await prodsModel.paginate(
    {},
    {
      limit: 5,
      lean: true,
    }
  );

  res.render("products", { products, userDatos });
});

productsRouter.get("/", async (req, res) => {
  try {
    const { limit, page, sort, category } = req.query;

    const filtroQuery = req.query.query ? { query: { $exists: true } } : {};

    if (category) {
      filtroQuery.category = category;
    }

    const producto = new ProductManager("./products.json");

    /* let prods = await producto.getProducts();  */
    const prods = await prodsModel.paginate(
      {
        ...filtroQuery,
      },
      {
        lean: true,
        limit: limit ?? 10,
        page: page ?? 1,
        sort: { title: sort ?? "asc" },
      }
    );

    res.send(prods);
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
      /* res.send(prods); */
      console.log(prods);
      res.render("product", prods);
    } else {
      res.send({ error: `No existe producto con id: ${pid}` });
    }
  } catch (error) {
    console.log(error);
  }
});

productsRouter.post("/", uploader.single("thumbnails"), async (req, res) => {
  try {
    const { title, description, code, price, status, stock, category } =
      req.body;

    let thumbnails = req.file.path ? req.file.path : [];

    const newProd = {
      title,
      description,
      code,
      price,
      status,
      stock,
      thumbnails,
      category,
    };

    console.log("Prueba: " + newProd + " Fin Prueba");

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
    /* const id = parseInt(pid);
    const { prop, dato } = req.body; */

    const producto = new ProductManager("./products.json");
    let prods = await producto.updateProd(pid, req.body);

    console.log(prods);

    res.send(prods);
  } catch (error) {
    console.log(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    let { pid } = req.params;

    const producto = new ProductManager("./products.json");

    let prods = await producto.deleteProducts(pid);

    res.send("El producto se elimino correctamente");
    next();
  } catch (error) {
    console.log(error);
  }
});

export default productsRouter;
