import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Products } from "./components/product/Products";
import { Contact } from "./components/Contact";
import { ShoppingCart } from "./components/shoppingCart/ShoppingCart";
import { Login } from "./components/user/Login";
import { NoPage } from "./errors/NoPage";
import { ProductDetails } from "./components/product/ProductDetails";
import { useEffect } from "react";
import { getShoppingCartId } from "./helpers/GetShoppingCartStore";
import { useDispatch } from "react-redux";
import { getAll } from "./redux/actions/shoppingCartAction";
import { Register } from "./components/user/Register";
import { ForgetPassword } from "./components/user/ForgetPassword";
import { About } from "./components/About";
import { OrderAddress } from "./components/payment/OrderAddress";
import { OrderPayment } from "./components/payment/OrderPayment";
import { OrderCompleted } from "./components/payment/OrderCompleted";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll(getShoppingCartId()));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Products />} />
            <Route path="products/:ProductId" element={<ProductDetails />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="shoppingCart" element={<ShoppingCart />} />
            <Route path="orderAddress" element={<OrderAddress />} />
            <Route path="orderPayment" element={<OrderPayment />} />
            <Route path="orderCompleted" element={<OrderCompleted />} />
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotPassword" element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
