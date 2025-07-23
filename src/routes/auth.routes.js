import {Router} from "express"; //Importando Router de express que permite crear rutas
import { authRequired } from "../middlewares/validateToken.js" //Importando el middleware para validar tokens
import { 
    register, 
    login,
    logout, 
    profile } from "../controllers/auth.controller.js"; //Importando los controladores de autenticación


/* CREACION DE RUTAS */
const router = Router() //Creando una instancia que permite definir rutas 
    
    //DEFINIENDO RUTAS DE AUTENTICACION
    router.post("/register", register);
    router.post("/login", login); 
    router.post("/logout", logout); 
    router.get("/profile", authRequired, profile); // Ruta con autenticacion de token almacenado en cookies

export default router // Exportando el router para que sea usado 