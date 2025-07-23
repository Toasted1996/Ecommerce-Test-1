import mongoose from "mongoose"; //Importando mongoose para la conexion con mongoDB


/* CONEXION BASE DE DATOS - MONGODB */

export const connectDB = async () => { //Funcion para conectar a la base de datos

    try{ //Validacion de la conexion
        await mongoose .connect('mongodb://localhost:27017/entrega4') //Conectando a la base de datos
        console.log(">>> DB is connected <<<"); //Mensaje de conexion exitosa
    
    }catch(error){ //Captura el error si la conexion falla
        console.log("Error al conectar a la base de datos", error); // Muestra el mensaje de error 
    
    }
};