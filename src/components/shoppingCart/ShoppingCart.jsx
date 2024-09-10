import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteItem,
  getAll,
  updateItem,
} from "../../redux/actions/shoppingCartAction";
import { getShoppingCartId } from "../../helpers/GetShoppingCartStore";
import { Loading } from "../../layout/Loading";

export const ShoppingCart = () => {
  const { shoppingCart, loading } = useSelector((state) => state.shoppingCart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll(getShoppingCartId()));
  }, []);

  const GoUp = (shoppingCartDetailsId, quantity) => {
    if (quantity >= 99) {
    } else {
      let request = {
        shoppingCartId: getShoppingCartId(),
        shoppingCartDetailsId: shoppingCartDetailsId,
        quantity: 1,
      };
      dispatch(updateItem(request));
    }
  };
  const GoDown = (shoppingCartDetailsId, quantity) => {
    if (quantity > 1) {
      let request = {
        shoppingCartId: getShoppingCartId(),
        shoppingCartDetailsId: shoppingCartDetailsId,
        quantity: -1,
      };
      dispatch(updateItem(request));
    }
  };

  function DeleteItem(shoppingCartDetailsId) {
    let request = {
      shoppingCartId: getShoppingCartId(),
      shoppingCartDetailsId: shoppingCartDetailsId,
    };
    dispatch(deleteItem(request));
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className=" container-fluid">
          <nav aria-label="breadcrumb" className="mt-3 w3-card">
            <ol class="breadcrumb py-2 ps-2">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Cart
              </li>
            </ol>
          
          </nav>

          <div className="w3-light-grey w3-round-xxlarge mb-3">
            <div
              className="w3-container w3-round w3-indigo"
              style={{ width: "25%" }}
            >
              25%
            </div>
          </div>
          <div className="w3-card-4 w3-round ">
            <header className=" h4 w3-cursive py-3  container-fluid w3-border-bottom">
              Shopping Bag
            </header>
            {shoppingCart.items.length > 0 ? (
              shoppingCart.items.map((item) => (
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
                    <div className="col-12 col-md-2 mb-3 mb-md-0 h4 w3-cursive d-flex align-items-center justify-content-center">
                      {item.name + " " + item.brand}
                    </div>
                    <div className="col-12 col-md-2 h4 w3-cursive d-flex align-items-center justify-content-center mb-3 mb-md-0">
                      {item.salesPrice}
                    </div>
                    <div className="col-12 col-md-2 d-flex align-items-center justify-content-center mb-3 mb-md-0">
                      <button
                        className="w3-btn w3-text-indigo"
                        onClick={(e) =>
                          GoDown(item.shoppingCartDetailsId, item.quantity)
                        }
                      >
                        <i class="fa-solid fa-minus"></i>
                      </button>
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
                      <button
                        className="w3-btn w3-text-indigo"
                        onClick={(e) =>
                          GoUp(item.shoppingCartDetailsId, item.quantity)
                        }
                      >
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                    <div className="col-12 col-md-2 h4 w3-cursive d-flex align-items-center justify-content-center mb-3 mb-md-0">
                      {item.lineTotal}
                    </div>
                    <div className="col-12 col-md-2 d-flex align-items-center justify-content-center mb-3 mb-md-0">
                      <button
                        className="w3-btn w3-text-indigo"
                        onClick={(e) => DeleteItem(item.shoppingCartDetailsId)}
                      >
                        <i class="fa-solid fa-xmark"></i>
                      </button>
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

          <div className="row">
            <div className="col-12 col-sm-6 col-md-8"></div>
            <div className="col-12 col-sm-6 col-md-4 mt-3">
              <div className="w3-card-4 container">
                <div className=" w3-cursive h5 d-flex pt-3 justify-content-between">
                  <label>SubTotal</label>
                  <label>${shoppingCart.subTotal}</label>
                </div>
                <div className=" w3-cursive h5 d-flex pt-2 justify-content-between">
                  <label>Tax(5%)</label>
                  <label>${shoppingCart.tax}</label>
                </div>
                <div className=" w3-cursive h5 d-flex py-2 justify-content-between">
                  <label>Shopping</label>
                  <label>${shoppingCart.shopping}</label>
                </div>
                <div className=" w3-cursive h5 pb-3 pt-1 d-flex justify-content-between w3-border-top">
                  <label>Total</label>
                  <label>${shoppingCart.total}</label>
                </div>
                {shoppingCart.count > 0 && (
                  <div className=" w3-cursive h5 pb-3 pt-1">
                    <Link
                      to="/orderAddress"
                      className=" text-uppercase w3-btn w3-block w3-indigo w3-round-xlarge"
                    >
                      Check Out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
