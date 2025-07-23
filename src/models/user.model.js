import mongoose from "mongoose"; //Importando mongoose 

/* SCHEMA O MODELO DE USUARIO */

const userSchema = new mongoose.Schema({  // Creando un esquema de mongoose para el modelo de usuario

    username:{ //Definiendo el campo username
        type: String,
        // Asegurando que el campo sea un string y requerido
        required: true,
        trim: true //elimina los espacios al principio y al final    
    },
    email: {
        type: String,
        required: true,
        unique: true // Asegurando que el correo sea unico 
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true}) // Agregando timestamps para crear y actualizar automaticamente los campos de createdAt y updatedAt

export default mongoose.model("User", userSchema);


 //El modelo es una especie de plantilla que define la estructura de los documentos en una colección de MongoDB