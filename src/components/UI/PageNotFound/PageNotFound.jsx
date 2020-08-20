// Core imports
import React from 'react';

// Material component imports
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Misc imports
import notFoundIllustration from '../../../assets/404.png';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: 'center'
    },
    notFoundIllustration: {
      width: 400
    }
  })
);

const PageNotFound = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <img
        src={notFoundIllustration}
        className={classes.notFoundIllustration}
        alt=""
      />
      <Typography variant="h1">404</Typography>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography>
        The page you are looking for was moved, removed, renamed, or might have never existed.
      </Typography>
    </Box>
  );
};

export default PageNotFound;
