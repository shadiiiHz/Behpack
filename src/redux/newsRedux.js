import { createSlice } from "@reduxjs/toolkit";

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    isFetching: false,
    error: false,
    lastPage: 0,
  },
  reducers: {
    //GET ALL
    getNewsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getNewsSuccess: (state, action) => {
      state.isFetching = false;
      state.news = action.payload;
    },
    getNewsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getPageNews: (state, action) => {
      state.lastPage = action.payload;

    },
    //DELETE
    deleteNewsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteNewsSuccess: (state, action) => {
      state.isFetching = false;
      state.news.splice(
        state.news.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteNewsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
   
  },
});

export const {
  getNewsStart,
  getNewsSuccess,
  getNewsFailure,
  deleteNewsStart,
  deleteNewsSuccess,
  deleteNewsFailure,
  getPageNews,
} = newsSlice.actions;

export default newsSlice.reducer;
