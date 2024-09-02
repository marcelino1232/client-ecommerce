import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProductDetails } from "./ProductDetails";
import MultiRangeSlider from "multi-range-slider-react";

export const Products = () => {

  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(10000);

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  const setCategory = (e) => {
    
    const categories = document.querySelectorAll(".categorymenu");

    for (let i = 0; i < categories.length; i++) {

      categories[i].classList.remove("w3-teal");
    }
    e.target.classList.add("w3-teal");
  };

  const CloseModel = () => {
    document.getElementById("productdetails").style.display = "none";
  };

  const OpenModel = () => {
    document.getElementById("productdetails").style.display = "block";
  };

  return (
    <>
      <div className=" container-fluid ">
        <nav aria-label="breadcrumb" className="mt-3 w3-card">
          <ol className="breadcrumb py-2 ps-2">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Product
            </li>
          </ol>
        </nav>

        <div className="row py-5">
          <div className="col-12 col-md-4 mb-4 ">
            <div className="d-flex gap-1">
              <input className="w3-input" type="text" placeholder="Search..." />
              <button className="w3-btn w3-teal">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="mt-4">
              <label className="h5 d-flex justify-content-between mb-3">
                <label>Range</label>
                <label>
                  {minValue} - {maxValue}
                </label>
              </label>
              <MultiRangeSlider
                min={0}
                max={10000}
                step={5}
                minValue={minValue}
                maxValue={maxValue}
                ruler={false}
                barInnerColor="#008080"
                onInput={(e) => {
                  handleInput(e);
                }}
              />
            </div>
            <div className="mt-3">
              <ul className="w3-ul w3-card-4">
                <li>
                  <h2 className="h5 text-center">Category</h2>
                </li>
                <li
                  className="w3-teal categorymenu"
                  onClick={(e) => setCategory(e)}
                >
                  Jill
                </li>
                <li className="categorymenu" onClick={(e) => setCategory(e)}>
                  Eve
                </li>
                <li className="categorymenu" onClick={(e) => setCategory(e)}>
                  Adam
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-8 w3-card">
            <h2 className="text-uppercase w3-text-teal py-4 text-center">
              List of Product
            </h2>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-3 pb-4">
                <div className="w3-card w3-hover-shadow">
                  <div className="w3-display-container">
                    <img
                      src="/src/assets/imgs/istockphoto-519728153-612x612.jpg"
                      alt="Avatar"
                      style={{ width: "100%" }}
                    />
                    <div className=" w3-display-bottomleft w3-display-hover">
                      <button
                        className="w3-button w3-hover-green w3-teal"
                        onClick={OpenModel}
                      >
                        More About!
                      </button>
                    </div>
                    <div className=" w3-display-bottomright w3-display-hover">
                      <button className="w3-button w3-hover-green w3-teal">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                  <div className="w3-container w3-center">
                    <p className="mt-3 h5">The Italian / Austrian Alps</p>
                    <p className="h3">$ 300</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 pb-4">
                <div className="w3-card w3-hover-shadow">
                  <img
                    src="/src/assets/imgs/istockphoto-519728153-612x612.jpg"
                    alt="Alps"
                    style={{ width: "100%" }}
                  />
                  <div className="w3-container w3-center">
                    <p className="mt-3 h5">The Italian / Austrian Alps</p>
                    <p className="h3">$ 1200</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 pb-4">
                <div className="w3-card w3-hover-shadow">
                  <img
                    src="/src/assets/imgs/istockphoto-519728153-612x612.jpg"
                    alt="Alps"
                    style={{ width: "100%" }}
                  />
                  <div className="w3-container w3-center">
                    <p className="mt-3 h5">The Italian / Austrian Alps</p>
                    <p className="h3">$ 700</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 pb-4">
                <div className="w3-card w3-hover-shadow">
                  <img
                    src="/src/assets/imgs/istockphoto-519728153-612x612.jpg"
                    alt="Alps"
                    style={{ width: "100%" }}
                  />
                  <div className="w3-container w3-center">
                    <p className="mt-3 h5">The Italian / Austrian Alps</p>
                    <p className="h3">$ 500</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ProductDetails Model */}

      <ProductDetails CloseModel={CloseModel} />
    </>
  );
};
