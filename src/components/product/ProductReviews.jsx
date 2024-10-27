import React from "react";
import { convertIntToArray } from "../../helpers/GetArray";

export const ProductReviews = ({ reviews }) => {
  return (
    <>
      <div className="w3-card w3-container">
        <div className="row py-4">
          <h2 className="  h3 text-uppercase text-center">Product Reviews</h2>
        </div>
      </div>

      {reviews != null && reviews.length > 0 ? (
        reviews.map((review) => (
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
    </>
  );
};
