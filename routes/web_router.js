import {Router} from "express";

const webRouter = Router();

//rutas de las vistas
webRouter.get("/",(req,res)=>{
    res.render("login");
});

webRouter.get("/users/registro",(req,res)=>{
    res.render("registro");
});


webRouter.post("/users/signup",(req,res)=>{
    res.send("ok");
});

webRouter.post("/api/products/products",(req,res)=>{
    res.render("products");
});

webRouter.get("/users/logout",(req,res)=>{
    res.render("login");
});


webRouter.get("/profile",(req,res)=>{
    console.log(req.session);
    res.render("perfil");
}); 

export default webRouter