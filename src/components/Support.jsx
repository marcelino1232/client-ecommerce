import React, { useEffect, useState } from "react";
import { supportsAdmin, supportChange } from "../services/supportService";
import { convertIntToArrayInit } from "../helpers/GetArray";
import { Link } from "react-router-dom";
import { Loading } from "../layout/Loading";
export const Support = () => {
  const [loading, setLoading] = useState(true);

  const [response, setResponse] = useState(null);

  const [pageNumer, setPageNumer] = useState(null);

  const [params, setParams] = useState({
    Search: "",
    PageIndex: 1,
    PageSize: 2,
  });

  useEffect(() => {
    onloading();
  }, [params.PageIndex, params.Search]);

  const onloading = async () => {
    setLoading(true);
    const request = await supportsAdmin(params);
    if (request != null) {
      setResponse(request.response);
      setPageNumer(convertIntToArrayInit(request.response.pageCount));
    }
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

  const removeSupport = async (e, SupportId) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want change the Status!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const request = await supportChange(SupportId);
        if (request.success) {
          await onloading();
        }
      }
    });
  };

  return (
    <div className=" container-fluid">
      <nav aria-label="breadcrumb" className="mt-3 w3-card">
        <ol className="breadcrumb py-2 ps-2">
          <li className="breadcrumb-item">
            <Link to="/v1">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Support
          </li>
        </ol>
      </nav>

      <div className="row mt-4">
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

      {loading ? (
        <Loading />
      ) : (
        response != null && (
          <div className=" mt-4">
            <table className=" w3-table-all w3-card-4 w3-large w3-centered">
              <thead className="">
                <tr className="d-none d-md-table-row">
                  <th>Product</th>
                  <th>Contact</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {response.data?.map((item, indice) => (
                  <tr
                    key={indice}
                    style={{ position: "relative", minHeight: "100%" }}
                    className="d-flex flex-column py-4 py-md-0 d-md-table-row h5"
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
                    {item.contactLabel == "EmailAddress" ? (
                      <td className="py-2 py-md-5">{item.emailAddress}</td>
                    ) : (
                      <td className="py-2 py-md-5">{item.cellPhone}</td>
                    )}

                    <td className="py-2 py-md-5">{item.message}</td>
                    <td className="py-2 py-md-5">{item.statusLabel}</td>
                    <td className="py-2 py-md-4">
                      <div class="w3-dropdown-hover mt-0 mt-md-3">
                        <button className="w3-btn w3-indigo">
                          <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <div
                          className="w3-dropdown-content w3-bar-block w3-card-4 w3-animate-zoom header_wrap"
                          style={{ right: "0" }}
                        >
                          <button
                            type="buttom"
                            className="w3-bar-item w3-button"
                            onClick={(e) => removeSupport(e, item.supportId)}
                          >
                            Resolved
                          </button>
                          <Link
                            to={`/v1/message/${item.supportId}`}
                            className="w3-bar-item w3-button"
                          >
                            Message
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

                {response.data.length <= 0 && (
                  <tr>
                    <td className="text-danger h4 py-3 w3-cursive" colSpan={5}>
                      there is not any support yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

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
        )
      )}
    </div>
  );
};
