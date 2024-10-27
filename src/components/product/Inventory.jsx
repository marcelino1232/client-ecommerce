import React, { useEffect, useState } from "react";
import { convertIntToArrayInit } from "../../helpers/GetArray";
import { adminPagination } from "../../services/productService";
import { Loading } from "../../layout/Loading";
import { Link } from "react-router-dom";

export const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
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
    const request = await adminPagination(params);
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
      {loading ? (
        <Loading />
      ) : (
        <div className=" container-fluid">
          <div className="row my-4">
            <div className="col-0 col-sm-6 col-md-8 col-lg-9"></div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className=" input-group input-group-lg">
                <input
                  type="text"
                  id="txtSearch"
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

          <div className="row">
            <header className="d-flex justify-content-between align-items-center table-r col-12">
              <p className="h3 w3-cursive">List Of Product</p>
              <Link className="w3-btn w3-indigo" to={"/v1/create"}>
                <i class="fa-solid fa-plus fa-lg"></i>
              </Link>
            </header>
            <div className=" my-3 col-12">
              <table className=" w3-table-all w3-card-4 w3-large pb-5 w3-centered">
                <thead className="">
                  <tr className="d-none d-md-table-row">
                    <th>Image</th>
                    <th>Name</th>
                    <th>SalesPrice</th>
                    <th>BuyPrice</th>
                    <th>Accions</th>
                  </tr>
                </thead>
                <tbody>
                  {response != null &&
                    response.data?.map((item, indice) => (
                      <tr
                        key={indice}
                        className="d-flex flex-column py-4 py-md-0 d-md-table-row"
                      >
                        <td>
                          <img
                            src={`${
                              import.meta.env.VITE_Back_Domain
                            }/Product/getImageByProductId?ProductId=${
                              item.productId
                            }`}
                            alt=""
                            srcset=""
                            className="wisha"
                          />
                        </td>
                        <td>{item.name + " " + item.brand}</td>
                        <td>{item.salesPrice}</td>
                        <td>{item.buyPrice}</td>
                        <td className=" w3-center">
                          <div class="w3-dropdown-hover">
                            <button className="w3-btn w3-indigo">
                              <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div
                              className="w3-dropdown-content w3-bar-block w3-card-4 w3-animate-zoom header_wrap"
                              style={{ right: "0" }}
                            >
                              <Link
                                to={`/v1/update/${item.productId}`}
                                className="w3-bar-item w3-button"
                              >
                                Editar
                              </Link>
                              <Link
                                to={`/v1/productReview/${item.productId}`}
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
            <footer className="text-center col-12">
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
            </footer>
          </div>
        </div>
      )}
    </>
  );
};
