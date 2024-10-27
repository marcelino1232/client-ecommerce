import React, { useEffect, useState } from "react";
import { Loading } from "../../../layout/Loading";
import { convertIntToArray } from "../../../helpers/GetArray";
import { userReview } from "../../../services/userService";
import { Link, useParams } from "react-router-dom";

export const UserReview = () => {
  const { UserId } = useParams();

  const [loading, setLoading] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    onloading();
  }, []);

  const onloading = async () => {
    const request = await userReview(UserId);

    setResponse(request.response);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className=" container-fluid">
          <div className="w3-card w3-container mt-4">
            <div className=" py-1 d-flex justify-content-between align-items-center">
              <p className="  h4 text-uppercase">User Reviews</p>
              <Link to={"/v1/user"} className=" w3-btn w3-indigo w3-round-large h5 mt-1">
                Back
              </Link>
            </div>
          </div>

          {response != null && response.reviews?.length > 0 ? (
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
                    This User does not have any review yet!
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
