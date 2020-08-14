import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { NAV_ROUTES } from '../constants';

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
        path={NAV_ROUTES.BOOKS}
      >
        <BooksScreen />
      </Route>

      <Route>
        <PageNotFoundScreen />
      </Route>
    </Switch>
  );
};

export default Root;
