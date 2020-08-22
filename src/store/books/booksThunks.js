import { booksActions } from './books';
import { SnackbarManager } from '../../components';
import is from '../../utils/is';
let booksData = require('../../data/books.json');

export const getBook = (
  bookIsbn,
  throwErrors = false
) => async dispatch => {
  dispatch(booksActions.bookFetchStart());

  try {
    const books = window.localStorage.getItem('books') ? JSON.parse(window.localStorage.getItem('books')) : booksData;
    const book = books.find(book => book.isbn13 === bookIsbn);

    setTimeout(() => dispatch(booksActions.bookFetchComplete(book)), 1000);
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
    const books = window.localStorage.getItem('books') ? JSON.parse(window.localStorage.getItem('books')) : booksData;
    window.localStorage.setItem('books', JSON.stringify(books));

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
    const books = window.localStorage.getItem('books') ? JSON.parse(window.localStorage.getItem('books')) : booksData;
    if (books.find(book => book.isbn13 === values.isbn13)) {
      const error = new Error("ISDN-13 already exists. Please enter a different number.")
      throw error.message;
    }

    const updatedBooks = [...books, values];
    window.localStorage.setItem('books', JSON.stringify(updatedBooks));

    const result = values;
    setTimeout(() => dispatch(booksActions.bookCreateComplete(result)), 1000);

    SnackbarManager.success('Book creation successful!');

    return result;
  } catch (error) {
    dispatch(booksActions.bookCreateFail(error));
    SnackbarManager.error(is.string(error) ? error : 'Something went wrong.');

    if (throwErrors) {
      throw error;
    }
  }
};
