// Core imports
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Material component imports
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

// Custom component imports
import FullPageSpinner from '../../UI/FullPageSpinner';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';

// Misc imports
import { NAV_ROUTES } from '../../../constants';
import { IsDesktopScreenSize } from '../../../utils/platform';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(22),
      marginRight: theme.spacing(22),
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(7),

      [theme.breakpoints.down('md')]: {
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(7)
      },

      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
      }
    },
    content: {
      paddingTop: 84 // Header height
    },
    fab: {
      position: 'fixed',
      bottom: 22,
      right: 22
    }
  })
);

const MainLayout = ({ loading, children }) => {
  const classes = useStyles();
  const isDesktop = IsDesktopScreenSize();
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? false : openSidebar;

  return (
    <Box>
      <Topbar hasMenu={true} onSidebarOpen={handleSidebarOpen} />

      <Sidebar
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          variant={isDesktop ? 'persistent' : 'temporary'}
        />

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

      <Tooltip title="Add new book" aria-label="add">
        <Fab 
          color="primary" 
          aria-label="add" 
          className={classes.fab} 
          component={RouterLink}
          to={NAV_ROUTES.BOOK_CREATE}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default MainLayout;
