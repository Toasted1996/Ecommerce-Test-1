import mongoose from 'mongoose'


 /* SCHEMA O MODELO PARA ARRAY ITEMS - ORDERS */

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    nameAtOrder: {
        type: String,
        required: true,
    },
    priceAtOrder: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true, // Make sure this is 'required'
        min: 1,
    },
}, { _id: false });

export default orderItemSchema;