import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productCategory } from "../../services/productService";

export const ProductCategory = ({ ProductId }) => {
  
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);

  useEffect(() => {
    onloading();
  }, [ProductId]);

  const onloading = async () => {

    setLoading(true);

    var request = await productCategory(ProductId);

    setData(request.data);

    setLoading(false);
  };

  const productDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <>
      {!loading && (
        <div className="row py-4">
          <h2 className=" pb-5 h3 text-uppercase text-center">
            Similar Products
          </h2>
          {data != null &&
            data.length > 0 &&
            data.map((product, indice) => (
              <div key={indice} className="col-12 col-md-6 col-lg-3 pb-4">
                <div
                  className="w3-card w3-hover-shadow editp"
                  onClick={(e) => productDetails(product.productId)}
                >
                  <img
                    src={`${
                      import.meta.env.VITE_Back_Domain
                    }/Product/getImageByName?imageName=${product.imageName}`}
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
      )}
    </>
  );
};
