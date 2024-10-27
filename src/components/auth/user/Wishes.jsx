import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../../layout/Loading";
import {
  setShoppingCartId,
  getShoppingCartId,
} from "../../../helpers/GetShoppingCartStore";
import {
  addItemByWish,
  removeWish,
  wishPagination,
} from "../../../services/wishService";
import { ShoppingCartCount } from "../../../layout/Layout";
import { convertIntToArrayInit } from "../../../helpers/GetArray";

export const Wishes = () => {
  
  const { setCount } = useContext(ShoppingCartCount);

  const [response, setResponse] = useState();

  const [loading, setLoading] = useState(true);

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
    const request = await wishPagination(params);
    setResponse(request.response);
    setPageNumer(convertIntToArrayInit(request.response.pageCount));
    setLoading(false);
  };

  const DeleteItem = async (ListWishId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeWish(ListWishId);
        await onloading();
      }
    });
  };

  const AddToShop = async (e, ListWishId, item) => {
    e.preventDefault();

    const ShoppingCartId = getShoppingCartId();

    let request = {
      ListWishId: ListWishId,
      productId: item.productId,
      name: item.name,
      brand: item.brand,
      description: item.description,
      salesPrice: item.salesPrice,
      quantity: item.quantity,
      categoryId: item.categoryId,
      shoppingCartId: ShoppingCartId,
    };

    const payload = await addItemByWish(request);

    if (ShoppingCartId == "00000000-0000-0000-0000-000000000000") {
      setShoppingCartId(payload.response.shoppingCartId);
    }

    setCount(payload.response.count);

    await onloading();

    Swal.fire({
      icon: "success",
      title: "Product added to cart successfully",
      showConfirmButton: false,
      timer: 1500,
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
            Wish
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

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w3-card-4 w3-round ">
            <header className=" h4 w3-cursive py-3  container-fluid w3-border-bottom">
              List of Wishes
            </header>
            {response != null &&
            response.data != null &&
            response.data.length > 0 ? (
              response.data.map((item) => (
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
                        className="wish"
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-3 mb-md-0 h4 w3-cursive d-flex align-items-center justify-content-center">
                      {item.name + " " + item.brand}
                    </div>
                    <div className="col-12 col-md-3 h4 w3-cursive d-flex align-items-center justify-content-center mb-3 mb-md-0">
                      {item.salesPrice}
                    </div>

                    <div className="col-12 col-md-3 d-flex align-items-center justify-content-center mb-3 mb-md-0">
                      <button
                        className="w3-btn w3-teal me-2"
                        onClick={(e) => AddToShop(e, item.listWishId, item)}
                      >
                        <i class="fa-solid fa-cart-shopping"></i>
                      </button>
                      <button
                        className="w3-btn w3-red"
                        onClick={(e) => DeleteItem(item.listWishId)}
                      >
                        <i class="fa-solid fa-trash"></i>
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
                      The List of Wish is Empty
                    </p>
                  </div>
                </div>
              </div>
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
      )}
    </div>
  );
};
