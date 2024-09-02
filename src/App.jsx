import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { Products } from './components/product/Products'
import { Contact } from './components/Contact'
import { ShoppingCart } from './components/shoppingCart/ShoppingCart'
import { Login } from './components/user/Login'
import { NoPage } from './errors/NoPage'
import { Home } from './components/home/Home'

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home /> } />
          <Route path='products' element={<Products />} />
          <Route path='contact' element={<Contact />} />
          <Route path='shoppingCart' element={<ShoppingCart />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
