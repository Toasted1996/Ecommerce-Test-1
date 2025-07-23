import Order from "../models/order.model.js"
import Product from "../models/product.model.js"

/* CRUD BASE DE DATOS */

    /* VER TODOS LOS PEDIDOS / USUARIO LOGUEADO -- OK  */

export const getOrders = async (req, res) => {
    try{
        const orders = await Order.find({user:req.user.id})
        .populate('user','username email')
        .populate('items.product', 'productName price')
        res.json(orders)
        console.log('Vista pedidos exitosa', orders)
    
    }catch(error){
        console.error('Error al obtener pedidos', error);
        res.status(500).json({message: 'Unexpected intern error, cannot find the order'})
    }

}

    /* CREAR PEDIDOS  / GUARDA CON ID DE QUIEN CREA PEDIDOS --OK  */

export const createOrders = async (req, res) => {
    try{
        const {email,address, items} = req.body // Items sera un array que contenga la informacion de los productos

        if(!items || !Array.isArray(items) || items.length === 0){ // Condicion, si el arraya esta vacio debe entrega el mensajesa
            console.log("Error: El array 'items' está ausente, no es un array o está vacío.")
            console.log("req.body (datos recibidos):", req.body)
            return res.status(400).json({message:"Need a product"})
        }

        let totalAmount = 0
        const orderItems= []

        /* ITERACION EN EL ARRAY ITEMS */

        let itemIndex = 0 
        for (const item of items){
            itemIndex ++
            console.log(`DEBUG: Procesando item #${itemIndex}: ${JSON.stringify(item)}`); // Qué item se está procesando
            if(!item.productId || !item.quantity){
                return res.status(400).json({message:'each product need an id and quantity'})
            }
            if(item.quantity <= 0){
                return res.status(400).json({message:`Quantity for ${item.productId} must be higher than 0`})
            }
            const product = await Product.findById(item.productId)
            if(!product){
                return res.status(400).json({message: `ProductId ${item.prodcutId} not found`})
            }
            console.log("DEBUG: Objeto 'product' encontrado de la base de datos:", JSON.stringify(product, null, 2));

            if (product.stock < item.quantity){
                res.status(400).json({message:`Stock insuficiente de ${product.productName} Stock diponible ${product.stock}`})
            }
            product.stock -= item.quantity
            await product.save()

        /* INGRESO DE PRODUCTOS EN EL ARRAY DE ITEMS */
            orderItems.push({
                product: product._id, 
                nameAtOrder: product.productName,
                priceAtOrder: product.price,
                quantity: item.quantity,
            })
            console.log("Item agregado a orderItems:", orderItems[orderItems.length - 1])
            totalAmount += product.price * item.quantity
        }
        
        console.log("DEBUG: Todos los items procesados. Preparando para guardar la orden.");
        console.log("DEBUG: FINAL orderItems array ANTES de new Order():", JSON.stringify(orderItems, null, 2));

        const newOrder = new Order({
            user: req.user.id, // Usamos el modelo de User para trar su informacion como ObjectId con mongoose
            email,
            address,
            items:[...orderItems],
            totalAmount,
        })
        console.log("Nueva instancia de orden a guardar:", newOrder);
        console.log("DEBUG: Instancia de Order creada con éxito.");
        console.log("DEBUG: Objeto newOrder (antes de guardar):", JSON.stringify(newOrder, null, 2));
        console.log("DEBUG: Intentando guardar la orden en la base de datos...");

        const saveOrder = await newOrder.save()
        console.log('PUSH INTO ARRAY')
        return res.status(201).json({message: 'Order created'})
        

    }catch (error){
        console.log('Error order cannot be create', error)
        res.status(500).json({message: 'Error, order cannot be created'})
    }    
}

   /* BUSQUEDA DE ORDEN BY ID / CON DATOS DE CREACION DEL PEDIDO -- OK */

export const getOrder = async (req, res) => {
    try{

        const order = await Order.findById(req.params.id)
        .populate('user','username') //Busca el id que esta en la ruta para encontrar la orden
        .populate('items.product','productName')
    
        if (!order) return res.status(404).json({message: " ID Order not found"}) //Si es ! a Order devuelve un estado not found
        res.json(order)
        console.log('Consulta exitosa')

    }catch(error){
        console.error('Error cannot find Order', error)
        res.status(500).json({message: 'Error cannot find Order'})
    }
}
    /* ACTUALIZACION PEDIDO -- OK */

export const updateOrders = async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body,{new: true}) //Tiene un req.body porque desde ahi ingresan los datos para el cambio, {new:true} devuelve el valor actualizado, si no estuviese nos mostraria el valor antiguo
    if(!order) return res.status(404).json({message: "Cannot be update, ID not found"})
    res.json(order)
    console.log('Actualizacion exitosa')    
}


    /* ELIMINAR PEDIDOS -- OK*/

export const deleteOrders = async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id)
    if(!order) return res.status(404).json({message: "ID not found"})
    res.sendStatus(204)
    console.log('Eliminado exitoso')

}