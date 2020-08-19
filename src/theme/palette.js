import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const white = '#FFFFFF';
const black = '#000000';
const primary = '#000000';
const secondary = '#47b881'

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: '#333333',
    main: primary,
    light: '#757DE8'
  },
  secondary: {
    contrastText: white,
    dark: '#008754',
    main: secondary,
    light: '#7cebb1'
  },
  success: {
    contrastText: white,
    dark: green[900],
    main: green[600],
    light: green[400]
  },
  info: {
    contrastText: white,
    dark: blue[900],
    main: blue[600],
    light: blue[400]
  },
  warning: {
    contrastText: white,
    dark: orange[900],
    main: orange[600],
    light: orange[400]
  },
  error: {
    contrastText: white,
    dark: red[900],
    main: red[600],
    light: red[400]
  },
  text: {
    primary: grey[700],
    secondary: grey[500],
    link: blue[600]
  },
  background: {
    default: '#F9FAFB',
    paper: white
  }
};
