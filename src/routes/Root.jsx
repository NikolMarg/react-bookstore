import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { NAV_ROUTES } from '../constants';

import BookScreen from '../screens/BookScreen';
import BooksScreen from '../screens/BooksScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import PageNotFoundScreen from '../screens/PageNotFoundScreen';

const Root = () => {
  return (
    <Switch>
      <Route
        exact
        path={NAV_ROUTES.ROOT}
      >
        <HomeScreen />
      </Route>

      <Route
        exact
        path={NAV_ROUTES.SEARCH}
      >
        <BooksScreen />
      </Route>

      <Route
        exact
        path={NAV_ROUTES.BOOK}
      >
        <BookScreen />
      </Route>

      <Route>
        <PageNotFoundScreen />
      </Route>
    </Switch>
  );
};

export default Root;
