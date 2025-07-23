import mongoose from "mongoose"; //Importando mongoose 
import orderItemSchema from "./items.order.model.js";

     /* SCHEMA O MODELO DE LOS PEDIDOS  */

const orderSchema = new mongoose.Schema({  // Creando un esquema de mongoose para el modelo de pedido

    user:{ //Usuario logueado. La orden queda asignada a su ObjectId 
        type: mongoose.Schema.Types.ObjectId, // Definiendo el tipo de dato a traves de mongoose
        required: true,
        // Asegurando que el campo sea un string y requerido
        ref : "User",
    
    },
    email: {
        type: String,
        required: true,
        unique: true // Asegurando que el correo sea unico 
    },
    address:{ 
        type:String,
        required:true
    },
    items: [orderItemSchema],
    totalAmount:{
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
    
}, {timestamps: true}) // Agregando timestamps para crear y actualizar automaticamente los campos de createdAt y updatedAt

export default mongoose.model("Order", orderSchema);



 //El modelo es una especie de plantilla que define la estructura de los documentos en una colección de MongoDB