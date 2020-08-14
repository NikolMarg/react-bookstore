// Core imports
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Material component imports
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Custom component imports
import DocumentTitle from '../../components/UI/DocumentTitle/DocumentTitle';
import MainLayout from '../../components/Layout/MainLayout/MainLayout';
import { NAV_ROUTES } from '../../constants';

const HomeScreen = () => {
  return (
    <MainLayout>
      <DocumentTitle title="Home" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Home
          </Typography>
          <Button
                color="primary"
                variant="contained"
                component={RouterLink}
                to={NAV_ROUTES.SEARCH}
              >
                Find your ideal book
              </Button>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default HomeScreen;
