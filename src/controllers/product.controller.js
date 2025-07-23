import Product from "../models/product.model.js";

        /* CRUD PRODUCTOS */

    /* CONSULTAR TODOS LOS PRODUCTOS -- OK*/
export const getProducts =  async (req,res) => {
    try{
        const products = await Product.find()
        console.log('Consulta exitosa')
        res.json(products)

    }catch(error){
        console.error('Error cannot find products', error)
        res.status(500).json({message: 'Internal server error, cannot find products'})
    }
}

    /* CREAR PRODUCTOS -- OK*/
export const createProduct = async (req, res) => {
    try{
        const {productName, description, category, stock, price} = req.body
        //Validaciones para crear
        if(!productName || !price || stock === undefined || stock === null){
            return res.status(400).json({message: 'productName, price and stock are obligatory to create product'})
        }
        if (price < 0 || stock < 0){
            return res.status(400).json({message: 'Price and stock cannot be negative numbers'})
        }
    // Nueva instancia de product.model con los datos del body
        const newProduct = new Product({
            productName,
            description,
            category,
            stock,
            price
        })
        // Save products
        const saveProduct = await newProduct.save()
        res.json(saveProduct)
    }catch(error){
        console.error('No created',error)
        if(error.code === 11000){ //Codigo de valor duplicado en MongoDB
            return res.status(400).json({message:'Duplicate product (productName)'})
        }
        res.status(500).json({message :'Internal server error'})
    }
}
    /* CONSULTA PRODUCTO BY ID -- OK */   
export const getProduct = async (req,res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({message:'Product not found'})
        }
        console.log('Query by ID Succesfully')
        res.json(product)
    }catch(error){
        console.error('Query by id denied', error)
        if(error.name === 'CastError'){
            return res.json(400)({message:'Invalid product ID'})
        }
        res.status({message: 'Internal server error', error: error.message})
    }
}
    /* DELETE PRODUCTO BY ID -- OK */
export const deleteProduct = async (req, res) => {
    try{

        const deleteProduct = await Product.findByIdAndDelete(req.params.id)
        if(!deleteProduct){
            return res.status(404).json({message : 'Product ID not found'})
        }
        console.log('Producto eliminado exitosamente', deleteProduct)
        res.sendStatus(204)

    }catch(error){
        console.error('Cannot delete', error)
        if(error.name === 'CastError'){
            return res.status(400).json({message: 'Product ID invalid'})
        }
        res.status(500).json({message:'Internal server Error', error: message})
    }

}
    /* UPDATE PRODUCT BY ID -- OK */ 
export const updateProduct = async (req, res) => {
    try{

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, 
            req.body,
            {new: true, runValidators: true}
        )
        if(!updatedProduct){
            return res.status(404).json({message:'Product ID not found, cannot be update'})
        }
        console.log('Product updated', updatedProduct)
        res.json(updateProduct)
    }catch(error){
        if(error.name === 'CastError'){
            return res.status(400).json({message:'Product ID invalid'})
        }
        res.status(500).json({message:'Internal server error, cannot be update', error: error.message})
    }
}