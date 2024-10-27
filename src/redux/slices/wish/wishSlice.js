import { createSlice } from "@reduxjs/toolkit";
import { getWishes } from "../../actions/WishAction";
import { convertIntToArray } from "../../../helpers/GetArray";

export const initialState = {
  loading: false,
  statusCode: 0,
  data: [],
  response: {
    pageIndex: 1,
    pageSize: 3,
    pageCount: 0,
    totalRow: 0,
    results: [],
    pageLi: [],
    updatePagination: false,
  },
};

const wishesSlice = createSlice({
  name: "wishes",
  initialState: initialState,
  reducers: {
    changePage: (state, { payload }) => {
      let filter;

      console.log(payload);
      const { Search, Property, PageIndex, PageSize } = payload;

      if (Search == "") {
        filter = state.data;
      } else {
        filter = state.data.filter(
          (x) => x[Property].toUpperCase().indexOf(Search.toUpperCase()) > -1
        );
      }

      const PageIndexLocal = PageIndex - 1;

      const skip = PageIndexLocal * PageSize;

      const row = skip + PageSize;

      state.response.pageIndex = PageIndexLocal;

      state.response.pageSize = PageSize;

      state.response.totalRow = filter.length;

      state.response.pageCount = Math.ceil(state.response.totalRow / PageSize);

      state.response.results = filter.slice(skip, row);

      state.response.pageLi = convertIntToArray(
        parseInt(state.response.pageCount)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWishes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWishes.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
      state.data = payload.data;
    });
    builder.addCase(getWishes.rejected, (state, { payload }) => {
      state.loading = false;
      state.statusCode = payload.statusCode;
    });
  },
});

export const { changePage } = wishesSlice.actions;

export const wishesReducer = wishesSlice.reducer;
