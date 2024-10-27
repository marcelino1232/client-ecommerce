import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartCount } from "../../layout/Layout";
import { getShoppingCartId } from "../../helpers/GetShoppingCartStore";

export const OrderCompleted = () => {
  const { setCount } = useContext(ShoppingCartCount);
  useEffect(() => {
    if (getShoppingCartId() == "00000000-0000-0000-0000-000000000000") {
      setCount(0);
    }
  }, []);

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center text-center "
        style={{ minHeight: "70vh" }}
      >
        <div className="">
          <i
            className="fa-solid fa-circle-check w3-text-teal"
            style={{ fontSize: "150px" }}
          ></i>
          <h2 className="w3-cursive h1 mt-3">
            Your Order is Completed Success
          </h2>

          <Link
            to="/"
            className="w3-btn w3-indigo w3-round-xlarge w3-cursive w3-xlarge mt-4 mb-3 px-4 py-3"
          >
            {" "}
            Continue Shopping
          </Link>
          <p className="h4 w3-cursive">Thanks for the purchase.</p>
        </div>
      </div>
    </>
  );
};
