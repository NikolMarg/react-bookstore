// Core imports
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Form, Field, Formik, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import moment from "moment";

// Material component imports
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MuiTextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { TextField, SimpleFileUpload } from 'formik-material-ui';
import { Autocomplete } from 'formik-material-ui-lab';
import ClearIcon from '@material-ui/icons/Clear';

// Custom component imports
import DocumentTitle from '../../components/UI/DocumentTitle/DocumentTitle';
import FormAsyncButton from '../../components/UI/FormAsyncButton/FormAsyncButton';
import MainLayout from '../../components/Layout/MainLayout/MainLayout';

// Misc imports
import { TITLE_REGEX, DESCRIPTION_REGEX, NUMBER_REGEX, NAV_ROUTES } from '../../constants';
import { createBook } from '../../store/books/booksThunks';
import { useUtilStyles } from '../../theme/styles';
import omitEmptyStrings from '../../utils/object/omitEmptyStrings';
import convertArraysToStrings from '../../utils/object/convertArraysToStrings';
import replaceUrlParam from '../../utils/string/replaceUrlParam';
let categoriesData = require('../../data/categories.json');

const useStyles = makeStyles(theme =>
  createStyles({
    formRoot: {
      padding: theme.spacing(4)
    },
    fileInputButton: {
      '& .MuiFormControl-root': {
        display: 'none'
      }
    },
    arrayFieldContainer: {
      display: "flex",
      flexWrap: "wrap"
    },
    arrayFieldRemoveButton: {
      marginTop: 0,
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: '17px 0px 17px 12px'
    },
    arrayField: {
      marginBottom: theme.spacing(1)
    }
  })
);

const BookCreateScreen = () => {
  const classes = useStyles();
  const utilClasses = useUtilStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isSubmittingBook = useSelector((state) => state.books.isSubmitting);

  const initialValues = {
    title: '',
    description: '',
    image: null,
    categories: [],
    authors: [""],
    publisher: '',
    publishedYear: '',
    pages: '',
    rating: 3,
    isbn10: '',
    isbn13: ''
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Please enter a title.')
      .matches(
        TITLE_REGEX,
        'Please make sure you entered a valid title.'
      )
      .test('len', 'Title length can be between 10 and 120 characters.', val => val && val.length >= 10 && val.length <= 120),
    description: Yup.string()
      .required('Please enter a description.')
      .matches(
        DESCRIPTION_REGEX,
        'The description should start with a capital letter.'
      )
      .test('len', 'Description must not exceed 512 characters.', val => val && val.length <= 512),
    categories: Yup.array()
      .required('Please select at least one category.')
      .max(4, 'You can only select up to 4 categories.'),
    publishedYear: Yup.number()
      .min(1000, 'Published year must be higher than 1000.')
      .max(moment().year(), 'Published year cannot exceed the current year.'),
    pages: Yup.number()
      .min(1, 'The book must have at least 1 page.')
      .max(9999, 'The book must have under 10,000 pages.'),
    isbn10: Yup.string()
      .required('Please enter the 10-digit ID.')
      .test('len', 'ISBN-10 must be exactly 10 digits.', val => val && val.length === 10),
    isbn13: Yup.string()
      .required('Please enter the 13-digit ID.')
      .test('len', 'ISBN-13 must be exactly 13 digits.', val => val && val.length === 13)
  });

  const onSubmit = async (values) => {
    let formattedValues = {...values};

    // Convert arrays to comma-separated-strings
    formattedValues = convertArraysToStrings(formattedValues);

    // Remove any empty strings from the submitted values
    formattedValues = omitEmptyStrings(formattedValues);

    const res = await dispatch(createBook(formattedValues));
    if (res && res.isbn13) {
      history.push(replaceUrlParam(NAV_ROUTES.BOOK, res.isbn13));
    }
  };

  return (
    <MainLayout>
      <DocumentTitle title="Home" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {formikBag => {
          const { isValidating, touched, errors, values, handleChange, handleBlur, setFieldValue } = formikBag;

          return (
            <Form>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to={NAV_ROUTES.ROOT} component={RouterLink}>
                      Home
                    </Link>
                    <Typography color="textPrimary">
                      New book
                    </Typography>
                  </Breadcrumbs>
                </Grid>

                <Grid item xs={12}>
                  <Paper elevation={3}>
                    <Typography variant="h6" className={`${utilClasses.px4} ${utilClasses.py2}`}>
                      Basic Information
                    </Typography>

                    <Divider />

                    <Grid container spacing={4} className={classes.formRoot}>
                      <Grid item xs={12} md={6}>
                        <Typography>
                          Cover
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          component="label"
                          className={classes.fileInputButton}
                        >
                          Upload File
                          <Field
                            component={SimpleFileUpload}
                            name="image"
                          />
                        </Button>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography>
                          Title*
                        </Typography>
                        <Field
                          component={TextField}
                          type="text"
                          name="title"
                          variant="outlined"
                          placeholder="Enter book title"
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography>
                          Description*
                        </Typography>
                        <Field
                          component={TextField}
                          type="text"
                          name="description"
                          variant="outlined"
                          placeholder="Enter book description"
                          fullWidth
                          multiline
                          rows={4}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper elevation={3}>
                    <Typography variant="h6" className={`${utilClasses.px4} ${utilClasses.py2}`}>
                      Publisher Details
                    </Typography>

                    <Divider />

                    <Grid container spacing={4} className={classes.formRoot}>
                      <Grid item xs={12}>
                        <Typography>
                          Categories*
                        </Typography>
                        
                        <Field
                          name="categories"
                          multiple
                          component={Autocomplete}
                          options={categoriesData}
                          renderInput={(params) => (
                            <MuiTextField
                              {...params}
                              error={touched['categories'] && !!errors['categories']}
                              helperText={touched['categories'] && errors['categories']}
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>

                      <Grid container item spacing={4}>
                        <Grid item xs={12} sm={6}>
                          <Typography>
                            Publisher
                          </Typography>
                          <Field
                            component={TextField}
                            type="text"
                            name="publisher"
                            variant="outlined"
                            placeholder="Enter publisher name"
                            fullWidth
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
                            placeholder="Enter published year"
                            fullWidth
                            onChange={(event) => {
                              const value = event.target.value;
                              if (value === '' || (NUMBER_REGEX.test(value) && Number(value) <= moment().year())) {
                                setFieldValue('publishedYear', value); 
                                setFieldValue('published', moment(value).format('YYYY-MM-DDTHH:mm:ssZ'));
                              }
                            }}
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography>
                            Author Names
                          </Typography>
                          <FieldArray name="authors">
                            {({ push, remove }) => (
                              <div>
                                {values.authors.map((item, index) => {
                                  const author = `authors[${index}]`;
                                  const touchedAuthor = getIn(touched, author);
                                  const errorAuthor = getIn(errors, author);

                                  return (
                                    <div key={index}>
                                      <Field
                                        component={TextField}
                                        variant="outlined"
                                        name={author}
                                        className={classes.arrayField}
                                        value={item}
                                        placeholder="Enter author name"
                                        helperText={
                                          touchedAuthor && errorAuthor
                                            ? errorAuthor
                                            : ""
                                        }
                                        error={Boolean(touchedAuthor && errorAuthor)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                      <Button
                                        type="button"
                                        variant="outlined"
                                        onClick={() => remove(index)}
                                        className={classes.arrayFieldRemoveButton}
                                        startIcon={<ClearIcon />}
                                      />
                                    </div>
                                  );
                                })}
                                <Button
                                  type="button"
                                  variant="outlined"
                                  className={classes.arrayFieldAddButton}
                                  onClick={() => values.authors.length < 3 && push("")}
                                >
                                  Add
                                </Button>
                              </div>
                            )
                          }
                        </FieldArray>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper elevation={3}>
                    <Typography variant="h6" className={`${utilClasses.px4} ${utilClasses.py2}`}>
                      Miscellaneous
                    </Typography>

                    <Divider />

                    <Grid container spacing={4} className={classes.formRoot}>
                      <Grid item xs={12} sm={6}>
                        <Typography>
                          Pages
                        </Typography>
                        <Field
                          component={TextField}
                          type="text"
                          name="pages"
                          variant="outlined"
                          placeholder="Enter number of pages"
                          fullWidth
                          onChange={(event) => {
                            const value = event.target.value;
                            if (value === '' || NUMBER_REGEX.test(value)) {
                              setFieldValue('pages', value);
                            }
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography>
                          Rating
                        </Typography>
                        <Field name="rating" id="rating" type="number">
                          {({ field: { value }, form: { setFieldValue } }) => (
                            <Rating
                              name="inner-rating"
                              size="large"
                              value={value}
                              onChange={(_event, newValue) => {
                                setFieldValue('rating', newValue);
                              }}
                            />
                          )}
                        </Field>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography>
                          ISBN-10*
                        </Typography>
                        <Field
                          component={TextField}
                          type="text"
                          name="isbn10"
                          variant="outlined"
                          placeholder="Enter book's 10-digit ID"
                          fullWidth
                          onChange={(event) => {
                            const value = event.target.value;
                            if (value === '' || NUMBER_REGEX.test(value)) {
                              setFieldValue('isbn10', value);
                            }
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography>
                          ISBN-13*
                        </Typography>
                        <Field
                          component={TextField}
                          type="text"
                          name="isbn13"
                          variant="outlined"
                          placeholder="Enter book's 13-digit ID"
                          fullWidth
                          onChange={(event) => {
                            const value = event.target.value;
                            if (value === '' || NUMBER_REGEX.test(value)) {
                              setFieldValue('isbn13', value);
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                    
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                    <FormAsyncButton
                      text="Create book"
                      isInProgressMode={isValidating || isSubmittingBook}
                      disabled={isValidating || isSubmittingBook}
                    />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      
    </MainLayout>
  );
};

export default BookCreateScreen;
