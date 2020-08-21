import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useUtilStyles = makeStyles((theme) =>
  createStyles({
    // Padding utils
    px4: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    py2: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    },
    p4: {
      padding: theme.spacing(4)
    },

    // Margin utils
    mt3: {
      marginTop: theme.spacing(3)
    },
    ml1: {
      marginLeft: theme.spacing(1)
    },

    // Text utils
    textCenter: {
      textAlign: 'center'
    },

    // Image utils
    imgResponsive: {
      maxWidth: '100%',
      height: 'auto'
    }
  })
);