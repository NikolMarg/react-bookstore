// Navigation routes
export const NAV_ROUTES = {
  ROOT: '/',
  BOOKS: '/search',
  BOOK: '/books/:bookId'
};

export const WEBPAGE_TITLE_DEFAULT = 'Bookstore';

// Regular expressions
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-z]).{8,}$/;
export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;
export const NUMBER_REGEX = /^[0-9]*$/;
export const URL_PARAM_REGEX = /\/(:)([a-zA-Z])\w+/;
