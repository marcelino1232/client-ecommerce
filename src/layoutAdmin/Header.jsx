import React from "react";
import { LoginName } from "../helpers/GetToken";
import { Link } from "react-router-dom";

export const Header = ({ signOut }) => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark w3-indigo">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/v1">
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
                <Link className="nav-link active menu" to="/v1">
                  <i className="fa-solid fa-laptop"></i> Product
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link w3-display-container menu"
                  aria-current="page"
                  to="/v1/purchase"
                >
                  <i class="fa-solid fa-bag-shopping"></i> Purchase
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu" to="/v1/user">
                  <i class="fa-solid fa-users"></i> User
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu" to="/v1/support">
                  <i class="fa-solid fa-gear"></i> Support
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown ">
                <Link
                  className="nav-link dropdown-toggle text-uppercase"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {LoginName()}
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-sm-end "
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="/v1/profile">
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
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button onClick={signOut} className="dropdown-item">
                      <i class="fa-solid fa-right-from-bracket me-2"></i>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
