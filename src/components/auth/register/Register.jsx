import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../../layout/Loading";
import { register } from "../../../services/userService";

export const Register = () => {
  const navegate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const [error, setError] = useState(null);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    cellPhone: "",
    birthDate: "",
    emailAddress: "",
    password: "",
  });

  const registerHandler = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    const request = await register(data);

    if (request?.status == 400) {
      setError(request.errors);
    } else {
      if (request.success) {
        setLoading(false);
        navegate(`/registerSend/${data.emailAddress}`);
        setResponse(request);
      }
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="row d-flex align-items-center imgPage "
          style={{ height: "100vh" }}
        >
          <div className="col-0 col-sm-1 col-md-2"></div>
          <div className="col-12 col-sm-10 col-md-8">
            {response != null && !response.success && (
              <div className="w3-cursive w3-panel text-center w3-red py-3 h5 mx-2 mx-sm-0">
                {response.message}
              </div>
            )}
            <form
              onSubmit={registerHandler}
              className="w3-card-4 w3-container mx-2 mx-sm-0 w3-round-xlarge formback"
            >
              <header className="w3-center mt-4 pb-3 w3-border-bottom">
                <h2 className=" w3-cursive h1 w3-text-indigo">
                  Register Account
                </h2>
              </header>
              <div className="">
                <div className="row my-4">
                  <div className="col-12 col-md-6">
                    <label className=" w3-cursive h5">First Name</label>
                    <input
                      type="text"
                      className="w3-input w3-border w3-round-large mb-4 mb-sm-2"
                      placeholder="First Name..."
                      onChange={(e) =>
                        setData({
                          ...data,
                          firstName: e.target.value,
                        })
                      }
                      required
                    />
                    {error != null && error.FirstName?.length > 0 && (
                      <span className="text-danger">{error.FirstName[0]}</span>
                    )}
                  </div>
                  <div className="col-12 col-md-6">
                    <label className=" w3-cursive h5">Last Name</label>
                    <input
                      type="text"
                      className="w3-input w3-border  w3-round-large"
                      placeholder="Last Name..."
                      onChange={(e) =>
                        setData({
                          ...data,
                          lastName: e.target.value,
                        })
                      }
                      required
                    />
                    {error != null && error.LastName?.length > 0 && (
                      <span className="text-danger">{error.LastName[0]}</span>
                    )}
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-12 col-md-6">
                    <label className=" w3-cursive h5">Cell Phone</label>
                    <input
                      type="number"
                      className="w3-input w3-border w3-round-large mb-4  mb-sm-2"
                      placeholder="Cell Phone..."
                      onChange={(e) =>
                        setData({
                          ...data,
                          cellPhone: e.target.value,
                        })
                      }
                      required
                    />
                    {error != null && error.CellPhone?.length > 0 && (
                      <span className="text-danger">{error.CellPhone[0]}</span>
                    )}
                  </div>
                  <div className="col-12 col-md-6">
                    <label className=" w3-cursive h5">Birth Date</label>
                    <input
                      type="date"
                      className="w3-input w3-border  w3-round-large"
                      onChange={(e) =>
                        setData({
                          ...data,
                          birthDate: e.target.value,
                        })
                      }
                      required
                    />
                    {error != null && error.BirthDate?.length > 0 && (
                      <span className="text-danger">{error.BirthDate[0]}</span>
                    )}
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-12 col-md-6">
                    <label className=" w3-cursive h5">Email Address</label>
                    <input
                      type="email"
                      className="w3-input w3-border w3-round-large mb-4 mb-sm-2 "
                      placeholder="Email Address..."
                      onChange={(e) =>
                        setData({
                          ...data,
                          emailAddress: e.target.value,
                        })
                      }
                      required
                    />
                    {error != null && error.EmailAddress?.length > 0 && (
                      <span className="text-danger">
                        {error.EmailAddress[0]}
                      </span>
                    )}
                  </div>
                  <div className="col-12 col-md-6">
                    <label className=" w3-cursive h5">Password</label>
                    <input
                      type="password"
                      className="w3-input w3-border  w3-round-large"
                      placeholder="Password..."
                      onChange={(e) =>
                        setData({
                          ...data,
                          password: e.target.value,
                        })
                      }
                      min={8}
                      max={16}
                      required
                    />
                    {error != null && error.Password?.length > 0 && (
                      <span className="text-danger">{error.password[0]}</span>
                    )}
                  </div>
                </div>
              </div>
              <footer className="w3-border-top py-4 w3-right-align">
                <button
                  type="submit"
                  className="w3-btn w3-indigo w3-cursive h4 w3-block w3-round-large "
                >
                  Create Account
                </button>
              </footer>

              <div className="pb-4 d-flex flex-column w3-center">
                <Link
                  className="h5 w3-cursive mb-4 hoverlink"
                  style={{ textDecoration: "none" }}
                  to="/login"
                >
                  Back to Login
                </Link>
                <Link
                  className="h5 w3-cursive hoverlink"
                  style={{ textDecoration: "none" }}
                  to="/forgotPassword"
                >
                  Forgot Password
                </Link>
              </div>
            </form>
          </div>
          <div className="col-0 col-sm-1 col-md-2"></div>
        </div>
      )}
    </>
  );
};
