import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import booksReducer from './books/books';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  books: booksReducer,
  router: connectRouter(history)
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)]
});

export default store;
