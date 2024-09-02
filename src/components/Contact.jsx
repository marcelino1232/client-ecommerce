import React from "react";
import { Link } from "react-router-dom";

export const Contact = () => {
  return (
    <>
      <div className=" container-fluid">
        <nav aria-label="breadcrumb" className="mt-3 w3-card">
          <ol class="breadcrumb py-2 ps-2">
            <li class="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Contact
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-sm-12 col-md-6">
            <form
              className=" w3-container w3-card-4  w3-text-teal mt-3"
              style={{ width: "100%" }}
            >
              <h2 className=" w3-center"> Contact Us</h2>

              {/*  Name  Input */}

              <div className="w3-row w3-section">
                <div className="w3-col" style={{ width: "50px" }}>
                  <i class="w3-xxlarge fa fa-user"></i>
                </div>
                <div className="w3-rest">
                  <input
                    className="w3-input w3-border"
                    type="text"
                    placeholder="Name..."
                  />
                </div>
              </div>

              {/* Email Input */}

              <div className="w3-row w3-section">
                <div className="w3-col" style={{ width: "50px" }}>
                  <i class="w3-xxlarge fa fa-envelope"></i>
                </div>
                <div className="w3-rest">
                  <input
                    className="w3-input w3-border"
                    type="email"
                    placeholder="Email..."
                  />
                </div>
              </div>

              {/* Phone Input */}

              <div className="w3-row w3-section">
                <div className="w3-col" style={{ width: "50px" }}>
                  <i class="w3-xxlarge fa fa-phone"></i>
                </div>
                <div className="w3-rest">
                  <input
                    className="w3-input w3-border"
                    type="text"
                    placeholder="Phone..."
                  />
                </div>
              </div>

              {/* Message Input */}

              <div className="w3-row w3-section">
                <div className="w3-col" style={{ width: "50px" }}>
                  <i class="w3-xxlarge fa fa-pencil"></i>
                </div>
                <div className="w3-rest">
                  <textarea
                    className="w3-input w3-border"
                    type="text"
                    placeholder="Message..."
                  ></textarea>
                </div>
              </div>

              {/* Send button  */}

              <button class="w3-button w3-block w3-section w3-teal w3-ripple w3-padding w3-hover-green">
                Send
              </button>
            </form>
          </div>
          <div className="col-sm-12 col-md-6">
            <ul class="w3-ul w3-card-4 my-3" style={{ width: "100%" }}>
              <li>
                <h2 className="text-center w3-text-teal">Information</h2>
              </li>
              <li className="py-3">
                <i class="fa-solid fa-location-dot"></i> 2425 Nostrand Ave
              </li>
              <li className="py-3">
                <i class="fa fa-phone"></i> (862) 888-2034
              </li>
              <li className="py-3">
                <i class="fa fa-envelope"></i>{" "}
                marcelinoherediafernandez.02@gmail.com
              </li>
              <li className="py-3">
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href="https://www.facebook.com/marcelino.herediafernandez/"
                >
                  <i class="fa-brands fa-facebook"></i> Marcelino Heredia
                  Fernandez
                </a>
              </li>
              <li className="py-3">
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href="https://www.instagram.com/marcelinoherediafernandez/"
                >
                  <i class="fa-brands fa-square-instagram"></i> Marcelino
                  Heredia Fernandez
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
