/**
 * A helper for managing and using notistack snackbars from anywhere in our code.
 *
 * For the full notistack documentation refer to https://iamhosseindhv.com/notistack/api
 * For a live demo and examples go to https://iamhosseindhv.com/notistack/demos
 *
 * @example
 *
 * To show a simple success message
 * SnackbarManager.success("Succeeded successfully!");
 *
 * To show an error message, and also on the bottom left
 * SnackbarManager.error("That was sad...", { anchorOrigin: { vertical: 'bottom', horizontal: 'left'}});
 *
 */
import React from 'react';
import { useSnackbar } from 'notistack';

const InnerSnackbarUtilsConfigurator = (props) => {
  const { setUseSnackbarRef } = props;
  setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef;
const setUseSnackbarRef = (useSnackbarRefProp) => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = () => {
  return (
    <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
  );
};

export default {
  success(msg, options = {}) {
    this.toast(msg, { ...options, variant: 'success' });
  },
  warning(msg, options = {}) {
    this.toast(msg, { ...options, variant: 'warning' });
  },
  info(msg, options = {}) {
    this.toast(msg, { ...options, variant: 'info' });
  },
  error(msg, options = {}) {
    this.toast(msg, { ...options, variant: 'error' });
  },
  toast(msg, options = {}) {
    useSnackbarRef.enqueueSnackbar(msg, options);
  }
};
