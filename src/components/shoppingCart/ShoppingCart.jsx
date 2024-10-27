import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getShoppingCartId } from "../../helpers/GetShoppingCartStore";
import { Loading } from "../../layout/Loading";
import {
  removeItemShoppingCart,
  shoppingCarts,
  updateItemShoppingCart,
} from "../../services/shoppingCartService";
import { ShoppingCartCount } from "../../layout/Layout";

export const ShoppingCart = () => {
  
  const { setCount } = useContext(ShoppingCartCount);

  const [response, setResponse] = useState();

  const [loading, setLoading] = useState(false);

  const shoppingCartId = getShoppingCartId();

  useEffect(() => {
    onloading();
  }, []);

  const onloading = async () => {
    setLoading(true);
    const request = await shoppingCarts();
    if (request == null || request.response == null) {
      setCount(0);
      setResponse(null);
    } else {
      setCount(request.response.count);
      setResponse(request.response);
    }

    setLoading(false);
  };

  const GoUp = async (shoppingCartDetailsId, quantity) => {
    if (quantity >= 99) {
    } else {
      let request = {
        shoppingCartId: shoppingCartId,
        shoppingCartDetailsId: shoppingCartDetailsId,
        quantity: 1,
      };
      setLoading(true);

      var result = await updateItemShoppingCart(request);

      setResponse(result.response);

      if (result == null || result.response == null) {
        setCount(0);
      } else {
        setCount(result.response.count);
      }
      setLoading(false);
    }
  };
  const GoDown = async (shoppingCartDetailsId, quantity) => {
    if (quantity > 1) {
      let request = {
        shoppingCartId: shoppingCartId,
        shoppingCartDetailsId: shoppingCartDetailsId,
        quantity: -1,
      };

      setLoading(true);

      var result = await updateItemShoppingCart(request);

      setResponse(result.response);

      if (result == null || result.response == null) {
        setCount(0);
      } else {
        setCount(result.response.count);
      }
      setLoading(false);
    }
  };

  async function DeleteItem(shoppingCartDetailsId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this Item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let request = {
          shoppingCartId: shoppingCartId,
          shoppingCartDetailsId: shoppingCartDetailsId,
        };

        setLoading(true);

        var result = await removeItemShoppingCart(request);

        setResponse(result.response);

        if (result == null || result.response == null) {
          setCount(0);
        } else {
          setCount(result.response.count);
        }
        setLoading(false);
      }
    });
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container-fluid" style={{ minHeight: "50vh" }}>
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
                        style={{ width: "120px", height: "120px" }}
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

          {response != null && (
            <div className="row">
              <div className="col-12 col-sm-6 col-md-8"></div>
              <div className="col-12 col-sm-6 col-md-4 mt-3">
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
                  {response.count > 0 && (
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
          )}
        </div>
      )}
    </>
  );
};
