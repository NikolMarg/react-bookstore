// Core imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useHistory } from 'react-router-dom';
import { Form, Field, Formik } from 'formik';
import moment from "moment";

// Material component imports
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MuiTextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TextField } from 'formik-material-ui';
import { Autocomplete } from 'formik-material-ui-lab';

// Custom component imports
import DocumentTitle from '../../components/UI/DocumentTitle/DocumentTitle';
import MainLayout from '../../components/Layout/MainLayout/MainLayout';

// Misc imports
import { getBooks } from '../../store/books/booksThunks';
import { NAV_ROUTES, NUMBER_REGEX } from '../../constants';
import bookCoverPlaceholder from '../../assets/book_placeholder.png'
import { useUtilStyles } from '../../theme/styles';
import replaceUrlParam from '../../utils/string/replaceUrlParam';
import is from '../../utils/is';
let categoriesData = require('../../data/categories.json');

const useStyles = makeStyles((theme) =>
  createStyles({
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
    filterAccordion: {
      '&::before': {
        height: 0
      }
    }
  })
);

const BooksScreen = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const utilClasses = useUtilStyles();
  const location = useLocation();
  const history = useHistory();
  const urlParams = new URLSearchParams(location.search);

  const { books, isFetching, error } = useSelector((state) => state.books);

  const initialFilters = {
    title: urlParams.get('title') || '',
    categories: urlParams.get('categories') ? urlParams.get('categories').split(',') : [],
    publishedYear: '',
    publisher: ''
  };

  const [filters, setFilters] = useState(initialFilters);

  // On mount
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const setFiltersAndParams = (newFilters) => {
    const params = new URLSearchParams(location.search);

    // Set up URL params
    Object.keys(newFilters).forEach(key => {
      if (is.nullish(newFilters[key]) || is.emptyArray(newFilters[key]) || is.emptyObject(newFilters[key])) {
        return;
      } else {
        params.set(key, newFilters[key]);
      }      
    })

    // TODO: Remove keys for empty params

    // Apply the URL params
    history.replace({
      search: params.toString()
    });

    setFilters(newFilters);
  }

  const renderBooksList = () => {
    if (isFetching) {
      return (
        <Grid container justify="center" item>
          <Grid item>
            <CircularProgress size={32} />
          </Grid>
        </Grid>
      );
    }

    if (books && books.length > 0) {
      // Apply existing filters to books
      let filteredBooks = [...books];
      if (filters.title) {
        filteredBooks = filteredBooks.filter((item) => item.title.toLowerCase().includes(filters.title.toLowerCase()));
      }
      if (filters.publisher) {
        filteredBooks = filteredBooks.filter((item) => item.publisher && item.publisher.toLowerCase().includes(filters.publisher.toLowerCase()));
      }
      if (filters.publishedYear) {
        filteredBooks = filteredBooks.filter((item) => item.published && moment(item.published.toString()).year().toString() === filters.publishedYear);
      }
      if (filters.categories && is.not.emptyArray(filters.categories)) {
        filteredBooks = filteredBooks.filter((book) => {
          // Matching books should include all category filters
          return filters.categories.every(bookCategory => {
            return book.categories.split(',').includes(bookCategory);
          });
        });
      }
      
      return filteredBooks.length > 0 ? (
          <Grid container spacing={3} item>
            {
              filteredBooks.map((item, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={`book_${index}`}>
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
          </Grid>
      ) : (
        <Typography color="textSecondary">
          No books were found for the given filters. Please try a different search.
        </Typography>
      );
    }

    if (error) {
      return (
        <Typography color="error">
          There was an issue fetching books, please try again.
        </Typography>
      );
    }

    // else
    return (
      <Typography color="textSecondary">
        No books were found.
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
          <Paper elevation={3} className={utilClasses.p4}>
            <Formik
              initialValues={initialFilters}
              onSubmit={() => {}}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {formikBag => {
                const { touched, errors, setFieldValue } = formikBag;

                return (
                  <Form>
                    <Typography variant="h6">
                      Search to find your new book
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                    </Typography>

                    <Field
                      component={TextField}
                      type="text"
                      name="title"
                      variant="outlined" 
                      fullWidth 
                      placeholder="Search for book title..."
                      margin="dense"
                      onChange={(event) => {
                        const value = event.target.value;
                        setFieldValue('title', value);
                        setFiltersAndParams({
                          ...filters,
                          title: value
                        });
                      }}
                    />

                    <Accordion className={`${utilClasses.mt3} ${classes.filterAccordion}`}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography>
                          Filters
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={4}>
                          <Grid item xs={12}>
                            <Typography>
                              Categories
                            </Typography>
                            <Field
                              name="categories"
                              multiple
                              component={Autocomplete}
                              autoHighlight
                              options={categoriesData}
                              onChange={(_event, newValue) => {
                                setFieldValue('categories', newValue);
                                setFiltersAndParams({
                                  ...filters,
                                  categories: newValue
                                });
                              }}
                              renderInput={(params) => (
                                <MuiTextField
                                  {...params}
                                  error={touched['categories'] && !!errors['categories']}
                                  helperText={touched['categories'] && errors['categories']}
                                  variant="outlined"
                                  margin="dense"
                                />
                              )}
                            />
                          </Grid>
                        
                          <Grid item xs={12} sm={6}>
                            <Typography>
                              Publisher
                            </Typography>
                            <Field
                              component={TextField}
                              type="text"
                              name="publisher"
                              variant="outlined" 
                              fullWidth 
                              placeholder="Search for publisher"
                              margin="dense"
                              onChange={(event) => {
                                const value = event.target.value;
                                setFieldValue('publisher', value);
                                setFiltersAndParams({
                                  ...filters,
                                  publisher: value
                                });
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Typography>
                              Year Published
                            </Typography>
                            <Field
                              component={TextField}
                              type="text"
                              name="publishedYear"
                              variant="outlined"
                              placeholder="Search for published year"
                              fullWidth
                              margin="dense"
                              onChange={(event) => {
                                const value = event.target.value;
                                if (value === '' || (NUMBER_REGEX.test(value) && Number(value) <= moment().year())) {
                                  setFieldValue('publishedYear', value);
                                  setFiltersAndParams({
                                    ...filters,
                                    publishedYear: value
                                  });
                                }
                              }}
                            />
                          </Grid>
                        
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Form>
                );
              }}
            </Formik>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          {renderBooksList()}
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default BooksScreen;
