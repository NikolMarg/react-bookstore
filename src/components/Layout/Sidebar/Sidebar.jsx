// Core imports
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { makeStyles, createStyles, fade } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

// Material component imports
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchIcon from '@material-ui/icons/Search';

// Misc imports
import { NAV_ROUTES } from '../../../constants';

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      width: 256,
      [theme.breakpoints.up('md')]: {
        marginTop: 64,
        height: 'calc(100% - 64px)'
      }
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: theme.spacing(2)
    },
    item: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.common.white
      }
    },
    button: {
      color: grey[700],
      padding: '10px 8px',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.primary.light, 0.25)
      }
    },
    icon: {
      color: grey[700],
      width: 24,
      height: 24,
      marginRight: theme.spacing(3)
    },
    active: {
      color: theme.palette.primary.main,
      backgroundColor: fade(theme.palette.primary.light, 0.15),
      fontWeight: theme.typography.fontWeightMedium,
      '& $icon': {
        color: theme.palette.primary.main
      }
    },
    grow: {
      flexGrow: 1
    },
    buttonRipple: {
      color: theme.palette.primary.main
    }
  })
);

const allPages = [
  {
    titleKey: 'Home',
    href: NAV_ROUTES.ROOT,
    icon: <HomeRoundedIcon />
  },
  {
    titleKey: 'Search',
    href: NAV_ROUTES.SEARCH,
    icon: <SearchIcon />,
  }
];

const Sidebar = ({ open, variant, onClose, className }) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className={`${classes.root} ${className}`}>
        <List>
          {allPages.map((page) => (
            <ListItem
              button
              disableGutters
              href={page.href}
              key={page.titleKey}
              className={classes.item}
            >
              <Button
                className={classes.button}
                activeClassName={classes.active}
                TouchRippleProps={{ classes: { ripple: classes.buttonRipple } }}
                component={forwardRef((props, ref) => (
                  <div ref={ref} className={classes.grow}>
                    <RouterLink {...props} />
                  </div>
                ))}
                to={page.href}
              >
                <div className={classes.icon}>{page.icon}</div>
                  {page.titleKey}
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
