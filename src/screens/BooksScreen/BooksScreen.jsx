// Core imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

// Material component imports
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Custom component imports
import DocumentTitle from '../../components/UI/DocumentTitle/DocumentTitle';
import MainLayout from '../../components/Layout/MainLayout/MainLayout';

// Misc imports
import { getBooks } from '../../store/books/booksThunks';
import { Breadcrumbs, Link, CircularProgress, Card, CardMedia, CardActionArea, CardContent } from '@material-ui/core';
import { NAV_ROUTES } from '../../constants';
import replaceUrlParam from '../../utils/string/replaceUrlParam';
import DEFAULT_BOOK_COVER from '../../assets/book_placeholder.png'

const useStyles = makeStyles(() =>
  createStyles({
    media: {
      height: 240
    }
  })
);

const BooksScreen = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { books, isFetching, error } = useSelector((state) => state.books);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const renderBooksList = () => {
    if (isFetching) {
      return (
        <CircularProgress size={24} />
      );
    }

    if (books && books.length > 0) {
      return (
          <Grid container spacing={3} item>
            {
              books.map(item => {
                return (
                  <Grid item sm={4} md={4} lg={3} key={item.isbn13}>
                    <Card>
                      <CardActionArea>
                        <Link to={replaceUrlParam(NAV_ROUTES.BOOK, item.isbn13)} component={RouterLink}>
                          <CardMedia
                            className={classes.media}
                            image={item.image || DEFAULT_BOOK_COVER}
                            title={item.title}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5">
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {`${item.description.substring(0, 120)}...`}
                            </Typography>
                          </CardContent>
                        </Link>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )
              })
            }
          </Grid>
      );
    }

    // else
    return (
      <Typography color="textSecondary">
        Could not load books
      </Typography>
    );
  }

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

        <Grid item xs={12}>
          {renderBooksList()}
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default BooksScreen;
