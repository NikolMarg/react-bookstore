import { booksActions } from './books';
import { SnackbarManager } from '../../components';
import { booksData } from '../../data/books';

export const getBook = (
  bookIsbn,
  throwErrors = false
) => async dispatch => {
  dispatch(booksActions.bookFetchStart());

  try {
    const book = booksData.find(book => book.isbn === bookIsbn)

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

    dispatch(booksActions.booksFetchComplete(books));
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
