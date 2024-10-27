import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { messages, sendMessage } from "../../services/messageService";
import { Loading } from "../../layout/Loading";
import { getId, getRole } from "../../helpers/GetToken";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const SupportMessage = () => {
  let { SupportId } = useParams();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);

  const [button, setButton] = useState(false);

  const connection = new HubConnectionBuilder()
    .withUrl("" + import.meta.env.VITE_Back_Domain + "/supportMessage")
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  connection.on("ReceiveMessage", (result) => {
    setData(result.data);
  });

  connection.onclose((e) => {
    setTimeout(async function () {
      await connection.start();
    }, 2000);
  });

  const [params, setParams] = useState({
    SupportId: SupportId,
    Message: "",
  });

  useEffect(() => {
    onloading();
  }, []);

  const onloading = async () => {
    setLoading(true);
    const request = await messages(SupportId);
    setData(request.data);
    setLoading(false);

    await connection.start();
    await connection
      .invoke("SendMessage", SupportId)
      .catch((err) => console.error(err));
  };

  const sendMessagePost = async (e) => {
    e.preventDefault();
    setButton(true);

    const request = await sendMessage(params);
    if (request.success) {
      document.getElementById("message").value = "";
      await connection.start();
      await connection
        .invoke("SendMessage", SupportId)
        .catch((err) => console.error(err));
    }
    setParams({ ...params, Message: "" });
    setButton(false);
  };

  return (
    <div className=" container-fluid">
      <div className="row my-3">
        <div className="col-12">
          <div className="w3-card">
            <header className="p-2 w3-border-bottom  d-flex justify-content-between align-items-center">
              <p className="h4 w3-cursive mb-0">Messages</p>
              {getRole() == "Admin" ? (
                <Link
                  to={"/v1/support"}
                  className="w3-btn w3-indigo w3-round-large h6 mb-0"
                >
                  Back
                </Link>
              ) : (
                <Link
                  to={"/support"}
                  className="w3-btn w3-indigo w3-round-large h6 mb-0"
                >
                  Back
                </Link>
              )}
            </header>
            <div className="p-2 messageTamplate">
              {loading ? (
                <Loading />
              ) : data != null && data?.length > 0 ? (
                data.map((support, indice) =>
                  support.userId == getId() ? (
                    <div className="row my-2" key={indice}>
                      <div className="col-12 col-md-6"></div>
                      <div className="col-12 col-md-6">
                        <div className="message">
                          <p className="h5 w3-cursive my-2 text-uppercase">
                            {support.userName}
                          </p>
                          <div className="p-3 mt-1 text-wrap card bg-secondary text-white  w-100">
                            <p
                              className="h5 mb-0 "
                              style={{ textAlign: "justify" }}
                            >
                              {support.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row my-2" key={indice}>
                      <div className="col-12 col-md-6">
                        <div className="message">
                          <p className="h5 w3-cursive my-0 text-uppercase">
                            {support.userName}
                          </p>
                          <div className="p-3 mt-1 text-wrap card w3-indigo text-white  w-100">
                            <p className="h5 mb-0  text-col">
                              {support.message}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6"></div>
                    </div>
                  )
                )
              ) : (
                <div>
                  <p className="h2 w3-cursive text-center mb-5 pb-5">
                    There is not any message yet
                  </p>
                </div>
              )}
            </div>
            <div className="p-2 w3-border-top">
              <form onSubmit={sendMessagePost} className="">
                <div className=" input-group input-group-lg my-2 ">
                  <textarea
                    id="message"
                    className="form-control"
                    placeholder="Message..."
                    onChange={(e) =>
                      setParams({ ...params, Message: e.target.value })
                    }
                    required
                    maxLength={150}
                    minLength={3}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="w3-btn w3-indigo w3-round-large h5"
                    disabled={button}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
