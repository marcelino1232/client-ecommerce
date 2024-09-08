import React from "react";

export const Loading = () => {
  return (
    <>
      <div className="w3-container text-center my-5">
        <p className="my-5">
          <i
            className="fa-solid fa-arrows-spin w3-spin"
            style={{ fontSize: "400px" }}
          ></i>
        </p>
      </div>
    </>
  );
};
