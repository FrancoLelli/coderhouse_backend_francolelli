import { Router } from "express";
import {
  userLogoutController,
  currentController,
  userLoginController,
  passportFailureSignupController,
  passportGithubCallbackController,
  passportSignupController,
  productsRedirectController,
  passportGithubController,
} from "../src/controllers/auth.controller.js";

const authRouter = Router();

//rutas de auth
authRouter.post("/users/signup", passportSignupController, productsRedirectController);

authRouter.get("/failure-signup", passportFailureSignupController);

authRouter.get("/github", passportGithubController);

authRouter.get("/github-callback", passportGithubCallbackController);

authRouter.post("/users/login", userLoginController, productsRedirectController);

authRouter.get("/users/logout", userLogoutController);

authRouter.get("/current", currentController);

export default authRouter;
