import mongoose from "mongoose";

/* SCHEMA O MODELO DE PRODUCTO */

const productSchema = new mongoose.Schema({
     // Creando un esquema de mongoose para el modelo de producto
        productName: {
            type: String,
            
        
        },
        description:{
            type: String
        
        },
        category:{ 
            type:String,
            
        },
        stock:{
            type: Number,
            min : 0, //cantidad minima de stock
            default: 0 //Cantidad stock por defecto
        },
        price:{
            type:Number,
            required:true,
            min: 0 //Minimo 0 porque precio cannot be negative
        },
    }, {timestamps: true}) // Agregando timestamps para crear y actualizar automaticamente los campos de createdAt y updatedAt
    
    export default mongoose.model("Product", productSchema);
