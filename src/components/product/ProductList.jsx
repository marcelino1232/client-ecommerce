import React, { useEffect } from "react";
import { convertIntToArray } from "../../helpers/GetArray";
import { useNavigate } from "react-router-dom";
import { productOnLoading } from "../../services/productService";

export const ProductList = ({
  pagination,
  setPagination,
  setResponse,
  response,
}) => {
  let navigate = useNavigate();

  const { products, pageCount, totalCount } = response;

  useEffect(() => {
    changeIndex();
  }, [pagination]);

  const changeIndex = async () => {
    var request = await productOnLoading(pagination);
    setResponse(request.response);
  };

  const changePage = async function (e) {
    e.preventDefault();

    const categories = document.querySelectorAll(".pagProduct");

    for (let i = 0; i < categories.length; i++) {
      categories[i].classList.remove("w3-indigo");
    }

    e.target.classList.add("w3-indigo");

    setPagination({ ...pagination, PageIndex: parseInt(e.target.dataset.id) });

    var request = await productOnLoading(pagination);

    setResponse(request.response);
  };

  const GoUp = async () => {
    if (pagination.PageIndex < pageCount) {
      setPagination({ ...pagination, PageIndex: pagination.PageIndex + 1 });
      var request = await productOnLoading(pagination);
      setResponse(request.response);
    }
  };

  const GoDown = async () => {
    if (pagination.PageIndex > 1) {
      setPagination({ ...pagination, PageIndex: pagination.PageIndex - 1 });

      var request = await productOnLoading(pagination);
      setResponse(request.response);
    }
  };

  const productDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  const pages = convertIntToArray(parseInt(pageCount));

  return (
    <>
      <div className="col-12 col-md-12 col-lg-12">
        <h2 className="text-uppercase w3-cursive w3-text-indigo pb-5 text-center">
          List of Product
        </h2>
        <div className="row">
          {products != null && products.length > 0 ? (
            products.map((product, indice) => (
              <div key={indice} className="col-12 col-md-6 col-lg-3 pb-4">
                <div
                  className="w3-card w3-hover-shadow editp"
                  onClick={(e) => productDetails(product.productId)}
                >
                  <img
                    src={`${
                      import.meta.env.VITE_Back_Domain
                    }/Product/getImageByName?imageName=${
                      product.images[0].imageName
                    }`}
                    alt="Alps"
                    style={{ width: "100%", height: "275px" }}
                    className="w3-card-img-top"
                  />
                  <div className="w3-container w3-center w3-indigo">
                    <p className="mt-3 h5 text-uppercase">
                      {product.name} {product.brand}
                    </p>
                    <p className="h3 w3-cursive">$ {product.salesPrice}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className=" w3-cursive text-danger text-center h3 my-5">
              Sorry but, The Product was not found
            </p>
          )}
        </div>
        {totalCount > pagination.PageSize && (
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
              {pages.map((page) =>
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
        )}
      </div>
    </>
  );
};
