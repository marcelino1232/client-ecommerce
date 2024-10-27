import React from "react";
import { useNavigate } from "react-router-dom";
import { getRole, getToken } from "../helpers/GetToken";

export const Error401 = () => {
  const navigate = useNavigate();

  const auth = getToken();

  const goBack = () => {
    if (auth == null) {
      navigate("/");
    } else {
      if (getRole() == "Admin") {
        navigate("/v1");
      } else {
        navigate("/");
      }
    }
  };
  return (
    <div
      className=" d-flex flex-column align-items-center justify-content-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <i class="fa-solid fa-lock fa-7x "></i>
      <h1 className="mt-3">401 - Access denied</h1>

      <p className="h5 py-2">You are not authorized to access this page.</p>
      <button
        className="w3-btn w3-indigo text-uppercase h5 py-3 "
        onClick={goBack}
      >
        Back To Home Page
      </button>
    </div>
  );
};
