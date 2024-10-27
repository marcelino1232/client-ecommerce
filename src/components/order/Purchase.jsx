import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../layout/Loading";
import { orderPagination } from "../../services/orderService";
import { convertIntToArrayInit } from "../../helpers/GetArray";

export const Purchase = () => {
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
    var request = await orderPagination(params);
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
    <div className=" container-fluid">
      <nav aria-label="breadcrumb" className="mt-3 w3-card">
        <ol className="breadcrumb py-2 ps-2">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Purchase
          </li>
        </ol>
      </nav>

      <div className="row my-4">
        <div className="col-12 col-md-4"></div>
        <div className="col-0 col-md-4"></div>
        <div className="col-12 col-md-4">
          <div className="input-group input-group-lg">
            <input
              id="txtSearch"
              className="form-control me-2"
              type="text"
              placeholder="Search..."
            />
            <button className="w3-btn w3-indigo" onClick={(e) => search(e)}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="w3-card-4 w3-round">
        <header className=" h4 w3-cursive py-3 container-fluid w3-border-bottom text-center">
          List of Purchase
        </header>
      </div>

      {loading ? (
        <Loading />
      ) : response != null && response.data.length > 0 ? (
        response.data?.map((details, indice) => (
          <ul
            className="w3-ul w3-border w3-card-4 mt-4"
            style={{ width: "100%" }}
            key={indice}
          >
            <li className="w3-padding-large">
              <div className="row">
                <div className="col-12 col-md-2 d-flex justify-content-center justify-content-md-start">
                  <p className="h4">{details?.date}</p>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center">
                  <div class="w3-dropdown-hover w3-white">
                    <p className="h4 ">
                      {details?.firstName + " " + details?.lastName}
                    </p>
                    <div class="w3-dropdown-content w3-card-4">
                      <div class="w3-container h5">
                        <header className="">
                          <p className=" w3-border-bottom py-2">
                            Shopping Address
                          </p>
                        </header>
                        <p>
                          {details.orderAddress.street +
                            " , #" +
                            details.orderAddress.houseNumber}
                        </p>
                        <p>{details.orderAddress.city}</p>
                        <p>
                          {details.orderAddress.state +
                            " " +
                            details.orderAddress.postalCode}
                        </p>
                        <p>{details.orderAddress.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" col-12  col-md-2 d-flex justify-content-center">
                  <p className="h4">${" " + details?.total}</p>
                </div>
                <div className="col-12 col-md-2 d-flex justify-content-center justify-content-md-end">
                  <Link
                    className="me-2 w3-btn w3-indigo"
                    to={`/purchase/${details?.orderId}`}
                  >
                    <i class="fa-solid fa-receipt fa-lg"></i>
                  </Link>
                </div>
              </div>
            </li>

            <li className="w3-padding-large">
              <div className=" container-fluid py-2">
                <div className="row">
                  <div className=" mt-4">
                    <table className=" w3-table-all w3-card-4 w3-large w3-centered">
                      <thead className="">
                        <tr className="d-none d-md-table-row">
                          <th className="">Image</th>
                          <th>Details</th>
                          <th className="text-center ">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="">
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
                                style={{ width: "120px", height: "120px" }}
                                className="editp"
                              />
                            </td>
                            <td style={{ padding: "40px 0px" }}>
                              <p>{item.name + " " + item.brand}</p>
                            </td>
                            <td style={{ padding: "30px 0px" }}>
                              <div class="w3-dropdown-hover">
                                <button className="w3-btn w3-indigo">
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                                <div
                                  className="w3-dropdown-content w3-bar-block w3-card-4 w3-animate-zoom header_wrap"
                                  style={{ right: "0" }}
                                >
                                  <Link
                                    to={`/support/${item.orderId}/${item.productId}`}
                                    className="w3-bar-item w3-button"
                                  >
                                    Support
                                  </Link>
                                  <Link
                                    to={`/review/${item.productId}`}
                                    className="w3-bar-item w3-button"
                                  >
                                    Reviews
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        ))
      ) : (
        <>jfjlfkkjfl</>
      )}

      {response != null && response.data.length > 0 && (
        <div className="w3-center py-5">
          <div className="w3-bar" id="pag">
            <li
              onClick={GoDown}
              className={
                response.pageIndex > 1 ? "w3-button " : "w3-button w3-disabled"
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
  );
};
