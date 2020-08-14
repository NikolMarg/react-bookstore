// Core imports
import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

// Material component imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Custom component imports
import DocumentTitle from '../../components/UI/DocumentTitle/DocumentTitle';
import MainLayout from '../../components/Layout/MainLayout/MainLayout';

// Config & state imports
import { getBooks } from '../../store/books/booksThunks';
import { Breadcrumbs, Link, CircularProgress, Card, CardMedia, CardActionArea, CardContent } from '@material-ui/core';
import { NAV_ROUTES } from '../../constants';

const BooksScreen = () => {
  return (
    <MainLayout>
      <DocumentTitle title="Books" />

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
          <Typography variant="h6">
            Books
          </Typography>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default BooksScreen;
