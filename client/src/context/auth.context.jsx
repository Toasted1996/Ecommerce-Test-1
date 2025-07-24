
/* CONTEXTO GUARDA LOS DATOS DEL USUARIO PARA QUE SE VEA EN TODA LA APP */
import { useState } from 'react'
import { loginRequest, registerRequest } from '../api/auth.js'
import { AuthContext } from './auth-context-def.js'


export const AuthProvider = ({children}) => {
    const[user, setUser] = useState(null)
    const[isAuthenticated, setIsAuthenticated] = useState(false)
    const[errors, setErrors] = useState([])

    const singUp = async(userPayload)=>{
        try{
            const res = await registerRequest(userPayload)
            console.log('Respuesta de registro', res.data)
            setUser(res.data)
            setIsAuthenticated(true)
        }catch(error){
            // console.log(errors)
            setErrors(error.response.data)
        }
    }
    
    const signIn = async (user) => {
        try{
        const res = await loginRequest(user)
        console.log(res)
        }catch(error){
        console.log(error)
    }
}

    return( 
        <AuthContext.Provider value={{singUp,signIn, user, isAuthenticated, errors}}>
            {children}
        </AuthContext.Provider>
    )
}



