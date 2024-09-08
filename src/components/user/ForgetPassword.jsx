import React from "react";
import { Link } from "react-router-dom";

export const ForgetPassword = () => {
  return (
    <>
      <div
        className="row d-flex align-items-center imgPage"
        style={{ height: "100vh" }}
      >
        <div className="col-0 col-sm-2 col-md-3"></div>
        <div className="col-12 col-sm-8 col-md-6">
          <form className="w3-card-4 w3-container mx-2 mx-sm-0 w3-round-xlarge formback">
            <header className="w3-center mt-4 pb-3 w3-border-bottom">
              <h2 className=" w3-cursive h1 w3-text-indigo">
                Recovery Password
              </h2>
            </header>
            <div className="">
            <label className=" w3-cursive h5 mt-4">Email Address</label>
              <input
                type="email"
                className="w3-input w3-border mb-4 w3-round-large"
                placeholder="Email Address..."
                required
              />
            </div>
            <footer className="w3-border-top py-4 w3-right-align">
              <button
                type="submit"
                className="w3-btn w3-indigo w3-cursive h4 w3-block w3-round-large "
              >
                Send Recovery
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
                to="/register"
              >
                Create Account
              </Link>
            </div>
          </form>
        </div>
        <div className="col-0 col-sm-2 col-md-3"></div>
      </div>
    </>
  );
};
