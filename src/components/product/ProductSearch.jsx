import React, { useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

export const ProductSearch = ({ setPagination, pagination, results }) => {

  const Search = () => {
    setPagination({
      ...pagination,
      PageIndex: 1,
      Update: !pagination.Update,
    });
  };

  const handleInput = (e) => {
    setPagination({
      ...pagination,
      Min: e.minValue,
      Max: e.maxValue,
    });
  };

  const setCategory = (e) => {
    const categories = document.querySelectorAll(".categorymenu");

    for (let i = 0; i < categories.length; i++) {
      categories[i].classList.remove("w3-indigo");
    }

    e.target.classList.add("w3-indigo");

    setPagination({
      ...pagination,
      CategoryId: parseInt(e.target.dataset.id),
    });
  };

  return (
    <div className="col-12 col-md-4 mb-4 ">
      <div className="d-flex gap-1">
        <input
          value={pagination.Search}
          onChange={(e) =>
            setPagination({
              ...pagination,
              Search: e.target.value,
            })
          }
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
            {pagination.Min} - {pagination.Max}
          </label>
        </label>
        <MultiRangeSlider
          min={0}
          max={10000}
          step={5}
          minValue={pagination.Min}
          maxValue={pagination.Max}
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
          {results.length > 0 &&
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
