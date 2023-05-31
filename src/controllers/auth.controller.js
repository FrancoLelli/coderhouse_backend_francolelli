import passport from "passport";
import userModel from "../dao/models/users_models.js";
import { isValidPassword } from "../utils.js";

export const passportSignupController = passport.authenticate(
  "signupStrategy",
  {
    failureRedirect: "/api/sessions/failure-signup",
  }
);

export const productsRedirectController = (req, res) => {
  return res.redirect("/products");
};

export const passportFailureSignupController = (req, res) => {
  res.send("No fue posible registrar al usuario");
};

export const passportGithubController = passport.authenticate("githubSignup");

export const passportGithubCallbackController = passport.authenticate("githubSignup", {
  failureRedirect: "/api/sessions/failure-signup",
});

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      if (isValidPassword(user, password)) {
        req.session.user = user.email;
        res.redirect("/products");
      } else {
        res.send("Credenciales incorrectas");
      }
    }
    res.send(`Usuario no encontrado <a href="/users/registro">Registrarte</a>`);
  } catch (error) {
    console.log(error);
  }
};

export const userLogoutController =  (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.send("La sesion no se pudo cerrar");
    console.log("Session destroy");
    res.redirect("/");
  });
};

export const currentController = (req, res) => {
  res.json({ user: req.user });
};
