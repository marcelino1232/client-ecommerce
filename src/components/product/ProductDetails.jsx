import React from "react";

export const ProductDetails = ({CloseModel}) => {
  return (
    <div id="productdetails" className="w3-modal">
      <div className="w3-modal-content w3-card-4 w3-animate-zoom">
        <header className="w3-container  text-center  w3-teal">
          <h2>Product Details</h2>
        </header>
        <div className="w3-container">
          <p>Some text in the Modal..</p>
          <p>Some text in the Modal..</p>
        </div>
        <footer className="w3-container w3-teal  d-flex justify-content-end">
          <button className="w3-button" onClick={CloseModel}>
            &times;
          </button>
        </footer>
      </div>
    </div>
  );
};
