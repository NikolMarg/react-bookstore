// Core imports
import React from 'react';

// Material component imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Custom component imports
import DocumentTitle from '../../components/UI/DocumentTitle/DocumentTitle';
import MainLayout from '../../components/Layout/MainLayout/MainLayout';

const HomeScreen = () => {
  return (
    <MainLayout>
      <DocumentTitle title="Home" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Home
          </Typography>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default HomeScreen;
