import React from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <div
        className="row d-flex align-items-center imgPage "
        style={{ height: "100vh" }}
      >
        <div className="col-0 col-sm-1 col-md-2"></div>
        <div className="col-12 col-sm-10 col-md-8">
          <form className="w3-card-4 w3-container mx-2 mx-sm-0 w3-round-xlarge formback">
            <header className="w3-center mt-4 pb-3 w3-border-bottom">
              <h2 className=" w3-cursive h1 w3-text-indigo">
                Register Account
              </h2>
            </header>
            <div className="">
              <div className="row my-4">
                <div className="col-12 col-md-6">
                  <label className=" w3-cursive h5">First Name</label>
                  <input
                    type="text"
                    className="w3-input w3-border w3-round-large mb-4 mb-sm-2"
                    placeholder="First Name..."
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className=" w3-cursive h5">Last Name</label>
                  <input
                    type="text"
                    className="w3-input w3-border  w3-round-large"
                    placeholder="Last Name..."
                    required
                  />
                </div>
              </div>
              <div className="row my-4">
                <div className="col-12 col-md-6">
                  <label className=" w3-cursive h5">Cell Phone</label>
                  <input
                    type="number"
                    className="w3-input w3-border w3-round-large mb-4  mb-sm-2"
                    placeholder="Cell Phone..."
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className=" w3-cursive h5">Birth Date</label>
                  <input
                    type="date"
                    className="w3-input w3-border  w3-round-large"
                    required
                  />
                </div>
              </div>
              <div className="row my-4">
                <div className="col-12 col-md-6">
                  <label className=" w3-cursive h5">Email Address</label>
                  <input
                    type="email"
                    className="w3-input w3-border w3-round-large mb-4 mb-sm-2 "
                    placeholder="Email Address..."
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className=" w3-cursive h5">Password</label>
                  <input
                    type="password"
                    className="w3-input w3-border  w3-round-large"
                    placeholder="Password..."
                    required
                  />
                </div>
              </div>
            </div>
            <footer className="w3-border-top py-4 w3-right-align">
              <button
                type="submit"
                className="w3-btn w3-indigo w3-cursive h4 w3-block w3-round-large "
              >
                Create Account
              </button>
            </footer>

            <div className="pb-4 d-flex flex-column w3-center">
              <Link
                className="h5 w3-cursive mb-4 hoverlink"
                style={{ textDecoration: "none" }}
                to="/login"
              >
                Back to Login
              </Link>
              <Link
                className="h5 w3-cursive hoverlink"
                style={{ textDecoration: "none" }}
                to="/forgotPassword"
              >
                Forgot Password
              </Link>
            </div>
          </form>
        </div>
        <div className="col-0 col-sm-1 col-md-2"></div>
      </div>
    </>
  );
};
