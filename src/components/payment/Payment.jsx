import React, { useEffect, useState } from "react";
import { Loading } from "../../layout/Loading";
import { Link } from "react-router-dom";
import { payments } from "../../services/historyService";
import { convertIntToArrayInit } from "../../helpers/GetArray";

export const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [pageNumer, setPageNumer] = useState(null);

  const [params, setParams] = useState({
    Search: "",
    PageIndex: 1,
    PageSize: 2,
  });

  useEffect(() => {
    onloading();
  }, [params.PageIndex, params.Search]);

  const onloading = async () => {
    setLoading(true);
    const request = await payments(params);
    if (request != null) {
      setResponse(request.response);
      setPageNumer(convertIntToArrayInit(request.response.pageCount));
    }
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
              <li class="breadcrumb-item active" aria-current="page">
                Payment
              </li>
            </ol>
          </nav>

          <div className="row">
            <div className="col-12">
              <div className="w3-card-4 py-2 h5 text-center">
                <p className="mb-0">Payment History</p>
              </div>
            </div>
          </div>

          {loading ? (
            <Loading />
          ) : (
            response != null && (
              <div className=" mt-2">
                <table className=" w3-table-all w3-card-4 w3-large w3-centered">
                  <thead className="">
                    <tr className="d-none d-md-table-row">
                      <th>PaymentTransactionId</th>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {response.data?.map((item, indice) => (
                      <tr
                        key={indice}
                        className="d-flex flex-column py-4 py-md-0 d-md-table-row h5"
                      >
                        <td>{item.paymentTransactionId}</td>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

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
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};
