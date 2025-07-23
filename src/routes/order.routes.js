import {Router} from "express"
import { authRequired } from "../middlewares/validateToken.js"
import {getOrder,
        getOrders,
        deleteOrders,
        updateOrders,
        createOrders} from "../controllers/order.controller.js"


/* CREACION DE >RUTA< y manejo de >CRUD< PARA PEDIDOS */

const router = Router()

router.get('/order', authRequired,getOrders) //Ver  todos los pedidos 
router.get('/order/:id', authRequired,getOrder) //Ver un solo pedidos 
router.post('/order', authRequired,createOrders) //Crear pedidos
router.delete('/order/:id', authRequired,deleteOrders) //Eliminar
router.put('/order/:id', authRequired,updateOrders) //Actualizar



export default router