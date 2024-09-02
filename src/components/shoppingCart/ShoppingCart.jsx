import React from "react";
import { Link } from "react-router-dom";
export const ShoppingCart = () => {
  return (
    <>
      <div className=" container-fluid">
        <nav aria-label="breadcrumb" className="mt-3 w3-card">
          <ol class="breadcrumb py-2 ps-2">
            <li class="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Cart
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
};
