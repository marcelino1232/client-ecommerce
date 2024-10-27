import React, { useEffect, useState } from "react";
import { ProductList } from "./ProductList";
import { productOnLoading } from "../../services/productService";
import MultiRangeSlider from "multi-range-slider-react";
import { Loading } from "../../layout/Loading";
import { categories } from "../../services/categoryService";

export const Products = () => {
  const [pagination, setPagination] = useState({
    Search: "",
    Min: 0,
    Max: 10000,
    CategoryId: "",
    PageIndex: 1,
    PageSize: 12,
  });

  const [data, setData] = useState(null);

  const [response, setResponse] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onCategory();
  }, []);

  const onCategory = async () => {
    var request = await categories();
    setData(request.data);
  };

  useEffect(() => {
    onloading();
  }, [pagination]);

  const onloading = async () => {
    setLoading(true);
    var request = await productOnLoading(pagination);
    setResponse(request.response);
    setLoading(false);
  };

  const handleInput = async (e) => {
    setPagination({
      ...pagination,
      Min: e.minValue,
      Max: e.maxValue,
    });
  };

  const search = (e) => {
    e.preventDefault();

    var search = document.getElementById("txtSearch");

    setPagination({
      ...pagination,
      Search: search.value,
      PageIndex: 1,
    });
  };
  return (
    <>
      <div className="container-fluid ">
        {data != null && (
          <div className="row pt-sm-0 pt-md-5 d-flex flex-column-reverse flex-md-row">
            <div className="col-sm-12 col-md-4">
              <label className="h5 w3-bar  mt-4 mt-md-0">
                <label>Range</label>
                <label className="w3-right">
                  {pagination.Min} - {pagination.Max}
                </label>
              </label>
              <div className="input-group input-group-lg">
                <MultiRangeSlider
                  className="form-range"
                  min={0}
                  max={10000}
                  step={5}
                  minValue={pagination.Min}
                  maxValue={pagination.Max}
                  ruler={false}
                  barInnerColor="blue"
                  label={false}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-4">
              <label className="h5 w3-bar  mt-4 mt-md-0">Category</label>
              <select
                className=" form-control form-select-lg"
                value={pagination.CategoryId}
                onChange={(e) =>
                  setPagination({
                    ...pagination,
                    CategoryId: parseInt(e.target.value),
                  })
                }
              >
                {data.length > 0 &&
                  data.map((category, indice) => (
                    <option
                      key={indice}
                      className="categorymenu h5"
                      style={{ zIndex: "-1" }}
                      value={category.categoryId}
                    >
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-sm-12 col-md-4">
              <label className="h5 w3-bar  mt-4 mt-md-0">Search</label>
              <div className="input-group input-group-lg">
                <input
                  id="txtSearch"
                  className="form-control me-2"
                  type="text"
                  placeholder="Search..."
                />
                <button className="w3-btn w3-indigo" onClick={(e) => search(e)}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>
        )}
        {loading ? (
          <Loading />
        ) : (
          response != null && (
            <div className="row py-5">
              <ProductList
                pagination={pagination}
                setPagination={setPagination}
                setResponse={setResponse}
                response={response}
              />
            </div>
          )
        )}
      </div>
    </>
  );
};
