import React from "react";
import { Link } from "react-router-dom";

export const OrderAddress = () => {
  const loading = false;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className=" container-fluid">
          <nav aria-label="breadcrumb" className="mt-3 w3-card ">
            <ol class="breadcrumb py-2 ps-2">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                <Link to="/shoppingCart">Cart</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Address
              </li>
            </ol>
          </nav>

          <div className="w3-light-grey w3-round-xxlarge my-4">
            <div
              className="w3-container w3-round w3-indigo"
              style={{ width: "50%" }}
            >
              50%
            </div>
          </div>

          <div className="w3-card w3-round ">
            <header className=" h4 w3-cursive py-3  container-fluid w3-border-bottom d-flex justify-content-between align-items-center">
              <p className=" mb-0"> List Of Address</p>

              <div>
                <button className="w3-btn  w3-padding-small w3-teal">
                  <i class="fa-solid fa-pen-to-square "></i>
                </button>
                <button className="w3-btn  w3-padding-small w3-indigo ms-2">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </header>
          </div>

          <div>
            <div className="d-flex flex-column w3-cursive h5 w3-card w3-display-container  w3-container py-2">
              <label className="my-2"> Address : 2425 Nostrand Ave</label>
              <label className="mb-2"> Aparment : 421</label>
              <label className="mb-2"> City : Brooklyn</label>
              <label className="mb-2"> State : New York</label>
              <label className="mb-2"> Country : United States</label>
              <span className="w3-button w3-display-topright h3">&times;</span>
            </div>

            <div className="d-flex flex-column w3-cursive h5 w3-card w3-container py-2">
              <label className="my-2"> Address : 2425 Nostrand Ave</label>
              <label className="mb-2"> Aparment : 421</label>
              <label className="mb-2"> City : Brooklyn</label>
              <label className="mb-2"> State : New York</label>
              <label className="mb-2"> Country : United States</label>
            </div>
            <div className="d-flex flex-column w3-cursive h5 w3-card w3-container py-2">
              <label className="my-2"> Address : 2425 Nostrand Ave</label>
              <label className="mb-2"> Aparment : 421</label>
              <label className="mb-2"> City : Brooklyn</label>
              <label className="mb-2"> State : New York</label>
              <label className="mb-2"> Country : United States</label>
            </div>
            <div className="d-flex flex-column w3-cursive h5 w3-card w3-container py-2">
              <label className="my-2"> Address : 2425 Nostrand Ave</label>
              <label className="mb-2"> Aparment : 421</label>
              <label className="mb-2"> City : Brooklyn</label>
              <label className="mb-2"> State : New York</label>
              <label className="mb-2"> Country : United States</label>
            </div>
          </div>

          <div className=" w3-cursive d-flex justify-content-between my-4">
            <Link className="w3-btn w3-indigo w3-round" to="/shoppingCart">
              Back
            </Link>
            <Link className="w3-btn w3-indigo w3-round" to="/orderPayment">
              Next
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
