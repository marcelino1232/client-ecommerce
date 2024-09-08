import React from "react";

export const ProductCategory = ({ results }) => {

  return (
    <div className="row py-4">
    <h2 className=" pb-5 h3 text-uppercase text-center">Similar Products</h2>
      {results != null &&
        results.length > 0 &&
        results.map((product, indice) => (
          <div key={indice} className="col-12 col-md-6 col-lg-3 pb-4">
            <div className="w3-card w3-hover-shadow">
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
                <p className="mt-3 h5 text-uppercase w3-cursive">
                  {product.name} {product.brand}
                </p>
                <p className="h3 w3-cursive">$ {product.salesPrice}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
