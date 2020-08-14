// Core imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';

// Material component imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Custom component imports
import DocumentTitle from '../../components/UI/DocumentTitle/DocumentTitle';
import MainLayout from '../../components/Layout/MainLayout/MainLayout';
import { getBook } from '../../store/books/booksThunks';
import { Breadcrumbs, Link, CircularProgress } from '@material-ui/core';
import { NAV_ROUTES } from '../../constants';

const BookScreen = () => {
  const dispatch = useDispatch();
  const { bookIsbn } = useParams();

  const { book, isFetching, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBook(bookIsbn));
  }, [dispatch, bookIsbn]);

  const renderBookDetails = () => {
    if (isFetching) {
      return (
        <CircularProgress size={24} />
      );
    }

    if (book) {
      return (
        <Grid item sm={3}>
          fddsfsd
        </Grid>
      );
    }

    // else
    return (
      <Typography color="textSecondary">
        Could not load book
      </Typography>
    );
  }

  return (
    <MainLayout>
      <DocumentTitle title="Book" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to={NAV_ROUTES.ROOT} component={RouterLink}>
              Home
            </Link>
            <Typography color="textPrimary">
              Search
            </Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12}>
          {renderBookDetails()}
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default BookScreen;
