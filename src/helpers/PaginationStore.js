import { convertIntToArray, convertIntToArrayInit } from "./GetArray";

const pagination = {
  pageIndex: 1,
  pageSize: 3,
  pageCount: 0,
  totalRow: 0,
  results: [],
  pageLi: [],
};

export const changePage = (params, data) => {
  let filter;

  if (params.Search == "") {
    filter = data;
  } else {
    filter = data.filter(
      (x) =>
        x[params.Property].toUpperCase().indexOf(params.Search.toUpperCase()) >
        -1
    );

    params.PageIndex = 0;
  }

  const skip = params.PageIndex * params.PageSize;

  const row = skip + params.PageSize;

  pagination.pageIndex = params.PageIndex;

  pagination.pageSize = params.PageSize;

  pagination.totalRow = filter.length;

  pagination.pageCount = Math.ceil(pagination.totalRow / params.PageSize);

  pagination.results = filter.slice(skip, row);

  pagination.pageLi = convertIntToArrayInit(parseInt(pagination.pageCount));

  return pagination;
};
