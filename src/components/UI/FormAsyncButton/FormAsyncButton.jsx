import React from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const FormAsyncButton = ({
  text,
  isInProgressMode = false,
  disabled,
  size,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={disabled}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      {...props}
    >
      {isInProgressMode ? (
        <CircularProgress
          color="inherit"
          size={24}
          data-testid="async-button-progress"
        />
      ) : (
        text
      )}
    </Button>
  );
};

export default FormAsyncButton;
