import {useForm} from  'react-hook-form'
import {useAuth} from '../context/use.auth.def'
import {useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'

function RegisterPage(){
    const {register, handleSubmit, formState:{errors}} = useForm()
    const {singUp, isAuthenticated, errors: RegisterErrors} = useAuth()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(isAuthenticated) navigate('/orders')
    }, [isAuthenticated, navigate])

        const onSubmit = handleSubmit(async (values) => {
        singUp(values)
    })
        return(
        <div className ='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {
                RegisterErrors.map((error,i)=>(
                    <div className='bg-red-500 p-2 text-white' key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>
                <h1 className=' text-2xl text-center py-2 text-white mb-2 font-bold'>Create an Account</h1>
                <input 
                type="text"
                {...register('username',{required:true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
                placeholder='Username'/>
                {
                    errors.username && (
                        <p className="text-red-500">Username is required</p>
                    )
                }
                <input 
                type="email"
                {...register('email', {required:true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
                placeholder='Email'/>
                {
                    errors.email && (
                        <p className="text-red-500">Email is required</p>
                    )
                }
                <input 
                type="password" 
                {...register('password', {required:true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
                placeholder ='Password'/>
                {
                    errors.password && (
                        <p className="text-red-500">Password is required</p>
                    )
                }
                <button type="submit" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-5">Register</button>
            </form>
                <p className='flex gap-x-2 justify-between'>Already have an account?
                    <Link to= '/login'>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage