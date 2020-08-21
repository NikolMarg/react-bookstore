// Core imports
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Material component imports
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// Custom component imports
import DocumentTitle from '../../components/UI/DocumentTitle/DocumentTitle';
import MainLayout from '../../components/Layout/MainLayout/MainLayout';

// Misc imports
import { NAV_ROUTES } from '../../constants';
import welcomeIllustration from '../../assets/welcome.png';
import { useUtilStyles } from '../../theme/styles';

const HomeScreen = () => {
  const utilClasses = useUtilStyles();

  return (
    <MainLayout>
      <DocumentTitle title="Home" />

      <Grid container spacing={4} justify="center" alignContent="center" alignItems="center">
        <Grid item xs={12} sm={5}>
          <img
            src={welcomeIllustration}
            className={utilClasses.imgResponsive}
            alt="Welcome"
          />
        </Grid>

        <Grid item xs={12} sm={7}>
          <Typography variant="h6" gutterBottom>
            Welcome to the Book Store!
          </Typography>
          <Typography variant="body1" gutterBottom>
            This is a test application written in React. The design system used is <Link href="https://material-ui.com/" target="_blank">Material UI</Link>, form handling is done with <Link href="https://formik.org/" target="_blank">Formik</Link>, form validations with <Link href="https://github.com/jquense/yup" target="_blank">Yup</Link>. Book suggestions carousel is created with <Link href="https://github.com/maxmarinich/react-alice-carousel" target="_blank">React Alice Carousel</Link>.
          </Typography>
          <Typography variant="body1">
            The logo is provided by Envato Elements and the illustrations found throughout the app are by <Link href="https://dribbble.com/Ivan_Haidutski" target="_blank">Ivan Haidutski</Link> from <Link href="https://icons8.com/" target="_blank">Icons8</Link>.
          </Typography>
          
          <Button
            color="primary"
            variant="contained"
            component={RouterLink}
            to={NAV_ROUTES.SEARCH}
            className={utilClasses.mt3}
          >
            Search for books
          </Button>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default HomeScreen;
