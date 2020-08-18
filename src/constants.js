// Navigation routes
export const NAV_ROUTES = {
  ROOT: '/',
  SEARCH: '/search',
  BOOK: '/books/:bookIsbn',
  BOOK_CREATE: '/books/new'
};

export const WEBPAGE_TITLE_DEFAULT = 'Bookstore';

// Regular expressions
export const TITLE_REGEX = /^[a-zA-Z0-9.@”#&*!]*$/;
export const DESCRIPTION_REGEX = /^[A-Z].+$/;
export const NUMBER_REGEX = /^[0-9]*$/;
export const URL_PARAM_REGEX = /\/(:)([a-zA-Z])\w+/;
