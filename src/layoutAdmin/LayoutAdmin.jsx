import React from "react";
import { useAuth } from "../components/auth/security/AuthProvider";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const LayoutAdmin = () => {
  
  const { logOut } = useAuth();

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
    <>
      <Header signOut={SignOut} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
