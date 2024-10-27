import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartCount } from "./Layout";
import { shoppingCarts } from "../services/shoppingCartService";
import { useAuth } from "../components/auth/security/AuthProvider";
import { getRole } from "../helpers/GetToken";
import { Role } from "../helpers/Role";

export const Header = ({ identity, signOut }) => {
  const { count, setCount } = useContext(ShoppingCartCount);

  const { avatar } = useAuth();

  useEffect(() => {
    onloading();
  }, []);

  const onloading = async () => {
    const request = await shoppingCarts();

    if (request == null || request.response == null) {
      setCount(0);
    } else {
      setCount(request.response.count);
    }
  };

  function ActiveClick(e) {
    var a = document.querySelectorAll(".menu");
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove("active");
    }
    e.target.classList.add("active");
  }

  function ActiveIndex() {
    var a = document.querySelectorAll(".menu");
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove("active");
    }
    a.classList.add("active");
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark w3-indigo">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={ActiveIndex}>
            Marcelino Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active menu"
                  to="/"
                  onClick={(e) => ActiveClick(e)}
                >
                  <i className="fa-solid fa-laptop"></i> Product
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link w3-display-container menu"
                  aria-current="page"
                  to="/about"
                  onClick={(e) => ActiveClick(e)}
                >
                  <i class="fa-solid fa-address-card"></i> About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu"
                  onClick={(e) => ActiveClick(e)}
                  to="/contact"
                >
                  <i class="fa-solid fa-envelope"></i> Contact
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link menu"
                  aria-current="page"
                  to="/shoppingCart"
                  onClick={(e) => ActiveClick(e)}
                >
                  <i className="fa-solid fa-cart-shopping"></i> Cart{" "}
                  <span className=" w3-badge w3-teal">
                    {count != null ? count : 0}
                  </span>
                </Link>
              </li>
              {identity == null ? (
                <li className="nav-item">
                  <Link
                    className="nav-link menu"
                    to="/login"
                    onClick={(e) => ActiveClick(e)}
                  >
                    <i className="fa-solid fa-user"></i> Sign In
                  </Link>
                </li>
              ) : (
                <li className="nav-item dropdown ">
                  <Link
                    className="nav-link dropdown-toggle text-uppercase"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {avatar}
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-sm-end "
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    {getRole() == Role.Client && (
                      <>
                        {" "}
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            <i class="fa-solid fa-user me-2"></i>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="wishes">
                            <i class="fa-solid fa-heart me-2"></i>
                            Wishes
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="review">
                            <i class="fa-solid fa-rectangle-list me-2"></i>
                            Review
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="payment">
                            <i class="fa-solid fa-money-bill me-2"></i>
                            Paymant
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="purchase">
                            <i class="fa-solid fa-bag-shopping   me-2"></i>
                            Purchase
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="support">
                            <i class="fa-solid fa-gear me-2"></i>
                            Support
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                      </>
                    )}

                    <li>
                      <button onClick={signOut} className="dropdown-item">
                        <i class="fa-solid fa-right-from-bracket  me-2"></i>
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
