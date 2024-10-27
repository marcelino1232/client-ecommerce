import React, { useEffect, useState } from "react";
import { categories } from "../../services/categoryService";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getProductAdmin,
  updateProduct,
} from "../../services/productService";

export const InventoryUpdate = () => {

  const { ProductId } = useParams();

  const navigate = useNavigate();

  const [category, setCategory] = useState(null);

  const [input, setInput] = useState({});

  const InputHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;

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
    await fullLoading();
  };

  const fullLoading = async () => {
    const request = await getProductAdmin(ProductId);
    if (request.statusCode == 404) {
      navigate("/404");
    } else {
      setInput(request.response);
    }
  };

  const submitHandle = async (e) => {

    e.preventDefault();

    const request = await updateProduct(input);

    if (request.status == 400) {
      
    } else {
      if (request.success) {
        navigate("/v1");
        Swal.fire({
          title: "Good job!",
          text: "Product Was Update SuccessFully!",
          icon: "success",
        });
      }
    }
  };

  return (
    <form onSubmit={submitHandle} className=" container-fluid">
      <div className="w3-card py-3 my-4 w3-container">
        <header className=" w3-border-bottom pb-3 d-flex justify-content-between">
          <p className="h4 w3-cursive">Update Product</p>
          <Link
            to={`/v1/productUpload/${ProductId}`}
            className="w3-btn w3-indigo w3-round-large h5"
          >
            Upload
          </Link>
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
            <div className="form-check form-switch">
              {input.isHide ? (
                <input
                  className="form-check-input editp"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  onChange={(e) =>
                    setInput({ ...input, isHide: !input.isHide })
                  }
                  checked
                />
              ) : (
                <input
                  className="form-check-input editp"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  onChange={(e) =>
                    setInput({ ...input, isHide: !input.isHide })
                  }
                />
              )}
              <label
                className="form-check-label h5 w3-cursive"
                for="flexSwitchCheckDefault"
              >
                Hide Product
              </label>
            </div>
          </div>
        </div>

        <footer className="d-flex justify-content-end w3-border-top pt-2">
          <Link to="/v1" className="w3-btn w3-red w3-round-large me-2 h5">
            Cancel
          </Link>
          <button className="w3-btn w3-indigo w3-round-large h5">Accept</button>
        </footer>
      </div>
    </form>
  );
};
