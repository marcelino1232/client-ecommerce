import React, { useEffect, useState } from "react";
import { adminUser, userLock } from "../../../services/userService";
import { convertIntToArrayInit } from "../../../helpers/GetArray";
import { Loading } from "../../../layout/Loading";
import { Link } from "react-router-dom";

export const ListOfUser = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [pageNumer, setPageNumer] = useState(null);

  const [params, setParams] = useState({
    Search: "",
    PageIndex: 1,
    PageSize: 4,
  });

  useEffect(() => {
    onloading();
  }, [params.PageIndex, params.Search]);

  const onloading = async () => {
    setLoading(true);
    const request = await adminUser(params);
    setResponse(request.response);
    setPageNumer(convertIntToArrayInit(request.response.pageCount));
    setLoading(false);
  };

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

  const search = (e) => {
    e.preventDefault();

    var search = document.getElementById("txtSearch");

    setParams({
      ...params,
      Search: search.value,
      PageIndex: 1,
    });
  };

  const LockUser = (e, userId) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to lock this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const request = await userLock(userId);
        if (request.success) {
          onloading();
        } else {
          Swal.fire({
            icon: "danger",
            title: "User was not lock!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className=" container-fluid">
          <div className="row my-4">
            <div className="col-0 col-sm-6 col-md-8 col-lg-9"></div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className=" input-group input-group-lg">
                <input
                  type="text"
                  id="txtSearch"
                  className=" form-control me-2"
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />
                <button
                  className="w3-btn w3-indigo"
                  type="button"
                  id="button-addon2"
                  onClick={(e) => search(e)}
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="row ">
            <header className="d-flex justify-content-between align-items-center col-12">
              <p className="h3 w3-cursive">List Of User</p>
              <button className="w3-btn w3-indigo">
                <i class="fa-solid fa-plus fa-lg"></i>
              </button>
            </header>

            <div className="my-4 ">
              <table className=" w3-table-all w3-large w3-card-4 w3-centered col-12">
                <thead>
                  <tr className="d-none d-md-table-row">
                    <th>EmailAddress</th>
                    <th>Name</th>
                    <th>CellPhone</th>
                    <th>Age</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Accions</th>
                  </tr>
                </thead>
                <tbody>
                  {response != null &&
                    response.data?.map((item, indice) => (
                      <tr
                        key={indice}
                        className="d-flex flex-column py-4 py-md-0 d-md-table-row"
                      >
                        <td className=" text-uppercase text-wrap">
                          {item.email}
                        </td>
                        <td className=" text-uppercase text-wrap">
                          {item.firstName + " " + item.lastName}
                        </td>
                        <td>{item.cellPhone}</td>
                        <td>{item.age}</td>
                        <td>{item.role}</td>
                        {item.isLock ? (
                          <td className="text-danger">Lock</td>
                        ) : (
                          <td className="text-success"> UnLock</td>
                        )}
                        <td>
                          <div class="w3-dropdown-hover">
                            <button className="w3-btn w3-indigo">
                              <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div
                              className="w3-dropdown-content w3-bar-block w3-card-4 w3-animate-zoom header_wrap"
                              style={{ right: "0" }}
                            >
                              <button
                                onClick={(e) => LockUser(e, item.id)}
                                className="w3-bar-item w3-button"
                              >
                                {item.isLock ? "UnLock" : "Lock"}
                              </button>
                              <Link
                                to={`/v1/userReview/${item.id}`}
                                className="w3-bar-item w3-button"
                              >
                                Reviews
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <footer className="text-center col-12">
              {response != null && response.data.length > 0 && (
                <div className="w3-center py-5">
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
            </footer>
          </div>
        </div>
      )}
    </>
  );
};
