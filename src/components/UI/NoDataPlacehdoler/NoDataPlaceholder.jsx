import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import KitchenIcon from '@material-ui/icons/Kitchen';

const NoDataPlaceholder = () => {
  return (
    <Fragment>
      <KitchenIcon fontSize="large" />
      <Typography>No data here</Typography>
    </Fragment>
  );
};

export default NoDataPlaceholder;
