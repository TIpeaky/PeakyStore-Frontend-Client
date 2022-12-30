import { Route, Routes } from 'react-router-dom'
import Home from "../pages/Home"
import LoginUsuario from '../pages/Login/User'
import PaginaBase from "../pages/PageBase"
import Products from '../pages/Products'
import UserRegister from "../pages/UserRegister"
import NewPassword from '../pages/NewPassword'
import NotFound from '../pages/NotFound'
import Cart from '../pages/Cart/Cart'


const Rotas = () => {
  return (
    <Routes>
      <Route path='/' element={<PaginaBase />}>
        <Route path='' element={<Home />} />
        <Route path='login' element={<LoginUsuario />} />
        <Route path='products' element={<Products />} />
        <Route path='cart' element={<Cart />} />
        <Route path='register' element={<UserRegister />} />
        <Route path='/newPassword' element={<NewPassword/>} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>);
}

export default Rotas