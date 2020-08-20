// Core imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useHistory } from 'react-router-dom';
import { Form, Field, Formik } from 'formik';
import moment from "moment";

// Material component imports
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiTextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TextField } from 'formik-material-ui';
import { Autocomplete } from 'formik-material-ui-lab';

// Custom component imports
import DocumentTitle from '../../components/UI/DocumentTitle/DocumentTitle';
import MainLayout from '../../components/Layout/MainLayout/MainLayout';

// Misc imports
import { getBooks } from '../../store/books/booksThunks';
import { Breadcrumbs, Link, CircularProgress, Card, CardMedia, CardActionArea, CardContent, Paper, Accordion, AccordionSummary, AccordionDetails, Divider } from '@material-ui/core';
import { NAV_ROUTES, NUMBER_REGEX } from '../../constants';
import replaceUrlParam from '../../utils/string/replaceUrlParam';
import DEFAULT_BOOK_COVER from '../../assets/book_placeholder.png'
import { useUtilStyles } from '../../theme/styles';
import { categoriesData } from '../../data/categories';
import is from '../../utils/is';
import Rating from '@material-ui/lab/Rating';

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
    categories: urlParams.get('categories') ? urlParams.get('categories').split(',') : []
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
        <CircularProgress size={24} />
      );
    }

    if (books && books.length > 0) {

      // Apply existing filters to books
      let filteredBooks = [...books];
      if (filters.title) {
        filteredBooks = filteredBooks.filter((item) => item.title.toLowerCase().includes(filters.title.toLowerCase()));
      }
      if (filters.publisher) {
        filteredBooks = filteredBooks.filter((item) => item.publisher.toLowerCase().includes(filters.publisher.toLowerCase()));
      }
      if (filters.publishedYear) {
        filteredBooks = filteredBooks.filter((item) => moment(item.published).year().toString() === filters.publishedYear);
      }
      if (filters.categories && is.not.emptyArray(filters.categories)) {
        filteredBooks = filteredBooks.filter((book) => {
          // Matching books should include all category filters
          return filters.categories.every(bookCategory => {
            return book.categories.split(',').includes(bookCategory);
          });
        });
      }
      
      return (
          <Grid container spacing={3} item>
            {
              filteredBooks.map(item => {
                return (
                  <Grid item sm={4} key={item.isbn13}>
                    <Card>
                      <CardActionArea component={RouterLink} to={replaceUrlParam(NAV_ROUTES.BOOK, item.isbn13)}>
                        {/* <Link to={replaceUrlParam(NAV_ROUTES.BOOK, item.isbn13)} component={RouterLink}> */}
                          <CardMedia
                            className={classes.media}
                            image={item.image || DEFAULT_BOOK_COVER}
                            title={item.title}
                          />
                          <CardContent className={utilClasses.textCenter}>
                            <Typography gutterBottom variant="h6" className={classes.bookTitle}>
                              {item.title}
                            </Typography>
                            {/* <Typography variant="body2" color="textSecondary" component="p">
                              {`${item.description.substring(0, 80)}...`}
                            </Typography> */}
                          </CardContent>
                          <Divider/>
                          <CardContent className={utilClasses.textCenter}>
                            <Rating name="rating" value={item.rating} readOnly />
                          </CardContent>
                        {/* </Link> */}
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
          <Paper elevation={3} className={utilClasses.p4}>
            <Formik
              initialValues={initialFilters}
              onSubmit={() => {}}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {formikBag => {
                const { isValidating, touched, errors, values, handleChange, handleBlur, setFieldValue } = formikBag;

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

                    <Accordion className={utilClasses.mt3}>
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
                                if (value === '' || NUMBER_REGEX.test(value))
                                setFieldValue('publishedYear', value);
                                setFiltersAndParams({
                                  ...filters,
                                  publishedYear: value
                                });
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
