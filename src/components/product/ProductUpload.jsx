import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { OldImage, uploadingImage } from "../../services/productService";

export const ProductUpload = () => {
  const { ProductId } = useParams();

  const navigate = useNavigate();

  const [input, setInput] = useState({});

  const [imageUp, setImageUp] = useState(false);

  const [oldIamges, setOldIamges] = useState([]);

  useEffect(() => {
    onloading();
  }, []);

  const onloading = async () => {
    const request = await OldImage(ProductId);
    setOldIamges(request.data);
  };

  const InputHandle = (e) => {
    const name = e.target.name;
    const value = Array.from(e.target.files);

    setInput({
      ...input,
      productId: parseInt(ProductId),
      [name]: value,
    });
  };

  const validfiles = (e) => {
    e.preventDefault();

    let files = e.target.files;

    if (files.length > 1 && files.length < 5) {
      setImageUp(true);
      InputHandle(e);
      setImageUp(false);
    } else {
      e.target.value = "";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "requerid between 2 and 4 files!",
      });
    }
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    if (input.formFiles?.length > 0) {
      const formDataObject = new FormData(e.target);

      const request = await uploadingImage(formDataObject);

      if (request.success) {
        Swal.fire({
          icon: "success",
          title: "Image was update successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/v1");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "sorry , but files was not Update!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "files is requerid!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <Fragment>
      <form
        onSubmit={submitHandle}
        className=" container-fluid"
        encType="multipart/form-data"
      >
        <div className="w3-card py-3 my-4 w3-container">
          <header className=" w3-border-bottom d-flex justify-content-between">
            <p className="h4 w3-cursive">Upload Iamges</p>
            <Link
              to={`/v1/update/${ProductId}`}
              className="w3-btn w3-indigo w3-round-large h6"
            >
              Back
            </Link>
          </header>
          <input type="hidden" name="productId" value={ProductId} />
          <div className="row my-3">
            <div className="col-12 col-md-6">
              <div className="input-group input-group-lg">
                <input
                  type="file"
                  className=" form-control"
                  placeholder="Name..."
                  multiple="true"
                  name="formFiles"
                  onChange={(e) => validfiles(e)}
                  accept=".jpng,.png,.jpg"
                  required
                />
              </div>
            </div>
          </div>

          <div className="row my-3 w3-border">
            {!imageUp &&
              input != null &&
              input.formFiles?.length > 0 &&
              input.formFiles.map((item) => (
                <div key={item} className="col-12 col-md-6 col-lg-3">
                  <img
                    src={URL.createObjectURL(item)}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              ))}
          </div>

          <footer className="d-flex justify-content-end w3-border-top pt-2">
            <Link to={`/v1`} className="w3-btn w3-red w3-round-large me-2 h5">
              Cancel
            </Link>
            <button className="w3-btn w3-indigo w3-round-large h5">
              Accept
            </button>
          </footer>
        </div>
      </form>

      <div className=" container-fluid mb-3">
        <div className="w3-card w3-container">
          <div className="py-3 text-center ">
            <p className="h4 mb-0 w3-cursive">Old Images</p>
          </div>
          <div className="row w3-border-top"></div>
          {oldIamges?.length > 0 && (
            <div className="row mb-3 mt-2 w3-border">
              {oldIamges.map((item, indice) => (
                <div key={indice} className="col-12 col-md-6 col-lg-3">
                  <img
                    src={`${
                      import.meta.env.VITE_Back_Domain
                    }/Product/getImageByName?imageName=${item.imageName}`}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
