import { booksActions } from './books';
import { SnackbarManager } from '../../components';
let booksData = require('../../data/books.json');

export const getBook = (
  bookIsbn,
  throwErrors = false
) => async dispatch => {
  dispatch(booksActions.bookFetchStart());

  try {
    const book = booksData.find(book => book.isbn13 === bookIsbn);

    dispatch(booksActions.bookFetchComplete(book));
  } catch (error) {
    dispatch(booksActions.bookFetchFail(error));
    SnackbarManager.error('Error fetching book.');

    if (throwErrors) {
      throw error;
    }
  }
};

export const getBooks = (
  throwErrors = false
) => async dispatch => {
  dispatch(booksActions.booksFetchStart());

  try {
    const books = booksData;
    setTimeout(() => dispatch(booksActions.booksFetchComplete(books)), 1500);
  } catch (error) {
    dispatch(booksActions.booksFetchFail(error));
    SnackbarManager.error('Error fetching books.');

    if (throwErrors) {
      throw error;
    }
  }
};

export const createBook = (
  values,
  throwErrors = false
) => async (dispatch) => {
  dispatch(booksActions.bookCreateStart());

  try {
    const result = "success"
    console.log(values);
    booksData.push(JSON.stringify(values))

    dispatch(booksActions.bookCreateComplete(result));
    SnackbarManager.success('Book creation successful!');
  } catch (error) {
    dispatch(booksActions.bookCreateFail(error));
    SnackbarManager.error('An error occured.');

    if (throwErrors) {
      throw error;
    }
  }
};
