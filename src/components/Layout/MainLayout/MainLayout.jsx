import React from 'react';
import {
  makeStyles,
  createStyles
} from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { Topbar } from '../..';
import FullPageSpinner from '../../UI/FullPageSpinner';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(7),
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
      }
    },
    content: {
      paddingTop: 64 // Header height
    }
  })
);

const MainLayout = ({ loading, children }) => {
  const classes = useStyles();

  return (
    <Box>
      <Topbar hasMenu={true} />

      <Box className={classes.root}>
        <Container
          maxWidth={false}
          className={classes.content}
        >
          <Grid container justify="center" alignItems="center">
            {loading ? <FullPageSpinner /> : children}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
