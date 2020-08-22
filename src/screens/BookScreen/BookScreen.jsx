// Core imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';
import moment from "moment";
import ReactAliceCarousel from 'react-alice-carousel';

// Material component imports
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

// Custom component imports
import DocumentTitle from '../../components/UI/DocumentTitle/DocumentTitle';
import MainLayout from '../../components/Layout/MainLayout/MainLayout';

// Misc imports
import { getBook, getBooks } from '../../store/books/booksThunks';
import { NAV_ROUTES } from '../../constants';
import { useUtilStyles } from '../../theme/styles';
import replaceUrlParam from '../../utils/string/replaceUrlParam';
import getInitials from '../../utils/string/getInitials';
import bookCoverPlaceholder from '../../assets/book_placeholder.png'
import notFoundIllustration from '../../assets/book_not_found.png';

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      borderRadius: 16
    },
    media: {
      height: 240,
      boxShadow: '0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)',
      borderRadius: 8,
      margin: '14px 14px 4px 14px'
    },
    bookTitle: {
      fontSize: '1.10rem',
      lineHeight: '1.4',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    bookCardContainer: {
      marginTop: 6,
      marginBottom: 6,
      marginLeft: 12,
      marginRight: 12
    },
    carouselContainer: {
      '& .alice-carousel__dots-item': {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',

        '&:hover' : {
          backgroundColor: 'black'
        },
        '&.__active' : {
          backgroundColor: 'black'
        }
      }
    }
  })
);

const BookScreen = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const utilClasses = useUtilStyles();
  const { bookIsbn } = useParams();

  const { book, books, isFetching, error } = useSelector((state) => state.books);
  const pageTitle = book && book.title ? book.title : 'Book details';

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getBook(bookIsbn));
  }, [dispatch, bookIsbn]);

  const renderBookDetails = () => {
    if (isFetching) {
      return (
        <Grid container justify="center" item>
          <Grid item>
            <CircularProgress size={32} />
          </Grid>
        </Grid>
      );
    }

    if (book) {
      return (
        <Grid container spacing={4} item>
          <Grid container direction="column" spacing={3} item sm={6}>
            <Grid item>
              <img src={book.image || bookCoverPlaceholder} alt={book.title} className={`${utilClasses.imgResponsive} ${classes.image}`} />
            </Grid>

            {
              book.publisher ? (
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
              ) : null
            }
            
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

              <Button size="small" variant="contained" color="primary" className={utilClasses.ml1}>
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
                        className={utilClasses.ml1}
                      />
                    )
                  })
                }
              </Typography>
              <Typography>
                Year: {book.published ? moment(book.published).year() : '(Not specified)'}
              </Typography>
              <Typography>
                Number of pages: {book.pages || '(Not specified)'}
              </Typography>
            </Grid>

            <Grid item>
              <Typography>
                Publisher: {book.publisher || '(Not specified)'}
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

    if (error) {
      return (
        <Typography color="error">
          There was an issue fetching the book details, please try again.
        </Typography>
      );
    }

    // else
    return (
      <Grid container direction="column" justify="center" item>
        <Grid item xs={9} sm={5} md={4} lg={3}>
          <img
            src={notFoundIllustration}
            className={utilClasses.imgResponsive}
            alt=""
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color="textSecondary">
            Sorry, we cannot find the book you're looking for.
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <MainLayout>
      <DocumentTitle title={pageTitle} />

      <Grid container spacing={5}>
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

        {
          books && books.length > 0 ? (
            <Grid item xs={12} className={classes.carouselContainer}>
              <Typography variant="h6" gutterBottom>
                Other books you may like
              </Typography>
              <ReactAliceCarousel
                mouseTrackingEnabled
                buttonsDisabled
                autoPlay
                autoPlayInterval={3000}
                responsive={{
                  0: { items: 1 },
                  600: { items: 2 },
                  1024: { items: 3 }
                }}
                items={
                  books.map((item, index) => {
                    return (
                      <Grid item key={`book_${index}`} className={classes.bookCardContainer}>
                        <Card>
                          <CardActionArea component={RouterLink} to={replaceUrlParam(NAV_ROUTES.BOOK, item.isbn13)}>
                              <CardMedia
                                className={classes.media}
                                image={item.image || bookCoverPlaceholder}
                                title={item.title}
                              />
                              <CardContent className={utilClasses.textCenter}>
                                <Typography gutterBottom variant="h6" className={classes.bookTitle}>
                                  {item.title}
                                </Typography>
                              </CardContent>
                              <Divider/>
                              <CardContent className={utilClasses.textCenter}>
                                <Rating name="rating" value={item.rating} readOnly />
                              </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    )
                  })
                }
              />
            </Grid>
          ) : null
        }
       </Grid>
    </MainLayout>
  );
};

export default BookScreen;
