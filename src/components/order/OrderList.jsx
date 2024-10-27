import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orderList } from "../../services/orderService";
import { convertIntToArrayInit } from "../../helpers/GetArray";
import { Loading } from "../../layout/Loading";

export const OrderList = () => {
  const [response, setResponse] = useState();

  const [loading, setLoading] = useState(false);

  const [pageNumer, setPageNumer] = useState(null);

  const [params, setParams] = useState({
    Search: "",
    PageIndex: 1,
    PageSize: 4,
  });

  useEffect(() => {
    onloading();
  }, [params.PageIndex, params.Search]);

  const onloading = async () => {
    setLoading(true);
    var request = await orderList(params);
    setResponse(request.response);
    setPageNumer(convertIntToArrayInit(request.response.pageCount));
    setLoading(false);
  };

  const GoDown = async () => {
    if (response.pageIndex > 1) {
      setParams({
        ...params,
        PageIndex: params.PageIndex - 1,
      });
    }
  };

  const changeIndex = (page) => {
    setParams({
      ...params,
      PageIndex: page,
    });
  };

  const GoUp = async () => {
    if (response.pageIndex < response.pageCount) {
      setParams({
        ...params,
        PageIndex: params.PageIndex + 1,
      });
    }
  };

  const search = (e) => {
    e.preventDefault();

    var search = document.getElementById("txtSearch");

    setParams({
      ...params,
      Search: search.value,
      PageIndex: 1,
    });
  };

 
  return (
    <>
      <div className=" container-fluid" id="top">
        <div className="row my-4">
          <div className="col-0 col-sm-6 col-md-8 col-lg-9"></div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className=" input-group input-group-lg">
              <input
                id="txtSearch"
                type="text"
                className=" form-control me-2"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <button
                className="w3-btn w3-indigo"
                type="button"
                id="button-addon2"
                onClick={(e) => search(e)}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>
        <div className=" w3-card-4">
          <header className="h3 py-2 text-center w3-cursive">
            List Of Purchase
          </header>
        </div>
        {loading ? (
          <Loading />
        ) : response != null && response.data.length > 0 ? (
          response.data?.map((details, indice) => (
            <div className=" container-fluid w3-card-4 my-4 py-3" key={indice}>
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center border-bottom mb-2 pb-2">
                    <h4 className="mb-0">Order Details</h4>

                    <button className="w3-btn w3-indigo">
                      <i class="fa-solid fa-cash-register"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="w3-card my-2">
                    <div className=" text-center  w3-border-bottom">
                      <p className="h4 py-2">Customer Information</p>
                    </div>
                    <div className="d-flex flex-column text-center flex-sm-row  mx-2  my-2 w3-cursive">
                      <p className="me-2 h5">
                        EmailAddress{" "}
                        <span className="d-sm-inline-block d-none">:</span>
                      </p>
                      <p className="h5">{details?.emailAddress}</p>
                    </div>
                    <div className="d-flex flex-column text-center flex-sm-row  mx-2 mb-2 w3-cursive">
                      <p className="me-2 h5">
                        Name <span className="d-sm-inline-block d-none">:</span>
                      </p>
                      <p className="h5">
                        {details.firstName + " " + details.lastName}
                      </p>
                    </div>
                    <div className="d-flex flex-column text-center flex-sm-row mx-2 mb-2 w3-cursive">
                      <p className="me-2 h5">
                        CellPhone{" "}
                        <span className="d-sm-inline-block d-none">:</span>
                      </p>
                      <p className="h5">{details.cellPhone}</p>
                    </div>
                    <div className="d-flex flex-column text-center flex-sm-row mx-2 mb-2 w3-cursive">
                      <p className="me-2 h5">
                        Date <span className="d-sm-inline-block d-none">:</span>
                      </p>
                      <p className="h5">{details?.date}</p>
                    </div>
                    <div className="d-flex flex-column text-center flex-sm-row mx-2 mb-2  w3-cursive">
                      <p className="me-2 h5">
                        Status{" "}
                        <span className="d-sm-inline-block d-none">:</span>
                      </p>
                      {details.statusText == "completed" ? (
                        <p className="h5 text-capitalize text-success">
                          {details?.statusText}
                        </p>
                      ) : (
                        <p className="h5 text-capitalize text-danger">
                          {details?.statusText}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="w3-card my-2">
                    <div className=" text-center  w3-border-bottom">
                      <p className="h4 py-2">Shopping Address</p>
                    </div>
                    <div className="d-flex flex-column text-center flex-sm-row mx-2  my-2 w3-cursive">
                      <p className="me-2 h5">
                        Street{" "}
                        <span className="d-sm-inline-block d-none">:</span>
                      </p>
                      <p className="h5">
                        {details?.orderAddress.street +
                          " " +
                          details.orderAddress.houseNumber}
                      </p>
                    </div>
                    <div className="d-flex flex-column text-center flex-sm-row mx-2  mb-2 w3-cursive">
                      <p className="me-2 h5">
                        City <span className="d-sm-inline-block d-none">:</span>
                      </p>
                      <p className="h5">{details?.orderAddress.city}</p>
                    </div>
                    <div className="d-flex flex-column text-center flex-sm-row mx-2  mb-2 w3-cursive">
                      <p className="me-2 h5">
                        State{" "}
                        <span className="d-sm-inline-block d-none">:</span>
                      </p>
                      <p className="h5">{details?.orderAddress.state}</p>
                    </div>
                    <div className="d-flex flex-column text-center flex-sm-row mx-2  mb-2 w3-cursive">
                      <p className="me-2 h5">
                        Country{" "}
                        <span className="d-sm-inline-block d-none">:</span>
                      </p>
                      <p className="h5">{details?.orderAddress.country}</p>
                    </div>
                    <div className="d-flex flex-column text-center flex-sm-row mx-2  mb-2 w3-cursive">
                      <p className="me-2 h5">
                        ZipCode{" "}
                        <span className="d-sm-inline-block d-none">:</span>
                      </p>
                      <p className="h5">{details?.orderAddress.postalCode}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 my-2">
                  <div className="w3-card ">
                    <h3 className="text-center py-2">Product Details</h3>
                  </div>
                </div>

                <div className="col-12">
                  <table className="w3-table-all h5 w3-large w3-card w3-centered">
                    <thead>
                      <tr className=" d-none d-md-table-row">
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.orderDetails?.map((item, indice) => (
                        <tr
                          key={indice}
                          style={{ position: "relative", minHeight: "100%" }}
                          className="d-flex flex-column  py-4 py-md-0  d-md-table-row h5"
                        >
                          <td style={{ padding: "10px 0px" }}>
                            <img
                              src={`${
                                import.meta.env.VITE_Back_Domain
                              }/Product/getImageByProductId?ProductId=${
                                item.productId
                              }`}
                              alt=""
                              srcset=""
                              style={{ width: "100x", height: "100px" }}
                              className="editp"
                            />
                          </td>
                          <td style={{ padding: "20px 0px" }}>
                            <p>{item.name + " " + item.brand}</p>
                          </td>
                          <td>{item.salesPrice}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6 col-md-8"></div>
                <div className="col-12 col-sm-6 col-md-4 mt-3">
                  <div className="w3-card-4 container">
                    <div className=" w3-cursive h5 d-flex pt-3 justify-content-between">
                      <label>SubTotal</label>
                      <label>${details.subTotal}</label>
                    </div>
                    <div className=" w3-cursive h5 d-flex pt-2 justify-content-between">
                      <label>Tax(5%)</label>
                      <label>${details.tax}</label>
                    </div>
                    <div className=" w3-cursive h5 d-flex py-2 justify-content-between">
                      <label>Shopping</label>
                      <label>${details.shopping}</label>
                    </div>
                    <div className=" w3-cursive h5 pb-3 pt-1 d-flex justify-content-between w3-border-top">
                      <label>Total</label>
                      <label>${details.total}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>fstegtrwtrgtefr</p>
        )}

        {response != null && response.data.length > 0 && (
          <div className="w3-center py-5">
            <div className="w3-bar" id="pag">
              <li
                onClick={GoDown}
                className={
                  response.pageIndex > 1
                    ? "w3-button "
                    : "w3-button w3-disabled"
                }
              >
                &laquo;
              </li>
              {pageNumer != null &&
                pageNumer.map((page) =>
                  page == response.pageIndex - 1 ? (
                    <li
                      key={page}
                      data-id={page}
                      onClick={(e) =>
                        setParams({
                          ...params,
                          PageIndex: page + 1,
                        })
                      }
                      className="w3-button w3-indigo pagProduct "
                    >
                      {page + 1}
                    </li>
                  ) : (
                    <li
                      key={page}
                      data-id={page}
                      onClick={(e) => changeIndex(page + 1)}
                      className="w3-button pagProduct"
                    >
                      {page + 1}
                    </li>
                  )
                )}
              {response.pageIndex < response.pageCount ? (
                <li onClick={GoUp} className={"w3-button"}>
                  &raquo;
                </li>
              ) : (
                <li onClick={GoUp} className={"w3-button w3-disabled"}>
                  &raquo;
                </li>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
