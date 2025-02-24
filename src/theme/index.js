import { createMuiTheme } from '@material-ui/core/styles';

import palette from './palette';
import overrides from './overrides';

const theme = createMuiTheme({
  palette,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;
