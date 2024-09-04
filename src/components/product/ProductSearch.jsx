import React, { useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../redux/actions/categoryAction";
import { paginationProduct } from "../../redux/actions/productAction";

export const ProductSearch = ({ setPagination, pagination }) => {
  const { loadingCategory, results } = useSelector((state) => state.category);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10000);
  const [input, setInput] = useState("");
  const [categoryId, setCategoryId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categories());
  }, [update]);

  useEffect(() => {
    dispatch(paginationProduct(pagination));
  }, []);

  const Search = () => {
    
    setPagination({
      ...pagination,
      Search: input,
      Min: minValue,
      Max: maxValue,
      CategoryId: categoryId,
      PageIndex: 1,
    });

    dispatch(
      paginationProduct({
        Search: input,
        Min: minValue,
        Max: maxValue,
        CategoryId: categoryId,
        PageIndex: 1,
        PageSize: pagination.PageSize,
      })
    );
  };

  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  const setCategory = (e) => {
    const categories = document.querySelectorAll(".categorymenu");

    for (let i = 0; i < categories.length; i++) {
      categories[i].classList.remove("w3-indigo");
    }

    e.target.classList.add("w3-indigo");

    setCategoryId(parseInt(e.target.dataset.id));
  };

  return (
    <div className="col-12 col-md-4 mb-4 ">
      <div className="d-flex gap-1">
        <input
          value={input == "" ? "" : input}
          onChange={(e) => setInput(e.target.value)}
          className="w3-input"
          type="text"
          placeholder="Search..."
        />
        <button className="w3-btn w3-indigo" onClick={Search}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="mt-4">
        <label className="h5 d-flex justify-content-between mb-3">
          <label>Range</label>
          <label>
            {minValue} - {maxValue}
          </label>
        </label>
        <MultiRangeSlider
          min={0}
          max={10000}
          step={5}
          minValue={minValue}
          maxValue={maxValue}
          ruler={false}
          barInnerColor="blue"
          onInput={(e) => {
            handleInput(e);
          }}
        />
      </div>
      <div className="mt-3">
        <ul className="w3-ul w3-card-4">
          <li>
            <h2 className="h5 text-center">Category</h2>
          </li>
          {loadingCategory == false &&
            results.length > 0 &&
            results.map((category, indice) => (
              <li
                key={indice}
                className="categorymenu"
                onClick={(e) => setCategory(e)}
                data-id={category.categoryId}
              >
                {category.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
