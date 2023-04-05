import { Router } from "express";

const authRouter = Router();

//rutas de auth
authRouter.get("/signup",async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email:email});

        if(!user){
            //si no existe el usuario lo registramos
            const newUser = await userModel.create({email, password});
            req.session.user = newUser.email;
            return res.redirect("products");
        }

        //si ya existe enviamos un mensaje que el usuario ya existe
        res.send(`Usuario ya registrado <a href="/login">Incia sesion</a>`);
        
    } catch (error) {
        console.log(error);
    }
});

authRouter.post("/logout",(req,res)=>{
    req.session.destroy(error=>{
        if(error) return res.send("La sesion no se pudo cerrar");
        res.redirect("/");
    });
});

export default authRouter;
