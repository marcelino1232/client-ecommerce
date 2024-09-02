import React from "react";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <>
      <Header />
      <div className="pt-5 pb-5 ps-2 w3-teal text-center">
        <h2 className=" text-uppercase mb-3 pt-5 ">The Real Shop</h2>
        <p className="h6 pb-5">
          this is the best shop online where you can find the best product and
          price just check out!
        </p>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};
