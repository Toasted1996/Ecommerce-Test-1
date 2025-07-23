
import app from "./app.js"; // importando instacia de express from app.js
import { connectDB } from "./db.js"; //Importamos la funcion que conecta la base de datos


connectDB() // Conectando a la base de datos

//Iniciando el servidor

app.listen(3000) //Iniciando el servidor en el puerto 3000 
console.log("Server on port", 3000); //Mensaje de confirmacion 