import express from "express"; // Importando express
import morgan from "morgan"; //Importando morgan
import authRoutes from "./routes/auth.routes.js"; // Importando las rutas de autenticación
import orderRoute from  "./routes/order.routes.js"
import productRoute from "./routes/product.route.js"
import cookieParser from "cookie-parser"

const app =express() //Creando instancia de express

app.use(morgan('dev')); //Iniciando morgan para registrar las peticiones HTTP
app.use(express.json()); //Permitiendo que express entienda el formato JSON en las peticiones
app.use(cookieParser()) // Usando la biblioteca cookieParser

app.use("/api", authRoutes); //Usando las rutas de autenticación, ademas de define el prefijo /api para las rutas de la API
app.use("/api", orderRoute); // Usando ruta de ordenes 
app.use("/api", productRoute);

export default app; //exportando la instancia de express