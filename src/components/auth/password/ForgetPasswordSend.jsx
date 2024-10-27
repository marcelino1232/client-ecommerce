import React from "react";
import { Link, useParams } from "react-router-dom";

export const ForgetPasswordSend = () => {
  const { email } = useParams();
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
                Forgot Password Verification!
              </h2>
            </header>
            <div className="w3-border-bottom py-3 mb-3">
              <p className=" w3-cursive h4">
                we sent a message to {email} open the emial an follow the
                instrucion
              </p>
            </div>

            <div className="pb-4 d-flex flex-column w3-center">
              <Link
                className="h5 w3-cursive mb-4 hoverlink"
                style={{ textDecoration: "none" }}
                to="/login"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
        <div className="col-0 col-sm-2 col-md-3"></div>
      </div>
    </>
  );
};
