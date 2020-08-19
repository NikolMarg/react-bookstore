// Core imports
import React, { Fragment } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

// Material component imports
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { Search, HomeRounded } from "@material-ui/icons";

// Misc imports
import logo from '../../../assets/logo_primary.svg';
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
    list: {
      fontSize: "14px",
      margin: 0,
      paddingLeft: "0",
      listStyle: "none",
      paddingTop: "0",
      paddingBottom: "0",
      color: "inherit"
    },
    listItem: {
      float: "left",
      color: "inherit",
      position: "relative",
      display: "block",
      width: "auto",
      margin: "0",
      padding: "0",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        "&:after": {
          width: "calc(100% - 30px)",
          content: '""',
          display: "block",
          height: "1px",
          marginLeft: "15px",
          backgroundColor: "#e5e5e5"
        }
      }
    },
    navLink: {
      color: "inherit",
      padding: "0.9375rem",
      fontWeight: "400",
      fontSize: "12px",
      margin: theme.spacing(1),
      borderRadius: 6,
      boxShadow: 'none',
      "&:hover,&:focus": {
        color: "inherit",
        background: theme.palette.grey[100],
        boxShadow: 'none'
      },
      [theme.breakpoints.down("sm")]: {
        width: "calc(100% - 30px)",
        marginLeft: "15px",
        marginBottom: "8px",
        marginTop: "8px",
        textAlign: "left",
        "& > span:first-child": {
          justifyContent: "flex-start"
        }
      }
    },
    navLinkActive: {
      color: "inherit",
      backgroundColor: theme.palette.grey[100]
    },
    icons: {
      width: 18,
      height: 18,
      marginRight: 6
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
    <AppBar color="inherit" position="fixed">
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

              <div className={classes.grow} />

              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Button
                    color="transparent"
                    component={RouterLink}
                    to={NAV_ROUTES.ROOT}
                    className={classes.navLink}
                  >
                    <HomeRounded className={classes.icons} /> Home
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    color="transparent"
                    component={RouterLink}
                    to={NAV_ROUTES.SEARCH}
                    className={classes.navLink}
                  >
                    <Search className={classes.icons} /> Search
                  </Button>
                </ListItem>
              </List>
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
