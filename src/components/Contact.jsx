import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Loading } from "../layout/Loading";

export const Contact = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    cellPhone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setInput({
      name: "",
      email: "",
      cellPhone: "",
      subject: "",
      message: "",
    });
  };

  const submithandler = (e) => {
    e.preventDefault();

    setLoading(true);

    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    emailjs
      .send(serviceId, templateId, input, {
        publicKey: publicKey,
      })
      .then(
        (response) => {
          setLoading(false);
          clearForm();
          Swal.fire({
            title: "Good job!",
            text: "Mail Sent Successfully!",
            icon: "success",
          });
        },
        (error) => {
          clearForm();
          navigate("/500");
        }
      );
  };

  return (
    <>
      <div className=" container-fluid" style={{ minHeight: "50vh" }}>
        <nav aria-label="breadcrumb" className="mt-3 w3-card">
          <ol class="breadcrumb py-2 ps-2">
            <li class="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Contact
            </li>
          </ol>
        </nav>

        {loading ? (
          <Loading />
        ) : (
          <div className="row">
            <div className="col-sm-12 col-md-6 mt-3">
              <form
                className=" w3-container w3-card-4  w3-text-teal py-3 w3-cursive"
                style={{ width: "100%" }}
                onSubmit={submithandler}
              >
                <h2 className=" w3-center  w3-cursive"> Contact Us</h2>

                {/*  Name  Input */}

                <div className="w3-row w3-section">
                  <div className="w3-col" style={{ width: "50px" }}>
                    <i class="w3-xxlarge fa fa-user"></i>
                  </div>
                  <div className="w3-rest">
                    <input
                      className="w3-input w3-border"
                      type="text"
                      placeholder="Name..."
                      required
                      value={input.name}
                      onChange={(e) =>
                        setInput({ ...input, name: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Email Input */}

                <div className="w3-row w3-section">
                  <div className="w3-col" style={{ width: "50px" }}>
                    <i class="w3-xxlarge fa fa-envelope"></i>
                  </div>
                  <div className="w3-rest">
                    <input
                      className="w3-input w3-border"
                      type="email"
                      placeholder="Email..."
                      required
                      value={input.email}
                      onChange={(e) =>
                        setInput({ ...input, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Phone Input */}

                <div className="w3-row w3-section">
                  <div className="w3-col" style={{ width: "50px" }}>
                    <i class="w3-xxlarge fa fa-phone"></i>
                  </div>
                  <div className="w3-rest">
                    <input
                      className="w3-input w3-border"
                      type="text"
                      placeholder="Phone..."
                      required
                      value={input.cellPhone}
                      onChange={(e) =>
                        setInput({ ...input, cellPhone: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Subject Input */}

                <div className="w3-row w3-section">
                  <div className="w3-col" style={{ width: "50px" }}>
                    <i class="w3-xxlarge fa-solid fa-question"></i>
                  </div>
                  <div className="w3-rest">
                    <input
                      className="w3-input w3-border"
                      type="text"
                      placeholder="Subject..."
                      required
                      value={input.subject}
                      onChange={(e) =>
                        setInput({ ...input, subject: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Message Input */}

                <div className="w3-row w3-section">
                  <div className="w3-col" style={{ width: "50px" }}>
                    <i class="w3-xxlarge fa fa-pencil"></i>
                  </div>
                  <div className="w3-rest">
                    <textarea
                      className="w3-input w3-border"
                      type="text"
                      placeholder="Message..."
                      required
                      value={input.message}
                      onChange={(e) =>
                        setInput({ ...input, message: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>

                {/* Send button  */}

                <button
                  type="submit"
                  class="w3-button w3-block w3-section w3-teal w3-ripple w3-padding w3-hover-green"
                >
                  Send
                </button>
              </form>
            </div>
            <div className="col-sm-12 col-md-6">
              <ul
                class="w3-ul w3-card-4 my-3 w3-cursive h4"
                style={{ width: "100%" }}
              >
                <li>
                  <h2 className="text-center w3-text-teal w3-cursive py-3">
                    Information
                  </h2>
                </li>
                <li className="py-3">
                  <i class="fa-solid fa-location-dot"></i> 2425 Nostrand Ave
                </li>
                <li className="py-3">
                  <i class="fa fa-phone"></i> (862) 888-2034
                </li>
                <li className="py-3 ">
                  <i class="fa fa-envelope"></i>{" "}
                  marcelinoherediafernandez.02@gmail.com
                </li>
                <li className="py-3">
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href="https://www.facebook.com/marcelino.herediafernandez/"
                  >
                    <i class="fa-brands fa-facebook"></i> Marcelino Heredia
                    Fernandez
                  </a>
                </li>
                <li className="py-3">
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href="https://www.instagram.com/marcelinoherediafernandez/"
                  >
                    <i class="fa-brands fa-square-instagram"></i> Marcelino
                    Heredia Fernandez
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
