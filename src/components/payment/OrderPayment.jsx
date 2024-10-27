import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getShoppingCartId,
  removeShoppingCart,
} from "../../helpers/GetShoppingCartStore";
import { Loading } from "../../layout/Loading";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getToken } from "../../helpers/GetToken";
import { getDefaultAddress } from "../../services/userAddressService";
import { shoppingCarts } from "../../services/shoppingCartService";

export const OrderPayment = () => {
  let token = getToken();

  const initialOptions = {
    clientId:
      "AZs6t-7ByRbeLTI4DAukYJVT_VyFPoa_M6GesrJCUR9Q0t8J0boBOcL7j_sVuZ1ea4z3Ik8Ax2B97QEE",
  };

  const styles = {
    shape: "pill",
    color: "blue",
    borderRadius: 10,
    label: "pay",
  };

  const navegate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({});

  const [response, setResponse] = useState(null);

  const shoppingCartId = getShoppingCartId();

  useEffect(() => {
    setLoading(true);
    onloadingAddress();
    onloadingDetails();
    setLoading(false);
  }, []);

  const onloadingAddress = async () => {
    const request = await getDefaultAddress();
    setAddress(request.response);
  };

  const onloadingDetails = async () => {
    const request = await shoppingCarts();
    setResponse(request.response);
  };

  const createOrder = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_Back_Domain
        }/Checkout?ShoppingCartId=${shoppingCartId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { id } = await response.json();

      if (id == null || id == "") {
        throw new Error("id is not valid");
      }

      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove = async (data) => {
    // Capture the funds from the transaction.
    const response = await fetch(
      `${
        import.meta.env.VITE_Back_Domain
      }/Checkout/Completed?ShoppingCartId=${shoppingCartId}&OrderId=${
        data.orderID
      }`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    console.log(result);

    if (!result) {
      throw new Error("something is not right");
    }

    removeShoppingCart();

    navegate("/orderCompleted");
  };

  const onError = (err) => {
    navegate("/500");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className=" container-fluid">
          <nav aria-label="breadcrumb" className="mt-3 w3-card ">
            <ol class="breadcrumb py-2 ps-2">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                <Link to="/shoppingCart">Cart</Link>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                <Link to="/orderAddress">Address</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Details
              </li>
            </ol>
          </nav>

          <div className="w3-light-grey w3-round-xxlarge my-4">
            <div
              className="w3-container w3-round w3-indigo"
              style={{ width: "75%" }}
            >
              75%
            </div>
          </div>

          <div className="w3-card w3-round ">
            <header className=" h5 w3-cursive py-2  container-fluid w3-border-bottom d-flex justify-content-between align-items-center">
              <p className="mb-0"> Order Details</p>
              <Link className="w3-btn w3-indigo w3-round h6 my-1" to="/orderAddress">
                Back
              </Link>
            </header>
          </div>

          <div className="d-flex flex-column w3-cursive h5 w3-card w3-display-container  w3-container py-2 mt-3">
            <label className="my-2"> Address : {address.street}</label>
            <label className="mb-2"> Aparment : {address.houseNumber}</label>
            <label className="mb-2"> City : {address.city}</label>
            <label className="mb-2"> State : {address.region}</label>
            <label className="mb-2"> Country : {address.country}</label>
          </div>

          <div className="mt-3">
            <div className="w3-card-4 w3-round ">
              <header className=" h4 w3-cursive py-3  container-fluid w3-border-bottom text-center">
                Shopping Bag
              </header>
              {response != null && response.items.length > 0 ? (
                response.items.map((item) => (
                  <div
                    className=" container-fluid  py-2 w3-border-bottom"
                    key={item.productId}
                  >
                    <div className="row">
                      <div className="col-12 col-md-2 d-flex justify-content-center mb-3 mb-md-0">
                        <img
                          src={`${
                            import.meta.env.VITE_Back_Domain
                          }/Product/getImageByProductId?ProductId=${
                            item.productId
                          }`}
                          alt=""
                          srcset=""
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                      <div className="col-12 col-md-4 mb-3 mb-md-0 h4 w3-cursive d-flex align-items-center justify-content-center">
                        {item.name + " " + item.brand}
                      </div>
                      <div className="col-12 col-md-2 h4 w3-cursive d-flex align-items-center justify-content-center mb-3 mb-md-0">
                        {item.salesPrice}
                      </div>
                      <div className="col-12 col-md-2 d-flex align-items-center justify-content-center mb-3 mb-md-0">
                        <p
                          style={{
                            width: "40px",
                            display: "block",
                            lineHeight: "35px",
                            fontWeight: "bold",
                          }}
                          className=" w3-center mb-0 mx-1"
                          disabled
                        >
                          {item.quantity}
                        </p>
                      </div>
                      <div className="col-12 col-md-2 h4 w3-cursive d-flex align-items-center justify-content-center mb-3 mb-md-0">
                        {item.lineTotal}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className=" container-fluid  py-2 w3-border-bottom">
                  <div className="row">
                    <div className="col-12 w3-center py-4">
                      <p className=" w3-cursive h3 w3-text-indigo text-uppercase">
                        The Shopping Bag is Empty
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {response != null && response.items.length > 0 && (
              <div className="row">
                <div className="col-12 col-sm-4 col-md-6"></div>
                <div className="col-12 col-sm-8 col-md-6 mt-3">
                  <div className="w3-card-4 container">
                    <div className=" w3-cursive h5 d-flex pt-3 justify-content-between">
                      <label>SubTotal</label>
                      <label>${response.subTotal}</label>
                    </div>
                    <div className=" w3-cursive h5 d-flex pt-2 justify-content-between">
                      <label>Tax(5%)</label>
                      <label>${response.tax}</label>
                    </div>
                    <div className=" w3-cursive h5 d-flex py-2 justify-content-between">
                      <label>Shopping</label>
                      <label>${response.shopping}</label>
                    </div>
                    <div className=" w3-cursive h5 pb-3 pt-1 d-flex justify-content-between w3-border-top">
                      <label>Total</label>
                      <label>${response.total}</label>
                    </div>
                    <div className=" w3-cursive h5 pb-3 pt-1">
                      <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                          style={styles}
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </PayPalScriptProvider>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
