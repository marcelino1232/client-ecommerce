import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Header = () => {
  const { shoppingCart } = useSelector((state) => state.shoppingCart);

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
      <nav className="navbar navbar-expand-sm navbar-dark w3-indigo">
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
                  <i className="fa-solid fa-store "></i> About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu"
                  onClick={(e) => ActiveClick(e)}
                  to="/contact"
                >
                  <i className="fa-solid fa-address-card"></i> Contact
                </Link>
              </li>
              {/*   <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown link
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><Link className="dropdown-item" href="#">Action</Link></li>
                    <li><Link className="dropdown-item" href="#">Another action</Link></li>
                    <li><Link className="dropdown-item" href="#">Something else here</Link></li>
                </ul>
                </li> */}
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
                    {shoppingCart.count}
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu"
                  to="/login"
                  onClick={(e) => ActiveClick(e)}
                >
                  <i className="fa-solid fa-user"></i> Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
