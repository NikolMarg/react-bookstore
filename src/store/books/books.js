import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFetching: false,
  isSubmitting: false,
  isDeleting: false,
  error: null,

  books: [],
  book: null
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // Many books
    booksFetchStart: state => ({
      ...state,
      isFetching: true,
      error: null
    }),

    booksFetchFail: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.payload
    }),

    booksFetchComplete: (state, action) => ({
      ...state,
      isFetching: false,
      error: null,
      books: action.payload
    }),

    // Single book
    bookFetchStart: state => ({
      ...state,
      isFetching: true,
      error: null
    }),

    bookFetchFail: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.payload
    }),

    bookFetchComplete: (state, action) => ({
      ...state,
      isFetching: false,
      error: null,
      book: action.payload
    }),

    bookCreateStart: state => ({
      ...state,
      isSubmitting: true,
      error: null,
      book: null
    }),

    bookCreateFail: (state, action) => ({
      ...state,
      isSubmitting: false,
      error: action.payload
    }),

    bookCreateComplete: (state, action) => ({
      ...state,
      book: action.payload,
      isSubmitting: false,
      error: null
    }),

    reset: () => {
      return {
        ...initialState
      };
    }
  }
});

export const booksActions = booksSlice.actions;
export default booksSlice.reducer;
