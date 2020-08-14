import React from 'react';
import Grid from '@material-ui/core/Grid';
import { DocumentTitle, MainLayout, PageNotFound } from '../../components';

const PageNotFoundScreen = () => {
  return (
    <MainLayout>
      <DocumentTitle title="Page Not Found" />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageNotFound />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default PageNotFoundScreen;
