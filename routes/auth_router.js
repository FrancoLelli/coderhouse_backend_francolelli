import { Router } from "express";
import userModel from "../src/dao/models/users_models.js";
import { createHash, isValidPassword } from "../src/utils.js";
import passport from "passport";

const authRouter = Router();

//rutas de auth
authRouter.post(
  "/users/signup",
  passport.authenticate("signupStrategy", {
    failureRedirect: "/api/sessions/failure-signup",
  }),
  (req, res) => {
    res.send("Usuario registrado");
  }
);
/* try {
    const { email, password, last_name, first_name, age } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      //si no existe el usuario lo registramos
      const newUser = await userModel.create({
        email,
        password,
        age,
        last_name,
        first_name,
      });
      req.session.user = newUser.email;
      return res.redirect("/api/products/products");
    }

    //si ya existe enviamos un mensaje que el usuario ya existe
    res.send(`Usuario ya registrado <a href="/">Incia sesion</a>`);
  } catch (error) {
    console.log(error);
  } */

authRouter.get("/failure-signup", (req, res) => {
  res.send("No fue posible registrar al usuario");
});

authRouter.get("/github", passport.authenticate("githubSignup"));

authRouter.get(
  "/github-callback",
  passport.authenticate("githubSignup", {
    failureRedirect: "/api/sessions/failure-signup",
  }),
  (req, res) => {
    res.send("Usuario autenticado");
  }
);

authRouter.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
        if(isValidPassword(user, password)){
            req.session.user = user.email;
            res.send("Login exitoso");
        }else{
            res.send("Credenciales incorrectas")
        }
    }
    res.send(
        `Usuario no encontrado <a href="/users/registro">Registrarte</a>`
    );
   /*  if (!user) {
      //si no existe el usuario lo registramos
    } else {
      if (user.email == email && password == user.password) {
      } else {
        res.send(`Log In not found <a href="/">Login</a>`);
      }
    } */
  } catch (error) {
    console.log(error);
  }
});

authRouter.get("/users/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.send("La sesion no se pudo cerrar");
    console.log("Session destroy");
    res.redirect("/");
  });
});

export default authRouter;
