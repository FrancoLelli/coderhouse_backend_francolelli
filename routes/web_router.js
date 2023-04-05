import {Router} from "express";

const webRouter = Router();

//rutas de las vistas
/* webRouter.get("/",(req,res)=>{
    res.render("home");
});

webRouter.get("/login",(req,res)=>{
    res.render("login");
});
 */
webRouter.post("/api/products/products",(req,res)=>{
    res.render("products");
});

/* webRouter.get("/logout",(req,res)=>{
    res.render("registro");
});


webRouter.get("/profile",(req,res)=>{
    console.log(req.session);
    res.render("perfil");
}); */

export default webRouter