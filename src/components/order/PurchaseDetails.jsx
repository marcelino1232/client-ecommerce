import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../layout/Loading";
import { getOrderById } from "../../services/orderService";

export const PurchaseDetails = () => {
  const { OrderId } = useParams();

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    onloading();
  }, []);

  const onloading = async () => {
    setLoading(true);
    var request = await getOrderById(OrderId);

    if (request != null) {
      if (request.statusCode == 404) {
        navigate("/404");
      }

      if (request.statusCode == 500) {
        navigate("/500");
      }

      setResponse(request.response);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        response != null && (
          <div className=" container-fluid">
            <nav aria-label="breadcrumb" className="mt-3 w3-card">
              <ol className="breadcrumb py-2 ps-2">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/purchase">Purchase</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Details
                </li>
              </ol>
            </nav>

            <div className="w3-card p-3">
              <header className=" h3 w3-cursive w3-border-bottom mb-3 py-2 d-flex justify-content-between align-items-center">
                <p>Purchase Details</p>
                <div class="w3-dropdown-hover">
                  <button className="w3-btn w3-indigo">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                  <div
                    className="w3-dropdown-content w3-bar-block w3-card-4 w3-animate-zoom  h5 "
                    style={{ right: "0" }}
                  >
                    <Link className="w3-bar-item w3-button" to="/purchase">
                      Back
                    </Link>
                    <Link
                      to={`/Invoice/${OrderId}`}
                      target="_blank"
                      className="w3-bar-item w3-button"
                    >
                      Print
                    </Link>
                  </div>
                </div>
              </header>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="w3-card">
                    <header className="h3 text-center py-3 w3-cursive w3-border-bottom">
                      Customer Information
                    </header>
                    <div className="d-flex flex-column w3-cursive h5 w3-container py-2">
                      <label className="my-2">
                        {" "}
                        EmailAddress : {response?.emailAddress}
                      </label>
                      <label className="mb-2">
                        {" "}
                        Name : {response?.firstName + " " + response?.lastName}
                      </label>
                      <label className="mb-2">
                        {" "}
                        CellPhone : {response?.cellPhone}
                      </label>
                      <label className="mb-2"> Date : {response?.date}</label>
                      <label className="mb-2">
                        {" "}
                        Status : {response?.statusText}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="w3-card">
                    <header className="h3 text-center py-3 w3-cursive w3-border-bottom">
                      Order Address
                    </header>
                    <div className="d-flex flex-column w3-cursive h5 w3-container py-2">
                      <label className="my-2">
                        {" "}
                        Address :{" "}
                        {response.orderAddress?.street +
                          " " +
                          response.orderAddress?.houseNumber}
                      </label>
                      <label className="mb-2">
                        {" "}
                        City : {response.orderAddress?.city}
                      </label>
                      <label className="mb-2">
                        {" "}
                        State : {response.orderAddress?.state}
                      </label>
                      <label className="mb-2">
                        {" "}
                        Country : {response.orderAddress?.country}
                      </label>
                      <label className="mb-2">
                        {" "}
                        Zip Code : {response.orderAddress?.postalCode}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="w3-card-4 w3-round  mt-4">
                    <header className=" h3 w3-cursive py-2 text-center container-fluid w3-border-bottom">
                      Product Details
                    </header>
                    {response != null && response.orderDetails.length > 0 ? (
                      response.orderDetails.map((item) => (
                        <div
                          className=" container-fluid  py-2 w3-border-bottom"
                          key={item.productId}
                        >
                          <div className="row">
                            <div className="col-12 col-md-3 d-flex justify-content-center mb-3 mb-md-0">
                              <img
                                src={`${
                                  import.meta.env.VITE_Back_Domain
                                }/Product/getImageByProductId?ProductId=${
                                  item.productId
                                }`}
                                alt=""
                                srcset=""
                                style={{
                                  maxWidth: "120px",
                                  maxHeight: "120px",
                                }}
                              />
                            </div>
                            <div className="col-12 col-md-3 mb-3 mb-md-0 h4 w3-cursive d-flex align-items-center justify-content-center">
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
                </div>
              </div>

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
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};
