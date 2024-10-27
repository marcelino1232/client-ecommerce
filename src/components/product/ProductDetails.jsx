import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductCategory } from "./ProductCategory";
import { ProductReviews } from "./ProductReviews";
import { getShoppingCartId } from "../../helpers/GetShoppingCartStore";
import { Loading } from "../../layout/Loading";
import { getToken } from "../../helpers/GetToken";
import { productById } from "../../services/productService";
import { addToWish } from "../../services/wishService";
import { addToShoppingCart } from "../../services/shoppingCartService";
import { ShoppingCartCount } from "../../layout/Layout";

export const ProductDetails = () => {
  const navegate = useNavigate();

  let { ProductId } = useParams();

  const [response, setResponse] = useState();

  const [loading, setLoading] = useState(true);

  const auth = getToken();

  const { setCount } = useContext(ShoppingCartCount);

  const [wish, setWish] = useState();

  useEffect(() => {
    onloading();
  }, [ProductId]);

  const onloading = async () => {
    setLoading(true);
    var request = await productById(ProductId);
    setResponse(request.response);

    if (request.statusCode == 404) {
      navegate("/404");
    }

    if (auth != null) {
      setLoading(false);

      setWish(request.response.wish);
    } else {
      setLoading(false);
    }
  };

  const [quantity, setQuantity] = useState(1);

  const GoUp = () => {
    if (quantity >= 99) {
    } else {
      setQuantity((q) => q + 1);
    }
  };

  const GoDown = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  function currentDiv(n) {
    showDivs(n);
  }

  function showDivs(n) {
    var slideIndex = n;
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");

    if (n > x.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-opacity-off";
  }

  async function AddToShopping(e) {
    e.preventDefault();

    const ShoppingCartId = getShoppingCartId();

    let request = {
      productId: parseInt(ProductId),
      name: response.name,
      brand: response.brand,
      description: response.description,
      salesPrice: response.salesPrice,
      quantity: quantity,
      categoryId: response.categoryId,
      shoppingCartId: ShoppingCartId,
    };

    var result = await addToShoppingCart(request);

    setQuantity(1);

    if (result.response != null) {
      setCount(result.response.count);
      Swal.fire({
        icon: "success",
        title: "Product added to cart successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  const changeWish = async (e) => {
    e.preventDefault();
    var request = {
      ProductId: ProductId,
    };

    const wishStatus = await addToWish(request);
    setWish(wishStatus.wish);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        response != null && (
          <div className=" container-fluid ">
            <nav aria-label="breadcrumb" className="mt-3 w3-card">
              <ol className="breadcrumb py-2 ps-2">
                <li className="breadcrumb-item">
                  <Link to="/">Product</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Details
                </li>
              </ol>
            </nav>

            <div className="row py-4">
              <div className="col-12 col-md-6">
                {
                  <div
                    className="w3-content w3-card-4"
                    style={{ width: "100%" }}
                  >
                    {response.images.length > 0 &&
                      response.images.map((image, indice) =>
                        indice == 0 ? (
                          <img
                            className="mySlides w3-border-bottom editp"
                            key={indice}
                            src={`${
                              import.meta.env.VITE_Back_Domain
                            }/Product/getImageByName?imageName=${
                              image.imageName
                            }`}
                            style={{
                              display: "block",
                            }}
                          />
                        ) : (
                          <img
                            className="mySlides w3-border-bottom editp"
                            key={indice}
                            src={`${
                              import.meta.env.VITE_Back_Domain
                            }/Product/getImageByName?imageName=${
                              image.imageName
                            }`}
                            style={{
                              display: "none",
                            }}
                          />
                        )
                      )}
                    <div className="w3-row-padding  py-3 w3-indigo">
                      {response.images.length > 0 &&
                        response.images.map((image, indice) =>
                          indice == 0 ? (
                            <div key={indice} className="w3-col s3">
                              <img
                                className="demo w3-opacity w3-opacity-off w3-hover-opacity-off"
                                src={`${
                                  import.meta.env.VITE_Back_Domain
                                }/Product/getImageByName?imageName=${
                                  image.imageName
                                }`}
                                style={{ width: "100%", cursor: "pointer" }}
                                onClick={(e) => currentDiv(indice + 1)}
                              />
                            </div>
                          ) : (
                            <div key={indice} className="w3-col s3">
                              <img
                                className="demo w3-opacity w3-hover-opacity-off"
                                src={`${
                                  import.meta.env.VITE_Back_Domain
                                }/Product/getImageByName?imageName=${
                                  image.imageName
                                }`}
                                style={{ width: "100%", cursor: "pointer" }}
                                onClick={(e) => currentDiv(indice + 1)}
                              />
                            </div>
                          )
                        )}
                    </div>
                  </div>
                }
              </div>
              <div className="col-12 col-md-6 mt-4 mt-md-0">
                <div className="w3-card">
                  <header
                    className={
                      auth == null
                        ? "container-fluid w3-border-bottom d-flex justify-content-center align-items-center"
                        : "container-fluid w3-border-bottom d-flex justify-content-between align-items-center"
                    }
                  >
                    <h3 className="py-3 w3-text-indigo w3-cursive">
                      Product Details
                    </h3>
                    {auth != null &&
                      (wish ? (
                        <button
                          type="button"
                          style={{
                            backgroundColor: "#fff",
                            cursor: "pointer",
                          }}
                          className={"m-0 p-0 w3-border-0 w3-text-teal"}
                          onClick={(e) => changeWish(e)}
                          id="btnWish"
                        >
                          <span className="fa-solid fa-heart fa-3x"></span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          style={{
                            backgroundColor: "#fff",
                            cursor: "pointer",
                          }}
                          className={"m-0 p-0 w3-border-0"}
                          onClick={(e) => changeWish(e)}
                          id="btnWish"
                        >
                          <span className="fa-solid fa-heart fa-3x"></span>
                        </button>
                      ))}
                  </header>
                  <div className="w3-container  py-3">
                    <p
                      style={{ fontWeight: "bold" }}
                      className="h2 w3-cursive text-uppercase text-center"
                    >
                      {response.name} {response.brand}
                    </p>
                    <p className="h1 text-center py-3 w3-cursive">
                      $ {response.salesPrice}
                    </p>

                    <div className="d-flex justify-content-center mb-2">
                      <button
                        className="w3-btn w3-indigo me-2"
                        onClick={GoDown}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <p
                        style={{
                          width: "40px",
                          display: "block",
                          lineHeight: "35px",
                          fontWeight: "bold",
                        }}
                        className="w3-border w3-center mb-0"
                        disabled
                      >
                        {quantity}
                      </p>
                      <button className="w3-btn w3-indigo ms-2" onClick={GoUp}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>

                    <div className="d-flex  flex-column mt-5">
                      <button
                        onClick={(e) => AddToShopping(e)}
                        className="w3-btn w3-indigo w3-cursive w3-block w3-round-xxlarge mb-3 text-uppercase"
                      >
                        Add to Cart
                      </button>
                      <Link
                        to="/"
                        className="w3-btn w3-indigo w3-block w3-cursive w3-round-xxlarge text-uppercase mb-3"
                      >
                        Keep Shopping
                      </Link>
                    </div>

                    <label
                      style={{ fontWeight: "bold", fontSize: "20px" }}
                      className="h5 mt-4 w3-cursive"
                    >
                      Product Description
                    </label>
                    <div className="w3-panel w3-border mt-0 w3-light-grey w3-round-large">
                      <p
                        style={{ fontWeight: "bold", fontSize: "18px" }}
                        className="py-2 w3-cursive"
                      >
                        {response.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ProductCategory ProductId={ProductId} />
            <ProductReviews reviews={response.reviews} />
          </div>
        )
      )}
    </>
  );
};
