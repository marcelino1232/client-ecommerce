import React, { useEffect } from "react";

export const Loading = () => {

  useEffect(() => {
    subirTop();
  }, []);
  
  const subirTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

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
