import { TOKEN_SECRET } from "../config.js"
import jwt from "jsonwebtoken"

export const authRequired = (req, res, next) => { // Esta constante nos ayudara a validar los token almacenados en las cookies
    const {token} = req.cookies // Nueva constante que comprueba si el token almacenado en la cookie es correcto
    if(!token) // Si es distinto a token entonces indicara mensaje de error
        return res.status(401).json({message: "Authorization denied"})
        jwt.verify(token, TOKEN_SECRET, (err, user)=>{ //Compara los token con la llave de seguridad 
            if (err)
                return res.status(403).json({message:"Invalid Token"}) //Mensaje de error si el token no coincide
            req.user = user
            console.log(user)
            next()
        })

}