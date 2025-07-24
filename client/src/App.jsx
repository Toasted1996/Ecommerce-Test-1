import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/auth.context'

/* ROUTES IMPORTS */
import RegisterPage from './pages/Registerpage'
import LoginPage from './pages/Loginpage'
import OrderPage from './pages/OrderPage'
import OrderFormPage from './pages/OrderFormPage'
import Profile from './pages/Profile'


/* ROUTES ASIGNATION */
function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<h1>Home Page</h1>}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/orders' element={<OrderPage/>}></Route>
            <Route path='/add-order' element={<OrderFormPage/>}></Route>
            <Route path='/order/:id' element={<OrderFormPage />}></Route>
            <Route path='/products/' element={<h1>Products Page</h1>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App