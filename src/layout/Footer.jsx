import React from "react";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <>
      <div className=" mt-5">
        {/* Footer */}
        <footer className="text-center text-white w3-indigo">
          {/* Grid container */}
          <div className="">
            {/* Section: Links */}
            <section className="mt-5">
              {/* Grid row*/}
              <div className="row text-center d-flex justify-content-center pt-5">
                {/* Grid column */}
                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <Link className="text-white" to="/">
                      Home
                    </Link>
                  </h6>
                </div>
                {/* Grid column */}

                {/* Grid column */}
                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <Link className="text-white" to="/about">
                      About
                    </Link>
                  </h6>
                </div>
                {/* Grid column */}

                {/* Grid column */}
                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <Link className="text-white" to="/contact">
                      Contact
                    </Link>
                  </h6>
                </div>
                {/* Grid column */}

                {/* Grid column */}
                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <Link className="text-white" to="/shoppingCart">
                      Cart
                    </Link>
                  </h6>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row*/}
            </section>
            {/* Section: Links */}

            <hr className="my-5" />

            {/* Section: Social */}
            <section className="text-center mb-5">
              <a
                href="https://www.facebook.com/marcelino.herediafernandez/"
                className="text-white me-4"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://x.com/MarcelinoHered8"
                className="text-white me-4"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-google"></i>
              </a>
              <a
                href="https://www.instagram.com/marcelinoherediafernandez/"
                className="text-white me-4"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </section>
            {/* Section: Social */}
          </div>
          {/* Grid container */}

          {/* Copyright */}
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2024 Copyright
          </div>
          {/* Copyright */}
        </footer>
        {/* Footer */}
      </div>
    </>
  );
};
