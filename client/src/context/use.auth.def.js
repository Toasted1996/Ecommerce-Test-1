import { useContext } from "react";
import { AuthContext } from "./auth-context-def";

export const useAuth = () =>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used whithin an AuthProvider')
    }
    return context
}