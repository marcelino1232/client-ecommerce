import React, { createContext, useEffect, useState } from "react";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { getToken } from "../helpers/GetToken";
import { useAuth } from "../components/auth/security/AuthProvider";

export const ShoppingCartCount = createContext(0);

export const Layout = () => {
  
  const [count, setCount] = useState(0);

  const { logOut } = useAuth();

  let identity = getToken();

  const SignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
      }
    });
  };

  return (
    <ShoppingCartCount.Provider value={{ count, setCount }}>
      <Header signOut={SignOut} identity={identity} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </ShoppingCartCount.Provider>
  );
};
