import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../layout/Loading";
import {
  becomeDefault,
  createAddress,
  getAddressById,
  userAddressPagination,
  removeAddress,
  updateAddress,
} from "../../services/userAddressService";
import { convertIntToArrayInit } from "../../helpers/GetArray";

export const OrderAddress = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const [loadingcrud, setLoadingCrud] = useState(false);

  const [input, setInput] = useState({});

  const [updateinput, setUpdateInput] = useState({});

  const [pageNumer, setPageNumer] = useState(null);

  const [params, setParams] = useState({
    Search: "",
    PageIndex: 1,
    PageSize: 3,
  });

  useEffect(() => {
    onloading();
  }, [params.PageIndex]);

  const onloading = async () => {
    setLoading(true);

    var request = await userAddressPagination(params);

    setResponse(request.response);
    setPageNumer(convertIntToArrayInit(request.response.pageCount));

    setLoading(false);
  };

  // start  create Address //

  const submintHandler = async (e) => {
    setLoadingCrud(true);
    e.preventDefault();
    await createAddress(input);
    CloseCreateModel();
    setLoadingCrud(false);
    await onloading();
    setInput({});
  };

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const OpenCreateModel = () => {
    document.getElementById("id01").style.display = "block";
  };

  const CloseCreateModel = () => {
    document.getElementById("id01").style.display = "none";
  };

  // end create address //

  // start update address //

  const submintUpdateHandler = async (e) => {
    e.preventDefault();
    setLoadingCrud(true);
    await updateAddress(updateinput);
    CloseUpdateModel();
    setLoadingCrud(false);
    await onloading();
    setUpdateInput({});
  };

  const inputUpdateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUpdateInput({
      ...updateinput,
      [name]: value,
    });
  };

  const OpenUpdateModel = async (e, userAddressId) => {
    e.preventDefault();

    var request = await getAddressById(userAddressId);

    setUpdateInput(request.response);

    document.getElementById("idUpdate").style.display = "block";
  };

  const CloseUpdateModel = () => {
    document.getElementById("idUpdate").style.display = "none";
  };

  // end update address //

  // start remove address //

  const removeHandler = async (userAddressId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this address!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeAddress(userAddressId);
        await onloading();
      }
    });
  };

  // end remove address //

  // start  become default address //

  const selectRow = async (e, userAddressId) => {
    e.preventDefault();
    await becomeDefault(userAddressId);
    await onloading();
  };

  // end become default address //

  const GoDown = async () => {
    if (response.pageIndex > 1) {
      setParams({
        ...params,
        PageIndex: params.PageIndex - 1,
      });
    }
  };

  const changeIndex = (page) => {
    setParams({
      ...params,
      PageIndex: page,
    });
  };

  const GoUp = async () => {
    if (response.pageIndex < response.pageCount) {
      setParams({
        ...params,
        PageIndex: params.PageIndex + 1,
      });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className=" container-fluid">
          <nav aria-label="breadcrumb" className="mt-3 w3-card ">
            <ol class="breadcrumb py-2 ps-2">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                <Link to="/shoppingCart">Cart</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Address
              </li>
            </ol>
          </nav>

          <div className="w3-light-grey w3-round-xxlarge my-4">
            <div
              className="w3-container w3-round w3-indigo"
              style={{ width: "50%" }}
            >
              50%
            </div>
          </div>

          <div className="w3-card w3-round ">
            <header className=" h4 w3-cursive py-3  container-fluid w3-border-bottom d-flex justify-content-between align-items-center">
              <p className=" mb-0"> List Of Address</p>

              <div>
                <button
                  onClick={OpenCreateModel}
                  className="w3-btn  w3-padding-small w3-indigo ms-2"
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </header>
          </div>
          <div className=" w3-cursive d-flex justify-content-between my-4">
            <Link className="w3-btn w3-indigo w3-round" to="/shoppingCart">
              Back
            </Link>

            {response != null && response.data.length > 0 && (
              <Link className="w3-btn w3-indigo w3-round" to="/orderPayment">
                Next
              </Link>
            )}
          </div>
          <div>
            {response != null && response.data.length > 0 ? (
              response.data?.map((address, indice) =>
                address.isDefault == true ? (
                  <div
                    id="select"
                    key={indice}
                    className=" w3-cursive h5 w3-card w3-display-container w3-container py-2 selectaddress w3-indigo"
                    data-id={address.userAddressId}
                  >
                    <div className="row">
                      <div className="d-flex flex-column col-12 col-sm-9 col-md-10">
                        <label className="my-2">
                          {" "}
                          Address : {address.street}
                        </label>
                        <label className="mb-2">
                          {" "}
                          Aparment : {address.houseNumber}
                        </label>
                        <label className="mb-2"> City : {address.city}</label>
                        <label className="mb-2">
                          {" "}
                          State : {address.region}
                        </label>
                        <label className="mb-2">
                          {" "}
                          Country : {address.country}
                        </label>
                      </div>
                      <div className="col-12 col-sm-3 col-md-2 d-flex  justify-content-end align-items-start">
                        <button
                          id="btnUpdate"
                          type="button"
                          className="w3-btn w3-blue"
                          onClick={(e) =>
                            OpenUpdateModel(e, address.userAddressId)
                          }
                          data-id={address.userAddressId}
                        >
                          <i class="fa-solid fa-pen-nib"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={indice}
                    className="d-flex flex-column w3-cursive h5 w3-card w3-display-container w3-container py-2 selectaddress"
                    data-id={address.userAddressId}
                  >
                    <div className="row">
                      <div
                        className="d-flex flex-column col-12 col-sm-9 col-md-10 editp"
                        onClick={(e) => selectRow(e, address.userAddressId)}
                      >
                        <label className="my-2 editp">
                          {" "}
                          Address : {address.street}
                        </label>
                        <label className="mb-2 editp">
                          {" "}
                          Aparment : {address.houseNumber}
                        </label>
                        <label className="mb-2 editp">
                          {" "}
                          City : {address.city}
                        </label>
                        <label className="mb-2 editp">
                          {" "}
                          State : {address.region}
                        </label>
                        <label className="mb-2 editp">
                          {" "}
                          Country : {address.country}
                        </label>
                      </div>
                      <div className="col-12 col-sm-3 col-md-2 d-flex  justify-content-end align-items-start">
                        <button
                          id="btnUpdate"
                          type="button"
                          className="w3-btn w3-blue me-2"
                          onClick={(e) =>
                            OpenUpdateModel(e, address.userAddressId)
                          }
                          data-id={address.userAddressId}
                        >
                          <i class="fa-solid fa-pen-nib"></i>
                        </button>
                        <button
                          type="button"
                          className="w3-btn w3-red"
                          onClick={(e) => removeHandler(address.userAddressId)}
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="w3-cursive h4 w3-card w3-container py-4 text-center ">
                There are no addresses registered yet
              </div>
            )}
          </div>
          {response != null && response.data.length > 0 && (
            <div className=" w3-center my-5">
              <div className="w3-bar" id="pag">
                <li
                  onClick={GoDown}
                  className={
                    response.pageIndex > 1
                      ? "w3-button "
                      : "w3-button w3-disabled"
                  }
                >
                  &laquo;
                </li>
                {pageNumer != null &&
                  pageNumer.map((page) =>
                    page == response.pageIndex - 1 ? (
                      <li
                        key={page}
                        data-id={page}
                        onClick={(e) =>
                          setParams({
                            ...params,
                            PageIndex: page + 1,
                          })
                        }
                        className="w3-button w3-indigo pagProduct "
                      >
                        {page + 1}
                      </li>
                    ) : (
                      <li
                        key={page}
                        data-id={page}
                        onClick={(e) => changeIndex(page + 1)}
                        className="w3-button pagProduct"
                      >
                        {page + 1}
                      </li>
                    )
                  )}
                {response.pageIndex < response.pageCount ? (
                  <li onClick={GoUp} className={"w3-button"}>
                    &raquo;
                  </li>
                ) : (
                  <li onClick={GoUp} className={"w3-button w3-disabled"}>
                    &raquo;
                  </li>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={(e) => submintHandler(e)} id="id01" className="w3-modal">
        <div className="w3-modal-content w3-animate-zoom">
          <header className="w3-container text-center py-3 w3-border-bottom ">
            <h2 className=" w3-cursive">Create New Address</h2>
          </header>
          <div className=" container-fluid">
            <div className=" input-group-lg mt-3">
              <input
                type="text"
                name="street"
                value={input.street == undefined ? "" : input.street}
                onChange={(e) => inputHandler(e)}
                className="form-control"
                placeholder="Street..."
              />
            </div>
            <div className="input-group-lg mt-3">
              <input
                type="text"
                name="houseNumber"
                value={input.houseNumber == undefined ? "" : input.houseNumber}
                onChange={(e) => inputHandler(e)}
                className="form-control"
                placeholder="Apartment Number..."
              />
            </div>
            <div className=" input-group-lg mt-3">
              <input
                type="text"
                name="city"
                value={input.city == undefined ? "" : input.city}
                onChange={(e) => inputHandler(e)}
                className="form-control"
                placeholder="City..."
              />
            </div>
            <div className=" input-group-lg mt-3">
              <input
                type="text"
                name="region"
                value={input.region == undefined ? "" : input.region}
                onChange={(e) => inputHandler(e)}
                className="form-control"
                placeholder="State..."
              />
            </div>
            <div className=" input-group-lg mt-3">
              <input
                type="text"
                name="country"
                value={input.country == undefined ? "" : input.country}
                onChange={(e) => inputHandler(e)}
                className="form-control"
                placeholder="Country..."
              />
            </div>
            <div className=" input-group-lg my-3">
              <input
                type="number"
                name="postalCode"
                value={input.postalCode == undefined ? "" : input.postalCode}
                onChange={(e) => inputHandler(e)}
                className="form-control"
                placeholder="Zip Code..."
              />
            </div>
          </div>
          <footer className="w3-container d-flex justify-content-end py-3 w3-border-top w3-cursive h5">
            <button
              type="button"
              className="w3-btn w3-red me-2 "
              onClick={CloseCreateModel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={
                loadingcrud ? "w3-btn w3-disabled w3-teal" : "w3-btn  w3-teal"
              }
            >
              Accept
            </button>
          </footer>
        </div>
      </form>

      <form
        onSubmit={(e) => submintUpdateHandler(e)}
        id="idUpdate"
        className="w3-modal"
      >
        <div className="w3-modal-content w3-animate-zoom">
          <header className="w3-container text-center py-3 w3-border-bottom ">
            <h2 className=" w3-cursive">Update Address</h2>
          </header>
          <div className=" container-fluid">
            <div className=" input-group-lg mt-3">
              <input
                type="text"
                name="street"
                value={
                  updateinput.street == undefined ? "" : updateinput.street
                }
                onChange={(e) => inputUpdateHandler(e)}
                className="form-control"
                placeholder="Street..."
              />
            </div>
            <div className="input-group-lg mt-3">
              <input
                type="text"
                name="houseNumber"
                value={
                  updateinput.houseNumber == undefined
                    ? ""
                    : updateinput.houseNumber
                }
                onChange={(e) => inputUpdateHandler(e)}
                className="form-control"
                placeholder="Apartment Number..."
              />
            </div>
            <div className=" input-group-lg mt-3">
              <input
                type="text"
                name="city"
                value={updateinput.city == undefined ? "" : updateinput.city}
                onChange={(e) => inputUpdateHandler(e)}
                className="form-control"
                placeholder="City..."
              />
            </div>
            <div className=" input-group-lg mt-3">
              <input
                type="text"
                name="region"
                value={
                  updateinput.region == undefined ? "" : updateinput.region
                }
                onChange={(e) => inputUpdateHandler(e)}
                className="form-control"
                placeholder="State..."
              />
            </div>
            <div className=" input-group-lg mt-3">
              <input
                type="text"
                name="country"
                value={
                  updateinput.country == undefined ? "" : updateinput.country
                }
                onChange={(e) => inputUpdateHandler(e)}
                className="form-control"
                placeholder="Country..."
              />
            </div>
            <div className=" input-group-lg my-3">
              <input
                type="number"
                name="postalCode"
                value={
                  updateinput.postalCode == undefined
                    ? ""
                    : updateinput.postalCode
                }
                onChange={(e) => inputUpdateHandler(e)}
                className="form-control"
                placeholder="Zip Code..."
              />
            </div>
          </div>
          <footer className="w3-container d-flex justify-content-end py-3 w3-border-top w3-cursive h5">
            <button
              type="button"
              className="w3-btn w3-red me-2 "
              onClick={CloseUpdateModel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={
                loadingcrud ? "w3-btn w3-disabled w3-teal" : "w3-btn  w3-teal"
              }
            >
              Accept
            </button>
          </footer>
        </div>
      </form>
    </>
  );
};
