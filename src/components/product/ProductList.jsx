import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginationProduct } from "../../redux/actions/productAction";
import { convertIntToArray } from "../../helpers/GetArray";

export const ProductList = ({ pagination, setPagination }) => {
  const { pageCount, loading, products } = useSelector(
    (state) => state.paginationProduct
  );

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(paginationProduct(pagination));
  }, [pagination.PageIndex]);

  const changePage = function (e) {
    e.preventDefault();
    const categories = document.querySelectorAll(".pagProduct");

    for (let i = 0; i < categories.length; i++) {
      categories[i].classList.remove("w3-indigo");
    }

    e.target.classList.add("w3-indigo");

    setPagination({ ...pagination, PageIndex: parseInt(e.target.dataset.id) });
  };

  const GoUp = () => {
    if (pagination.PageIndex < pageCount) {
      setPagination({ ...pagination, PageIndex: pagination.PageIndex + 1 });
    }
  };

  const GoDown = () => {
    if (pagination.PageIndex > 1) {
      setPagination({ ...pagination, PageIndex: pagination.PageIndex - 1 });
    }
  };

  const pages = convertIntToArray(parseInt(pageCount));

  return (
    <>
      <div className="col-12 col-md-8 w3-card">
        <h2 className="text-uppercase w3-text-indigo py-4 text-center">
          List of Product
        </h2>
        <div className="row">
          {loading ? (
            <p>loading...</p>
          ) : (
            products != null &&
            products.length > 0 &&
            products.map((product, indice) => (
              <div key={indice} className="col-12 col-md-6 col-lg-3 pb-4">
                <div className="w3-card w3-hover-shadow editp">
                  <img
                    src={`https://localhost:7149/Product/getImageByName?imageName=${product.images[0].imageName}`}
                    alt="Alps"
                    style={{ width: "100%", height: "275px" }}
                    className="w3-card-img-top"
                  />
                  <div className="w3-container w3-center w3-indigo">
                    <p className="mt-3 h5">
                      {product.name} / {product.brand}
                    </p>
                    <p className="h3">$ {product.salesPrice}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="w3-center py-5">
          <div className="w3-bar" id="pag">
            <li
              onClick={GoDown}
              className={
                pagination.PageIndex > 1
                  ? "w3-button "
                  : "w3-button w3-disabled"
              }
            >
              &laquo;
            </li>
            {loading == false &&
              pages.map((page) =>
                page == pagination.PageIndex ? (
                  <li
                    key={page}
                    data-id={page}
                    onClick={(e) => changePage(e)}
                    className="w3-button w3-indigo pagProduct"
                  >
                    {page}
                  </li>
                ) : (
                  <li
                    key={page}
                    data-id={page}
                    onClick={(e) => changePage(e)}
                    className="w3-button pagProduct"
                  >
                    {page}
                  </li>
                )
              )}
            <li
              onClick={GoUp}
              className={
                pagination.PageIndex < pageCount
                  ? "w3-button "
                  : "w3-button w3-disabled"
              }
            >
              &raquo;
            </li>
          </div>
        </div>
      </div>
    </>
  );
};
