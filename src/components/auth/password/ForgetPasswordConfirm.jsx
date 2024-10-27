import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { forgetPasswordConfirm } from "../../../services/userService";
import { Loading } from "../../../layout/Loading";

export const ForgetPasswordConfirm = () => {
  const { email, token } = useParams();
  const navigate = useNavigate();

  const [forgetPassword, setForgetPassword] = useState({
    emailAddress: email,
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    var request = await forgetPasswordConfirm(token, forgetPassword);

    if (request.status == 400) {
      setError(request.errors);
    } else {
      setError(null);
      if (request.success) {
        Swal.fire({
          title: "Good job!",
          text: "Password was change successfully!",
          icon: "success",
        });

        setForgetPassword({
          ...forgetPassword,
          newPassword: "",
          confirmPassword: "",
        });

        navigate("/login");
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
          className="row d-flex align-items-center imgPage"
          style={{ height: "100vh" }}
        >
          <div className="col-0 col-sm-2 col-md-3"></div>
          <div className="col-12 col-sm-8 col-md-6">
            <form className="w3-card-4 w3-container mx-2 mx-sm-0 w3-round-xlarge formback">
              <header className="w3-center mt-4 pb-3 w3-border-bottom">
                <h2 className=" w3-cursive h1 w3-text-indigo">
                  Change Password
                </h2>
              </header>
              <div className="">
                <label className=" w3-cursive h5 mt-4">New Password</label>
                <input
                  type="password"
                  className="w3-input w3-border mb-4 w3-round-large"
                  required
                  placeholder="New Password..."
                  value={forgetPassword.newPassword}
                  onChange={(e) =>
                    setForgetPassword({
                      ...forgetPassword,
                      newPassword: e.target.value,
                    })
                  }
                />
                {error != null && error.NewPassword?.length > 0 && (
                  <span className="text-danger">{error.NewPassword[0]}</span>
                )}
              </div>
              <div className="">
                <label className=" w3-cursive h5">Confirm Password</label>
                <input
                  type="password"
                  className="w3-input w3-border mb-4 w3-round-large"
                  placeholder="Confirm Password..."
                  required
                  value={forgetPassword.confirmPassword}
                  onChange={(e) =>
                    setForgetPassword({
                      ...forgetPassword,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                {error != null && error.ConfirmPassword?.length > 0 && (
                  <span className="text-danger">
                    {error.ConfirmPassword[0]}
                  </span>
                )}
              </div>
              <footer className="w3-border-top py-4 w3-right-align">
                <button
                  type="submit"
                  className="w3-btn w3-indigo w3-cursive h4 w3-block w3-round-large "
                  onClick={(e) => changePassword(e)}
                >
                  Update Password
                </button>
              </footer>

              <div className="pb-4 d-flex flex-column w3-center">
                <Link
                  className="h5 w3-cursive mb-4 hoverlink"
                  style={{ textDecoration: "none" }}
                  to="/login"
                >
                  Go to Login
                </Link>
              </div>
            </form>
          </div>
          <div className="col-0 col-sm-2 col-md-3"></div>
        </div>
      )}
    </>
  );
};
