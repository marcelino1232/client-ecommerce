import React from "react";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className=" container-fluid" style={{ minHeight: "50vh" }}>
      <nav aria-label="breadcrumb" className="mt-3 w3-card">
        <ol class="breadcrumb py-2 ps-2">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            About
          </li>
        </ol>
      </nav>

      <div className="card mb-3" style={{ minWidth: "100%", maxWidth: "100%" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="src/assets/imgs/company.jpg"
              className="img-fluid rounded-start"
              alt="..."
              style={{ maxHeight: "300px", width: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">About Us</h5>
              <p className="card-text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Recusandae saepe delectus, et suscipit dignissimos nemo odio aut
                rerum sunt asperiores cupiditate perferendis dolores eos unde,
                incidunt temporibus aspernatur consectetur quasi.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3" style={{ minWidth: "100%", maxWidth: "100%" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="src/assets/imgs/houseimg.jpg"
              className="img-fluid rounded-start"
              alt="..."
              style={{ maxHeight: "300px", width: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Our Mision</h5>
              <p className="card-text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Recusandae saepe delectus, et suscipit dignissimos nemo odio aut
                rerum sunt asperiores cupiditate perferendis dolores eos unde,
                incidunt temporibus aspernatur consectetur quasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
