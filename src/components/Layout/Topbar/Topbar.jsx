import React, { Fragment } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';

import logo from '../../../assets/logo.svg';
import { NAV_ROUTES } from '../../../constants';

const useStyles = makeStyles((theme) =>
  createStyles({
    appLogo: {
      width: 188,
      verticalAlign: 'text-top'
    },
    grow: {
      flexGrow: 1
    },
    fab: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(24),
      [theme.breakpoints.down('md')]: {
        marginLeft: theme.spacing(1)
      }
    },
    buttonIcon: {
      marginRight: theme.spacing(1)
    },
    userBlock: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    username: {
      marginLeft: theme.spacing(2)
    },
    progressBar: {
      color: theme.palette.common.white,
      fill: theme.palette.common.white
    },
    flex: {
      display: 'flex'
    },
    avatar: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.paper
    },
    textSkeleton: {
      height: 24,
      width: 100,
      marginLeft: theme.spacing(2),
      flex: 'auto'
    },
    skeletonWhite: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    popover: {
      pointerEvents: 'none',
      zIndex: 10000
    },
    popoverPaper: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.palette.success.main
    },
    arrow: {
      '&:before': {
        content: '""',
        display: 'block',
        width: 0,
        height: 0,
        position: 'absolute',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid white',
        left: 16,
        top: -9
      }
    }
  })
);

const Topbar = ({ hasMenu = true, onSidebarOpen }) => {
  const classes = useStyles();

  const renderLogo = () => (
    <RouterLink to={NAV_ROUTES.ROOT}>
      <img src={logo} className={classes.appLogo} alt="logo" />
    </RouterLink>
  );

  return (
    <AppBar color="primary" position="fixed">
      <Toolbar>
        {hasMenu ? (
          <Fragment>
            {/* Mobile only */}
            <Hidden mdUp>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <IconButton color="inherit" onClick={onSidebarOpen}>
                    <MenuIcon />
                  </IconButton>
                </Grid>
                {renderLogo()}
              </Grid>
            </Hidden>

            {/* Web only */}
            <Hidden smDown>
              {renderLogo()}
            </Hidden>
          </Fragment>
        ) : (
            renderLogo()
          )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
