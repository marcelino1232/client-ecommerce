import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../../layout/Loading";
import {
  removeReview,
  reviewPagination,
  updateReview,
} from "../../../services/reviewService";
import { convertIntToArrayInit } from "../../../helpers/GetArray";

export const Review = () => {
  const [loading, setLoading] = useState(true);

  const [response, setResponse] = useState(null);

  const [pageNumer, setPageNumer] = useState(null);

  const navegate = useNavigate();

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
    const request = await reviewPagination(params);
    setResponse(request.response);
    setPageNumer(convertIntToArrayInit(request.response.pageCount));
    setLoading(false);
  };

  const [input, setInput] = useState({});

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const OpenModelCreate = (e, item) => {
    clearReting();

    e.preventDefault();

    setInput({
      ...input,
      reviewId: item.reviewId,
      rating: item.rating,
      description: item.description,
    });

    addRating(item.rating);

    document.getElementById("idReview").style.display = "block";
  };

  const CloseModelCreate = () => {
    document.getElementById("idReview").style.display = "none";
  };

  const setRating = (e, rating) => {
    e.preventDefault();
    setInput({
      ...input,
      rating: rating,
    });

    addRating(rating);
  };

  const addRating = (number) => {
    let rating = document.querySelectorAll(".ranting");

    for (var i = 0; i < rating.length; i++) {
      rating[i].classList.remove("w3-indigo");
    }

    for (var j = 0; j < number; j++) {
      rating[j].classList.add("w3-indigo");
    }
  };

  const clearReting = () => {
    let rating = document.querySelectorAll(".ranting");

    for (var i = 0; i < rating.length; i++) {
      rating[i].classList.remove("w3-indigo");
    }
  };

  const productDetails = (e, ProductId) => {
    e.preventDefault();
    navegate(`/products/${ProductId}`);
  };

  const UpdateReview = async (e) => {
    e.preventDefault();
    await updateReview(input);
    CloseModelCreate();
    await onloading();
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
        <ol class="breadcrumb py-2 ps-2">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Review
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
                  <th className="">Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Rating</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {response.data?.map((item, indice) => (
                  <tr
                    key={indice}
                    className="d-flex flex-column py-4 py-md-0 d-md-table-row h5"
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
                        style={{ width: "120px", height: "120px" }}
                        className="editp"
                        onClick={(e) => productDetails(e, item.productId)}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.rating}</td>
                    <td className="">
                      <button
                        className="w3-btn w3-blue me-1  mb-2 mb-lg-0"
                        onClick={(e) => OpenModelCreate(e, item)}
                      >
                        <i class="fa-solid fa-pen-to-square fa-lg"></i>
                      </button>

                      <button
                        className="w3-btn w3-red me-1 mb-2 mb-lg-0"
                        onClick={(e) => RemoveReview(e, item.reviewId)}
                      >
                        <i class="fa-solid fa-trash fa-lg"></i>
                      </button>
                    </td>
                  </tr>
                ))}
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

      <form onSubmit={(e) => UpdateReview(e)} id="idReview" class="w3-modal">
        <div class="w3-modal-content w3-animate-zoom">
          <header class="w3-container w3-teal py-3 text-center">
            <h2 className=" w3-cursive">Update Review</h2>
          </header>
          <div class="w3-container text-center">
            <label className="my-3 h4 w3-cursive">Quality of Service</label>
            <div className="w3-center">
              <div class="w3-bar pt-2">
                <button
                  onClick={(e) => setRating(e, 1)}
                  className="w3-bar-item w3-button w3-border ranting  w3-hover-indigo"
                >
                  1
                </button>
                <button
                  onClick={(e) => setRating(e, 2)}
                  className="w3-bar-item w3-button w3-border ranting  w3-hover-indigo"
                >
                  2
                </button>
                <button
                  onClick={(e) => setRating(e, 3)}
                  className="w3-bar-item w3-button w3-border ranting  w3-hover-indigo"
                >
                  3
                </button>
                <button
                  onClick={(e) => setRating(e, 4)}
                  className="w3-bar-item w3-button w3-border ranting w3-hover-indigo"
                >
                  4
                </button>
                <button
                  onClick={(e) => setRating(e, 5)}
                  className="w3-bar-item w3-button w3-border ranting  w3-hover-indigo"
                >
                  5
                </button>
              </div>
            </div>
            <label className="mb-3 h5 w3-cursive">1 Poor And 5 Excellent</label>
            <div className="input-group-lg my-3">
              <textarea
                type="text"
                name="description"
                value={input.description == undefined ? "" : input.description}
                onChange={(e) => inputHandler(e)}
                className="form-control"
                placeholder="Description..."
              ></textarea>
            </div>
          </div>
          <footer className="w3-container d-flex justify-content-end py-3 w3-border-top w3-cursive h5">
            <button
              type="button"
              className="w3-btn w3-red me-2 "
              onClick={CloseModelCreate}
            >
              Cancel
            </button>
            <button type="submit" className={"w3-btn  w3-teal"}>
              Accept
            </button>
          </footer>
        </div>
      </form>
    </div>
  );
};
