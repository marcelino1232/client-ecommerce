import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProductList } from "./ProductList";
import { ProductSearch } from "./ProductSearch";

export const Products = () => {
  const [pagination, setPagination] = useState({
    Search: null,
    Min: 0,
    Max: 10000,
    CategoryId: null,
    PageIndex: 1,
    PageSize: 2,
  });

  return (
    <>
      <div className=" container-fluid ">
        <nav aria-label="breadcrumb" className="mt-3 w3-card">
          <ol className="breadcrumb py-2 ps-2">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Product
            </li>
          </ol>
        </nav>

        <div className="row py-5">
          <ProductSearch
            pagination={pagination}
            setPagination={setPagination}
          />
          <ProductList pagination={pagination} setPagination={setPagination} />
        </div>
      </div>
    </>
  );
};
