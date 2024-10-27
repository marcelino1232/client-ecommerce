import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../../services/categoryService";
import { createProduct } from "../../services/productService";

export const InventoryCreate = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);

  const [input, setInput] = useState({});

  const [imageUp, setImageUp] = useState(false);

  const InputHandle = (e, file = true) => {
    const name = e.target.name;
    const value = file ? e.target.value : Array.from(e.target.files);

    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    onloading();
  }, []);

  const onloading = async () => {
    const request = await categories();
    setCategory(request.data);
  };

  const validfiles = (e) => {
    e.preventDefault();

    let files = e.target.files;

    if (files.length > 1 && files.length < 5) {
      setImageUp(true);
      InputHandle(e, false);
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

    const formDataObject = new FormData(e.target);

    const request = await createProduct(formDataObject);

    if (request.status == 400) {
    } else {
      if (request.success) {
        navigate("/v1");
        Swal.fire({
          title: "Good job!",
          text: "Product Was Created SuccessFully!",
          icon: "success",
        });
      }
    }
  };

  return (
    <>
      <form
        onSubmit={submitHandle}
        className=" container-fluid"
        encType="multipart/form-data"
      >
        <div className="w3-card py-3 my-4 w3-container">
          <header className="text-center h4 w3-cursive w3-border-bottom pb-3">
            Create New Product
          </header>
          <div className="row my-3">
            <div className="col-12 col-md-6">
              <label className=" form-label h5 w3-cursive">Name</label>
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Name..."
                  name="name"
                  value={input.name == null ? "" : input.name}
                  onChange={(e) => InputHandle(e)}
                  required
                />
              </div>
            </div>
            <div className="col-12 col-md-6 mt-3 mt-md-0">
              <label className=" form-label h5 w3-cursive">Brand</label>
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Brand..."
                  name="brand"
                  value={input.brand == null ? "" : input.brand}
                  onChange={(e) => InputHandle(e)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12 col-md-6">
              <label className=" form-label h5 w3-cursive">Description</label>
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Description..."
                  name="description"
                  value={input.description == null ? "" : input.description}
                  onChange={(e) => InputHandle(e)}
                  required
                />
              </div>
            </div>
            <div className="col-12 col-md-6 mt-3 mt-md-0">
              <label className=" form-label h5 w3-cursive">Sales Price</label>
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className=" form-control"
                  placeholder="SalesPrice..."
                  name="salesPrice"
                  value={input.salesPrice == null ? "" : input.salesPrice}
                  onChange={(e) => InputHandle(e)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12 col-md-6">
              <label className=" form-label h5 w3-cursive">Buy Price</label>
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className=" form-control"
                  placeholder="BuyPrice..."
                  name="buyPrice"
                  value={input.buyPrice == null ? "" : input.buyPrice}
                  onChange={(e) => InputHandle(e)}
                  required
                />
              </div>
            </div>
            <div className="col-12 col-md-6 mt-3 mt-md-0">
              <label className=" form-label h5 w3-cursive">Category</label>
              <div className="input-group input-group-lg">
                <select
                  type="text"
                  className=" form-control"
                  name="categoryId"
                  value={input.categoryId == null ? "" : input.categoryId}
                  onChange={(e) => InputHandle(e)}
                  required
                >
                  <option value={""} disabled selected hidden>
                    -- Select Category --
                  </option>
                  {category != null &&
                    category?.map((item, indice) => (
                      <option key={indice} value={item.categoryId}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row my-3">
            <div className="col-12 col-md-6">
              <label className=" form-label h5 w3-cursive">Upload Image</label>
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
            <Link to="/v1" className="w3-btn w3-red w3-round-large me-2 h5">
              Cancel
            </Link>
            <button className="w3-btn w3-indigo w3-round-large h5">
              Accept
            </button>
          </footer>
        </div>
      </form>
    </>
  );
};
