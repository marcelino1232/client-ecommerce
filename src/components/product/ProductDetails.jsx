import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { productById } from "../../redux/actions/productAction";
import { ProductCategory } from "./ProductCategory";
import { ProductReviews } from "./ProductReviews";
import {
  getShoppingCartId,
  setShoppingCartId,
} from "../../helpers/GetShoppingCartStore";
import { addItem } from "../../redux/actions/shoppingCartAction";
import { Loading } from "../../layout/Loading";
export const ProductDetails = () => {
  let { ProductId } = useParams();

  const {
    loading,
    images,
    productId,
    name,
    brand,
    description,
    salesPrice,
    categoryId,
    reviews,
    results,
  } = useSelector((state) => state.productById);

  const { shoppingCart } = useSelector((state) => state.shoppingCart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productById(ProductId));
  }, [ProductId]);

  useEffect(() => {
    if (
      getShoppingCartId() == "00000000-0000-0000-0000-000000000000" &&
      shoppingCart != null
    ) {
      setShoppingCartId(shoppingCart.shoppingCartId);
    }
  }, [shoppingCart]);

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

  function AddToShopping(e) {
    e.preventDefault();

    const ShoppingCartId = getShoppingCartId();

    let request = {
      productId: parseInt(ProductId),
      name: name,
      brand: brand,
      description: description,
      salesPrice: salesPrice,
      quantity: quantity,
      categoryId: categoryId,
      shoppingCartId: ShoppingCartId,
    };

    dispatch(addItem(request));

    setQuantity(1);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                <div className="w3-content w3-card-4" style={{ width: "100%" }}>
                  {images.length > 0 &&
                    images.map((image, indice) =>
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
                    {images.length > 0 &&
                      images.map((image, indice) =>
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
                <header className="w3-border-bottom">
                  <h3 className="w3-center  py-3 w3-text-indigo w3-cursive">
                    Product Details
                  </h3>
                </header>
                <div className="w3-container  py-3">
                  <p
                    style={{ fontWeight: "bold" }}
                    className="h2 w3-cursive text-uppercase text-center"
                  >
                    {name} {brand}
                  </p>
                  <p className="h1 text-center py-3 w3-cursive">
                    $ {salesPrice}
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button className="w3-btn w3-indigo me-2" onClick={GoDown}>
                      <i class="fa-solid fa-minus"></i>
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
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>

                  <div className="d-flex  flex-column mt-5">
                    <button className="w3-btn w3-indigo w3-cursive w3-block w3-round-xxlarge mb-3 text-uppercase">
                      Buy It Now
                    </button>
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
                  <div class="w3-panel w3-border mt-0 w3-light-grey w3-round-large">
                    <p
                      style={{ fontWeight: "bold", fontSize: "18px" }}
                      className="py-2 w3-cursive"
                    >
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProductCategory results={results} />

          <ProductReviews reviews={reviews} />
        </div>
      )}
    </>
  );
};
