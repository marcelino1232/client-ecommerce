import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Products } from "./components/product/Products";
import { Contact } from "./components/Contact";
import { ShoppingCart } from "./components/shoppingCart/ShoppingCart";
import { ProductDetails } from "./components/product/ProductDetails";
import { About } from "./components/About";
import { OrderAddress } from "./components/payment/OrderAddress";
import { OrderPayment } from "./components/payment/OrderPayment";
import { OrderCompleted } from "./components/payment/OrderCompleted";
import { Error401 } from "./errors/Error401";
import { Error404 } from "./errors/Error404";
import { Error500 } from "./errors/Error500";
import { PurchaseDetails } from "./components/order/PurchaseDetails";
import { Role } from "./helpers/Role";
import { LayoutAdmin } from "./layoutAdmin/LayoutAdmin";
import { OrderList } from "./components/order/OrderList";
import { Support } from "./components/Support";
import { CreateReview } from "./components/order/CreateReview";
import { ClientSupport } from "./components/order/ClientSupport";
import Profile from "./components/auth/user/Profile";
import { Wishes } from "./components/auth/user/Wishes";
import { Review } from "./components/auth/user/Review";
import { ProtectedRoute } from "./components/auth/security/ProtectedRoute";
import { Login } from "./components/auth/user/Login";
import { Register } from "./components/auth/register/Register";
import { RegisterSend } from "./components/auth/register/RegisterSend";
import { RegisterConfirm } from "./components/auth/register/RegisterConfirm";
import { ForgetPassword } from "./components/auth/password/ForgetPassword";
import { ForgetPasswordSend } from "./components/auth/password/ForgetPasswordSend";
import { ForgetPasswordConfirm } from "./components/auth/password/ForgetPasswordConfirm";
import { Purchase } from "./components/order/Purchase";
import { Inventory } from "./components/product/Inventory";
import { AuthProvider } from "./components/auth/security/AuthProvider";

import { ListOfUser } from "./components/auth/user/ListOfUser";
import { Invoice } from "./components/order/Invoice";
import { AdminReview } from "./components/auth/user/AdminReview";
import { AdminWish } from "./components/auth/user/AdminWish";
import { InventoryCreate } from "./components/product/InventoryCreate";
import { InventoryUpdate } from "./components/product/InventoryUpdate";
import { InventoryReview } from "./components/product/InventoryReview";
import { UserReview } from "./components/auth/user/UserReview";
import { ProductUpload } from "./components/product/ProductUpload";
import { ClientListSupport } from "./components/order/ClientListSupport";
import { SupportMessage } from "./components/order/SupportMessage";
import { Payment } from "./components/payment/Payment";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Products />} />
              <Route path="products/:ProductId" element={<ProductDetails />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="shoppingCart" element={<ShoppingCart />} />

              <Route
                path="orderAddress"
                element={
                  <ProtectedRoute
                    Component={OrderAddress}
                    Roles={Role.Client}
                  />
                }
              />
              <Route
                path="orderPayment"
                element={
                  <ProtectedRoute
                    Component={OrderPayment}
                    Roles={Role.Client}
                  />
                }
              />
              <Route
                path="payment"
                element={
                  <ProtectedRoute Component={Payment} Roles={Role.Client} />
                }
              />
              <Route
                path="orderCompleted"
                element={
                  <ProtectedRoute
                    Component={OrderCompleted}
                    Roles={Role.Client}
                  />
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute Component={Profile} Roles={Role.Client} />
                }
              />
              <Route
                path="wishes"
                element={
                  <ProtectedRoute Component={Wishes} Roles={Role.Client} />
                }
              />
              <Route
                path="review"
                element={
                  <ProtectedRoute Component={Review} Roles={Role.Client} />
                }
              />

              <Route
                path="review/:ProductId"
                element={
                  <ProtectedRoute
                    Component={CreateReview}
                    Roles={Role.Client}
                  />
                }
              />
              <Route
                path="purchase"
                element={
                  <ProtectedRoute Component={Purchase} Roles={Role.Client} />
                }
              />

              <Route
                path="purchase/:OrderId"
                element={
                  <ProtectedRoute
                    Component={PurchaseDetails}
                    Roles={Role.Client}
                  />
                }
              />

              <Route
                path="support/:OrderId/:ProductId"
                element={
                  <ProtectedRoute
                    Component={ClientSupport}
                    Roles={Role.Client}
                  />
                }
              />

              <Route
                path="support"
                element={
                  <ProtectedRoute
                    Component={ClientListSupport}
                    Roles={Role.Client}
                  />
                }
              />

              <Route
                path="message/:SupportId"
                element={
                  <ProtectedRoute
                    Component={SupportMessage}
                    Roles={Role.Client}
                  />
                }
              />
            </Route>

            <Route path="/v1" element={<LayoutAdmin />}>
              <Route
                index
                element={
                  <ProtectedRoute Component={Inventory} Roles={Role.Admin} />
                }
              />
              <Route
                path="purchase/:Search?/:PageIndex?/:PageSize?"
                element={
                  <ProtectedRoute Component={OrderList} Roles={Role.Admin} />
                }
              />
              <Route
                path="user"
                element={
                  <ProtectedRoute Component={ListOfUser} Roles={Role.Admin} />
                }
              />
              <Route
                path="support"
                element={
                  <ProtectedRoute Component={Support} Roles={Role.Admin} />
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute Component={Profile} Roles={Role.Admin} />
                }
              />

              <Route
                path="review"
                element={
                  <ProtectedRoute Component={AdminReview} Roles={Role.Admin} />
                }
              />
              <Route
                path="wishes"
                element={
                  <ProtectedRoute Component={AdminWish} Roles={Role.Admin} />
                }
              />

              <Route
                path="create"
                element={
                  <ProtectedRoute
                    Component={InventoryCreate}
                    Roles={Role.Admin}
                  />
                }
              />

              <Route
                path="update/:ProductId"
                element={
                  <ProtectedRoute
                    Component={InventoryUpdate}
                    Roles={Role.Admin}
                  />
                }
              />
              <Route
                path="productReview/:ProductId"
                element={
                  <ProtectedRoute
                    Component={InventoryReview}
                    Roles={Role.Admin}
                  />
                }
              />

              <Route
                path="userReview/:UserId"
                element={
                  <ProtectedRoute Component={UserReview} Roles={Role.Admin} />
                }
              />

              <Route
                path="productUpload/:ProductId"
                element={
                  <ProtectedRoute
                    Component={ProductUpload}
                    Roles={Role.Admin}
                  />
                }
              />

              <Route
                path="message/:SupportId"
                element={
                  <ProtectedRoute
                    Component={SupportMessage}
                    Roles={Role.Admin}
                  />
                }
              />
            </Route>

            <Route path="login" element={<Login />} />

            <Route path="register" element={<Register />} />
            <Route path="registerSend/:email" element={<RegisterSend />} />
            <Route
              path="registerConfirm/:email/:token"
              element={<RegisterConfirm />}
            />

            <Route
              path="Invoice/:OrderId"
              element={
                <ProtectedRoute Component={Invoice} Roles={Role.Client} />
              }
            />

            <Route path="forgotPassword" element={<ForgetPassword />} />
            <Route
              path="forgotPasswordSend/:email"
              element={<ForgetPasswordSend />}
            />
            <Route
              path="forgotPasswordConfirm/:email/:token"
              element={<ForgetPasswordConfirm />}
            />

            <Route path="401" element={<Error401 />} />
            <Route path="404" element={<Error404 />} />
            <Route path="*" element={<Error404 />} />
            <Route path="500" element={<Error500 />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
