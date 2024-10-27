import React, { useEffect, useState } from "react";
import { adminReview, removeReview } from "../../../services/reviewService";
import { convertIntToArrayInit } from "../../../helpers/GetArray";
import { Loading } from "../../../layout/Loading";

export const AdminReview = () => {
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
    const request = await adminReview(params);
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

  const RemoveReview = async (e, reviewId) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeReview(reviewId);
        await onloading();
      }
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
          <div className=" w3-card-4">
            <header className="h3 py-2 text-center">Customer Reviews</header>
            <div className=" my-3">
              <table className=" w3-table-all w3-large w3-centered">
                <thead>
                  <tr className="d-none d-md-table-row">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Rating</th>
                    <th>Actions</th>
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
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.rating}</td>
                        <td>
                          <button
                            className="w3-btn w3-red me-1"
                            onClick={(e) => RemoveReview(e, item.reviewId)}
                          >
                            <i class="fa-solid fa-trash fa-lg"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <footer className="text-center">
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
