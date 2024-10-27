import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addToReview,
  getReviewByProductId,
  updateReview,
} from "../../services/reviewService";

export const CreateReview = () => {
  const { ProductId } = useParams();

  const navigate = useNavigate();

  const [response, setResponse] = useState(true);

  const [input, setInput] = useState({});

  useEffect(() => {
    onloading();
  }, [ProductId]);

  const onloading = async () => {
    const resquest = await getReviewByProductId(ProductId);

    if (resquest != null) {
      if (resquest.statusCode == 404) {
        navigate("/404");
      }

      if (resquest.statusCode == 500) {
        navigate("/500");
      }

      if (resquest.response != null) {
        setResponse(false);

        addRating(resquest.response.rating);

        setInput({
          ...input,
          productId: resquest.response.productId,
          reviewId: resquest.response.reviewId,
          rating: resquest.response.rating,
          description: resquest.response.description,
        });
      } else {
        setResponse(true);
        clearReting();
        setInput({
          ...input,
          productId: ProductId,
          reviewId: 0,
          rating: 0,
          description: "",
        });
      }
    }
  };

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const setRating = (e, rating) => {
    e.preventDefault();

    setInput({
      ...input,
      rating: rating,
    });

    addRating(rating);
  };

  const addRating = (number) => {
    let rating = document.querySelectorAll(".ranting");

    for (var i = 0; i < rating.length; i++) {
      rating[i].classList.remove("w3-indigo");
    }

    for (var j = 0; j < number; j++) {
      rating[j].classList.add("w3-indigo");
    }
  };

  const clearReting = () => {
    let rating = document.querySelectorAll(".ranting");

    for (var i = 0; i < rating.length; i++) {
      rating[i].classList.remove("w3-indigo");
    }
  };

  const AddReview = async (e) => {
    e.preventDefault();

    if (response) {
      await addToReview(input);
    } else {
      await updateReview(input);
    }

    navigate("/purchase");
  };

  return (
    <>
      <div className=" container-fluid">
        <nav aria-label="breadcrumb" className="mt-3 w3-card">
          <ol className="breadcrumb py-2 ps-2">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/purchase">Purchase</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Review
            </li>
          </ol>
        </nav>

        <form onSubmit={(e) => AddReview(e)}>
          <div class=" w3-card">
            <header class="w3-container w3-teal py-3 text-center">
              <h2 className=" w3-cursive">
                {response == null ? "Product Review" : "Edit Review"}
              </h2>
            </header>
            <div class="w3-container text-center">
              <label className="my-3 h4 w3-cursive">Quality of Service</label>
              <div className="w3-center">
                <div class="w3-bar pt-2">
                  <button
                    onClick={(e) => setRating(e, 1)}
                    className="w3-bar-item w3-button w3-border ranting  w3-hover-indigo"
                  >
                    1
                  </button>
                  <button
                    onClick={(e) => setRating(e, 2)}
                    className="w3-bar-item w3-button w3-border ranting  w3-hover-indigo"
                  >
                    2
                  </button>
                  <button
                    onClick={(e) => setRating(e, 3)}
                    className="w3-bar-item w3-button w3-border ranting  w3-hover-indigo"
                  >
                    3
                  </button>
                  <button
                    onClick={(e) => setRating(e, 4)}
                    className="w3-bar-item w3-button w3-border ranting w3-hover-indigo"
                  >
                    4
                  </button>
                  <button
                    onClick={(e) => setRating(e, 5)}
                    className="w3-bar-item w3-button w3-border ranting  w3-hover-indigo"
                  >
                    5
                  </button>
                </div>
              </div>
              <label className="mb-3 h5 w3-cursive">
                1 Poor And 5 Excellent
              </label>
              <div className="input-group-lg my-3">
                <textarea
                  type="text"
                  name="description"
                  value={
                    input.description == undefined ? "" : input.description
                  }
                  onChange={(e) => inputHandler(e)}
                  className="form-control"
                  placeholder="Description..."
                ></textarea>
              </div>
            </div>
            <footer className="w3-container d-flex justify-content-end py-3 w3-border-top w3-cursive h5">
              <Link
                type="button"
                className="w3-btn w3-red me-2 w3-round-large "
                to={"/purchase"}
              >
                Cancel
              </Link>
              <button
                type="submit"
                className={"w3-btn  w3-teal w3-round-large "}
              >
                Accept
              </button>
            </footer>
          </div>
        </form>
      </div>
    </>
  );
};
