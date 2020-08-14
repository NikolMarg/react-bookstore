import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';
import store, { history } from './store';
import Root from './routes/Root';
import { SnackbarUtilsConfigurator } from './components/UI/SnackbarManager/SnackbarManager';
import FullPageSpinner from './components/UI/FullPageSpinner/FullPageSpinner';

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<FullPageSpinner />}>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <SnackbarProvider maxSnack={3}>
              <SnackbarUtilsConfigurator />
              <CssBaseline />
              <Root />
            </SnackbarProvider>
          </ConnectedRouter>
        </ThemeProvider>
      </Suspense>
    </Provider>
  );
}

export default App;
