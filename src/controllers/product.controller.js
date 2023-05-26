import prodsModel from "../dao/models/products_models.js";
import ProductManagerD from "../dao/db-manager/products_manager.js";
import userModel from "../dao/models/users_models.js";
import EEror from "../enums/EError";

const productManager = new ProductManagerD(prodsModel);

export const getProductsController = async (req, res) => {
  const usuario = req.session.user;
  let userDatos = await userModel.findOne({ email: usuario });
  let rol;

  const emailEntrada = usuario;
  let email = emailEntrada.toLowerCase();
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
};

export const getFilterProductController = async (req, res) => {
  try {
    const { limit, page, sort, category } = req.query;

    const filtroQuery = req.query.query ? { query: { $exists: true } } : {};

    if (category) {
      filtroQuery.category = category;
    }

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
};

export const getProductController = async (req, res) => {
  try {
    let { pid } = req.params;

    let prods = await productManager.getProductById(pid);

    if (prods) {
      console.log(prods);
      res.render("product", prods);
    } else {
      res.send({ error: `No existe producto con id: ${pid}` });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createProductController = async (req, res) => {
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

    await productManager.addProducts({
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
};

export const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params;

    let prods = await productManager.updateProd(pid, req.body);

    console.log(prods);

    res.send(prods);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductController = async (req, res, next) => {
  try {
    let { pid } = req.params;

    let prods = await productManager.deleteProducts(pid);

    res.send("El producto se elimino correctamente");
    next();
  } catch (error) {
    console.log(error);
  }
};
