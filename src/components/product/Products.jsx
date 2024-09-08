import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductList } from "./ProductList";
import { ProductSearch } from "./ProductSearch";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../layout/Loading";
import { paginationProduct } from "../../redux/actions/productAction";
import { categories } from "../../redux/actions/categoryAction";

export const Products = () => {
  const { loading, products, pageCount } = useSelector(
    (state) => state.paginationProduct
  );

  const { loadingCategory, results } = useSelector((state) => state.category);

  const [pagination, setPagination] = useState({
    Search: "",
    Min: 0,
    Max: 10000,
    CategoryId: null,
    PageIndex: 1,
    PageSize: 2,
    Update: true,
  });

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(paginationProduct(pagination));
  }, [pagination.PageIndex]);

  useEffect(() => {
    dispatch(categories());
  }, []);

  useEffect(() => {
    dispatch(paginationProduct(pagination));
  }, [pagination.Update]);

  return (
    <>
      {loading && loadingCategory ? (
        <Loading />
      ) : (
        <div className=" container-fluid ">
          <div className="row py-5">
            <ProductSearch
              pagination={pagination}
              setPagination={setPagination}
              results={results}
            />
            <ProductList
              pagination={pagination}
              setPagination={setPagination}
              pageCount={pageCount}
              products={products}
            />
          </div>
        </div>
      )}
    </>
  );
};
