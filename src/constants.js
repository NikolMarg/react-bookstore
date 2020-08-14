// Navigation routes
export const NAV_ROUTES = {
  ROOT: '/',
  BOOKS: '/books',
  BOOK: '/books/:bookId',
  SETTINGS: '/settings'
};

export const WEBPAGE_TITLE_DEFAULT = 'Bookstore';

// REDUX
export const APP_INIT_STATES = {
  UNINITALIZED: 'UNINITALIZED',
  INITIALIZING: 'INITIALIZING',
  INITIALIZED: 'INITIALIZED',
  INIT_FAILED: 'INIT_FAILED'
};

// Regular expressions
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-z]).{8,}$/;
export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;
export const NUMBER_REGEX = /^[0-9]*$/;
export const URL_PARAM_REGEX = /\/(:)([a-zA-Z])\w+/;
