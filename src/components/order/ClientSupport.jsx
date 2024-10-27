import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  support,
  supportCreate,
  supportUpdate,
} from "../../services/supportService";
import { Loading } from "../../layout/Loading";

export const ClientSupport = () => {
  const { OrderId, ProductId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoding] = useState(false);

  const [success, setSuccess] = useState(false);

  const ContactStatus = {
    EmailAddress: 0,
    TextCellPhone: 1,
  };

  const [input, setInput] = useState({
    SupportId: null,
    Subject: "",
    Message: "",
    ContactSupport: ContactStatus.EmailAddress,
    OrderId: parseInt(OrderId),
    ProductId: parseInt(ProductId),
    UserId:null
  });

  useEffect(() => {
    onloading();
  }, []);

  const onloading = async () => {
    setLoding(true);
    const request = await support(OrderId, ProductId);

    if (request.success) {
      const { supportId, subject, message, contactSupport , userId } = request.response;
      setInput({
        ...input,
        SupportId: supportId,
        Subject: subject,
        Message: message,
        ContactSupport: contactSupport,
        UserId:userId
      });
    }

    setSuccess(request.success);
    setLoding(false);
  };

  const handleChange = (status) => {
    setInput({ ...input, ContactSupport: status });
  };

  const submitHundler = async (e) => {
    e.preventDefault();

    if (success) {
      const request = await supportUpdate(input);

      if (request.status == 400) {
      } else {
        if (request.success) {
          navigate("/purchase");
          Swal.fire({
            icon: "success",
            title: "Your report was update successfully!",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    } else {
      const request = await supportCreate(input);

      if (request.status == 400) {
      } else {
        if (request.success) {
          navigate("/purchase");
          Swal.fire({
            icon: "success",
            title: "Your report was create successfully!",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    }
  };

  return (
    <div className=" container-fluid">
      <nav aria-label="breadcrumb" className="mt-3 w3-card">
        <ol className="breadcrumb py-2 ps-2">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/purchase">Purchase</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Support
          </li>
        </ol>
      </nav>

      {loading ? (
        <Loading />
      ) : (
        <div className="row">
          <div className="col-12">
            <form onSubmit={submitHundler} className="w3-card">
              <header className="w3-center w3-border-bottom">
                {success ? (
                  <p className="py-2 w3-cursive h4">Update Report</p>
                ) : (
                  <p className="py-2 w3-cursive h4">Create Report</p>
                )}
              </header>
              <div className="py-3 px-2">
                <div>
                  <label className="h5 w3-cursive" htmlFor="txtsubject">
                    Subject
                  </label>
                  <div className="input-group input-group-lg">
                    <input
                      id="txtsubject"
                      type="text"
                      className="form-control"
                      placeholder="Subject..."
                      value={input.Subject}
                      onChange={(e) =>
                        setInput({ ...input, Subject: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="h5 w3-cursive mt-2" htmlFor="txtmessage">
                    Message
                  </label>
                  <div className="input-group input-group-lg mt-1">
                    <textarea
                      id="txtmessage"
                      type="text"
                      className="form-control"
                      placeholder="Message..."
                      value={input.Message}
                      onChange={(e) =>
                        setInput({ ...input, Message: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>
                </div>
                <div>
                  <label
                    className="h5 w3-cursive mt-3 mb-3"
                    htmlFor="txtmessage"
                  >
                    How would you like that we contact with you ?
                  </label>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      style={{ cursor: "pointer" }}
                      checked={
                        input.ContactSupport == ContactStatus.EmailAddress
                      }
                      onChange={(e) => handleChange(ContactStatus.EmailAddress)}
                    />

                    <label
                      className="form-check-label h5 w3-cursive"
                      style={{ cursor: "pointer" }}
                      for="flexRadioDefault1"
                    >
                      EmailAddress
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      style={{ cursor: "pointer" }}
                      checked={
                        input.ContactSupport == ContactStatus.TextCellPhone
                      }
                      onChange={(e) =>
                        handleChange(ContactStatus.TextCellPhone)
                      }
                    />
                    <label
                      className="form-check-label h5 w3-cursive"
                      style={{ cursor: "pointer" }}
                      for="flexRadioDefault2"
                    >
                      Text Message
                    </label>
                  </div>
                </div>
              </div>
              <footer className=" pt-2 pb-1 px-2 d-flex justify-content-end w3-cursive w3-border-top">
                <Link
                  className="w3-btn w3-red me-1 h5 w3-round-large"
                  to={"/purchase"}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="w3-btn w3-indigo h5 w3-round-large"
                >
                  Accept
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
