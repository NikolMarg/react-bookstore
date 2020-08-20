// Core imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';
import moment from "moment";

// Material component imports
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

// Custom component imports
import DocumentTitle from '../../components/UI/DocumentTitle/DocumentTitle';
import MainLayout from '../../components/Layout/MainLayout/MainLayout';

// Misc imports
import { getBook } from '../../store/books/booksThunks';
import { NAV_ROUTES } from '../../constants';
import getInitials from '../../utils/string/getInitials';
import DEFAULT_BOOK_COVER from '../../assets/book_placeholder.png'

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      maxWidth: '100%',
      height: 'auto'
    }
  })
);

const BookScreen = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { bookIsbn } = useParams();

  const { book, isFetching, error } = useSelector((state) => state.books);
  const pageTitle = book && book.title ? book.title : 'Book details';

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
        <Grid container spacing={4} item>
          <Grid container direction="column" spacing={3} item sm={6}>
            <Grid item>
              <img src={book.image || DEFAULT_BOOK_COVER} alt={book.title} className={classes.image} />
            </Grid>

            <Grid container spacing={2} alignItems="center" item>
              <Grid item>
                <Avatar>
                  {getInitials(book.publisher)}
                </Avatar>
              </Grid>
              
              <Grid item>
                <Typography>
                  {book.publisher}
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Rating name="rating" size="large" value={book.rating} readOnly />
            </Grid>
          </Grid>

          <Grid container direction="column" spacing={4} item sm={6}>
            <Grid item>
              <Typography variant="h5">
                {book.title}
              </Typography>
            </Grid>
            
            <Grid item>
              <Typography>
                {book.description}
              </Typography>
            </Grid>

            <Grid item>
              <Button size="small" variant="contained" color="primary">
                Favorite
              </Button>

              <Button size="small" variant="contained" color="primary">
                Share
              </Button>
            </Grid>

            <Grid item>
              <Typography component={'span'}>
                Category: 
                {
                  book.categories.split(',').map(item => {
                    return (
                      <Chip
                        size="small"
                        label={item}
                        key={item}
                      />
                    )
                  })
                }
              </Typography>
              <Typography>
                Year: {moment(book.published).year()}
              </Typography>
              <Typography>
                Number of pages: {book.pages}
              </Typography>
            </Grid>

            <Grid item>
              <Typography>
                Publisher: {book.publisher}
              </Typography>
            </Grid>

            <Grid item>
              <Typography>
                ISBN-13: {book.isbn13}
              </Typography>
            </Grid>

            <Grid item>
              <Button fullWidth variant="contained" color="primary">
                Buy
              </Button>
            </Grid>
          </Grid>
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
      <DocumentTitle title={pageTitle} />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to={NAV_ROUTES.ROOT} component={RouterLink}>
              Home
            </Link>
            <Link color="inherit" to={NAV_ROUTES.SEARCH} component={RouterLink}>
              Search
            </Link>
            <Typography color="textPrimary">
              {pageTitle}
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
