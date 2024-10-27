import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  profileById,
  updatePassword,
  updateProfile,
} from "../../../services/profileService";
import { useAuth } from "../security/AuthProvider";
import { Loading } from "../../../layout/Loading";

export const Profile = () => {
  const { profileUpdate } = useAuth();

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState({
    id: "",
    firstName: "",
    lastName: "",
    cellPhone: "",
    emailAddress: "",
  });

  const [change, setChange] = useState({
    id: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    onloading();
  }, []);

  const onloading = async () => {
    setLoading(true);
    const request = await profileById();

    if (request.response != null) {
      setResponse(request.response);
      setChange({ ...change, id: request.response.id });
    }

    setLoading(false);
  };

  const updateData = async (e) => {
    e.preventDefault();
    const request = await profileUpdate(response);
    if (request.success) {
      await onloading();
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    const request = await updatePassword(change);

    if (request.status == 400) {
      setError(request.errors);
      console.log(request.errors);
    } else {
      if (request.success) {
        setError(null);
        setChange({ ...change, newPassword: "", confirmPassword: "" });
        await onloading();
      }
    }
  };

  return (
    <div className=" container-fluid">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="w3-card my-4">
            <div className="w3-container w3-border-bottom">
              <h2 className="w3-cursive py-3 text-center ">
                Profile Information
              </h2>
            </div>
            <div className="w3-container">
              <div className="row my-4">
                <div className="col-12 col-md-6">
                  <div className=" input-group-lg">
                    <label className=" w3-cursive h5">First Name</label>
                    <input
                      type="text"
                      placeholder="FisrtName.."
                      className="form-control"
                      value={response.firstName}
                      onChange={(e) =>
                        setResponse({ ...response, firstName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className=" input-group-lg">
                    <label className=" w3-cursive h5">Last Name</label>
                    <input
                      type="text"
                      placeholder="LastName.."
                      className="form-control"
                      value={response.lastName}
                      onChange={(e) =>
                        setResponse({ ...response, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-12 col-md-6">
                  <div className=" input-group-lg">
                    <label className=" w3-cursive h5">Cell Phone</label>
                    <input
                      type="text"
                      placeholder="CellPhone.."
                      className="form-control"
                      value={response.cellPhone}
                      onChange={(e) =>
                        setResponse({ ...response, cellPhone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className=" input-group-lg">
                    <label className=" w3-cursive h5">EmailAddress</label>
                    <input
                      type="text"
                      placeholder="EmailAddress.."
                      className="form-control"
                      value={response.emailAddress}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-4 w3-border-top pt-4">
                <div className="col-12 d-flex justify-content-end">
                  <button
                    className="w3-btn w3-teal w3-cursive h5"
                    onClick={(e) => updateData(e)}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w3-card mt-4 mb-4">
            <div className="w3-container w3-border-bottom">
              <h2 className="w3-cursive py-3 text-center ">Change Password</h2>
            </div>
            <div className="w3-container">
              <div className="row">
                <div className="col-12 col-md-6 my-4">
                  <div className=" input-group-lg">
                    <label className=" w3-cursive h5">New Password</label>
                    <input
                      type="password"
                      placeholder="New Password.."
                      className="form-control"
                      required
                      value={change.newPassword}
                      onChange={(e) =>
                        setChange({ ...change, newPassword: e.target.value })
                      }
                    />
                    {error != null && error.NewPassword?.length > 0 && (
                      <span className="text-danger">
                        {error.NewPassword[0]}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 my-4">
                  <div className=" input-group-lg">
                    <label className=" w3-cursive h5">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm Password.."
                      className="form-control"
                      required
                      value={change.confirmPassword}
                      onChange={(e) =>
                        setChange({
                          ...change,
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
                </div>
              </div>

              <div className="row mb-4 w3-border-top pt-4">
                <div className="col-12 d-flex justify-content-end">
                  <button
                    className="w3-btn w3-teal w3-cursive h5"
                    onClick={(e) => changePassword(e)}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
