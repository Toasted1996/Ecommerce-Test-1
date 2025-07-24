import {useForm} from 'react-hook-form'
import { useAuth } from '../context/auth-context-def';
import { Link } from 'react-router-dom'

function LoginPage(){
    const {register, 
        handleSubmit,
        formState:{errors}} = useForm();
        const {signIn, errors : signInErrors } = useAuth()
    const onSubmit = handleSubmit((data) => {
    signIn((data))
    })

    return(
        <div className ='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {signInErrors.map((error,i)=>(
                    <div className= 'bg-red-500 p-2 text-white' key={i}>
                    {error}
                    </div>
                ))}
                <h1 className='text-2xl font-bold text-center'>Login</h1>
                <form onSubmit={onSubmit}>
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
                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login</button>
            </form>
                <p className='flex gap-x-2 justify-between'>Don't have an account?
                    <Link to= '/register'>Sign Up </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage