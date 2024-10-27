import React, { useEffect, useState } from "react";
import { convertIntToArray } from "../../helpers/GetArray";
import { Link, useParams } from "react-router-dom";
import { productWithReview } from "../../services/productService";
import { Loading } from "../../layout/Loading";

export const InventoryReview = () => {
  const { ProductId } = useParams();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onloading();
  }, []);

  const onloading = async () => {
    setLoading(true);
    var request = await productWithReview(ProductId);
    setResponse(request.response);
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className=" container-fluid">
          <div className="w3-card w3-container mt-4">
            <div className=" py-1 d-flex justify-content-between align-items-center">
              <p className="  h4 text-uppercase">Product Reviews</p>
              <Link
                to={"/v1"}
                className=" w3-btn w3-indigo w3-round-large h5 mt-1"
              >
                Back
              </Link>
            </div>
          </div>

          {response != null && response.reviews.length > 0 ? (
            response.reviews.map((review) => (
              <div className=" w3-panel  w3-card-4 w3-container py-4">
                <div className="row">
                  <div className="col-12 ">
                    <div className="d-flex justify-content-between mb-2 w3-border-bottom py-2">
                      <p className="w3-cursive h3">{review.name}</p>
                      <div className="h3">
                        {convertIntToArray(5).map((rating) =>
                          review.rating >= rating ? (
                            <i class="fa-solid fa-star w3-text-yellow"></i>
                          ) : (
                            <i class="fa-regular fa-star"></i>
                          )
                        )}
                      </div>
                    </div>
                    <div class="form-group mt-3">
                      <label
                        for="exampleFormControlTextarea1"
                        className="w3-cursive h4"
                      >
                        Comment
                      </label>
                      <textarea
                        className="form-control w3-cursive"
                        style={{ fontSize: "25px" }}
                        disabled
                      >
                        {review.description}
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w3-container w3-panel  w3-card-4 w3-container py-4">
              <div className="row">
                <div className="col-12 text-center">
                  <p className="h4 w3-cursive py-3">
                    This Product does not have any review yet!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
