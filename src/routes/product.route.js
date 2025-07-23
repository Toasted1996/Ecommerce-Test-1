import { Router } from  "express";
import { authRequired } from "../middlewares/validateToken.js"
import { 
    getProduct,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct } from "../controllers/product.controller.js";

/* >RUTA< Y >CRUD< PARA PRODUCTOS */

const router = Router()


router.get('/product', getProducts) // Puede ver todos los productos
router.get('/product/:id', authRequired,getProduct) //Puede ver el producto por ID
router.post('/product', authRequired,createProduct)//Puede crear un producto
router.delete('/product/:id',authRequired,deleteProduct)//Puede eliminar prodcuto por id
router.put('/product/:id', authRequired,updateProduct) // Puede actualizar el producto por id


export default router // Exportamos las rutas para ser usadas