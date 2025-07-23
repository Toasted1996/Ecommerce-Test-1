import User from "../models/user.model.js"
import bcrypt from 'bcrypt' 
import { createAccessToken } from "../libs/jwt.js" 

/* LÓGICA REGISTRO USUARIO -- OK*/
export const register = async (req, res) => { //Async para manejar promesas y evitar callbacks
    

    const {username, email, password} = req.body
        // Ingresa al hash de la contraseña en un try catch para manejar errores
    try{
        const passwordHash = await bcrypt.hash(password, 10) // Cifrado
        
        const newUser = new User({ //Crea un nuevo usuario con los datos recibidos con la contraseña cifrada, 
                                  //creamos un objeto de tipo user que se guardara en la base de datos
            username,
            email,
            password : passwordHash //contraseña cifrada
        })
    /* INTERFAZ DE RESPUESTA */

        
        const saveUser = await newUser.save(); //Se guarda el usuario en la base de datos    
        const token =  await createAccessToken({id: saveUser._id}) //Llamado createAccessToken para generar un token con el id guardado en saveUser._id
        res.cookie("token", token) //Token almacenado en una cookie

    /* Respuesta cliente */
        res.json({
            token,
            id: saveUser._id, //Devuelve el id del usuario guardado
            username: saveUser.username, //Devuelve nombre usuario
            email: saveUser.email, //Devuelve el email del usuario
            createdAt : saveUser.createdAt, //Devuelve la fecha de la creacion del usuario
            updatedAt : saveUser.updatedAt  //Devuelve la fecha de actualizacion del usuario
        })
        
    } catch (error){
        res.status(500).json({message : error.message})
    }
    
}


/* LÓGICA LOGIN USUARIO -- OK*/
export const login = async (req, res) => { //Async para manejar promesas y evitar callbacks
    //Extraccion de los datos del body
    const {email, password} = req.body
        // Ingresa al hash de la contraseña en un try catch para manejar errores
    try{
        //Busqueda del ususario por email
        const userFound =  await User.findOne({email})
        if(!userFound)  //Si el usuario no es encontrado
            return res.status(400).json({message: 'Usuario no encontrado'})

        const passwordMatch = await bcrypt.compare(password, userFound.password) //Compara las constraseñas con bcrypt.compare
        if(!passwordMatch) //Si las contraseñas no coinciden 
            return res.status(400).json({message: 'Contraseña incorrecta'})

    /* CREACION TOKEN - userFound() */  
        const token =  await createAccessToken({id: userFound._id}) //Llamado createAccessToken para generar un token con el id guardado en userFound._id
        res.cookie("token", token) //Token almacenado en una cookie

    /* Respuesta cliente */
        console.log("Usuario logueado")
        res.json({
            token,
            id: userFound._id, //Devuelve el id del usuario guardado
            username: userFound.username, //Devuelve nombre usuario
            email: userFound.email, //Devuelve el email del usuario
            createdAt : userFound.createdAt, //Devuelve la fecha de la creacion del usuario
            updatedAt : userFound.updatedAt  //Devuelve la fecha de actualizacion del usuario
        })
        
    } catch (error){
        res.status(500).json({message : error.message})
    }
    
}


/* LÓGICA LOGOUT USER -- OK */
export const logout = async (req, res) => {
    res.cookie("token","",{
        expires: new Date(0)
    })
    return res.sendStatus(200)
    
}

/* LÓGICA PARA AUTENTICACIÓN DEL USUSARIO -- OK */  // Va de la mano con las rutas y la validacion del token 

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if(!userFound)
        return res.status(400).json({message: "User not found"})
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}
