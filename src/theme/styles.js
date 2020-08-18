import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useUtilStyles = makeStyles((theme) =>
  createStyles({
    // Padding utils
    pt0: {
      paddingTop: '0!important'
    },
    pb0: {
      paddingBottom: '0!important'
    },
    pl0: {
      paddingLeft: '0!important'
    },
    pr0: {
      paddingRight: '0!important'
    },
    px0: {
      paddingLeft: '0!important',
      paddingRight: '0!important'
    },
    px4: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    py2: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    },
    py0: {
      paddingTop: '0!important',
      paddingBottom: '0!important'
    },
    p0: {
      padding: '0!important'
    },

    // Margin utils
    mlAuto: {
      marginLeft: 'auto'
    },
    mxAuto: {
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    mt2: {
      marginTop: theme.spacing(2)
    },
    ml1: {
      marginLeft: theme.spacing(1)
    },
    ml2: {
      marginLeft: theme.spacing(2)
    },
    mr1: {
      marginRight: theme.spacing(1)
    },
    mr4: {
      marginRight: theme.spacing(4)
    },
    mb0: {
      marginBottom: 0
    },
    mb2: {
      marginBottom: theme.spacing(2)
    },
    mb4: {
      marginBottom: theme.spacing(4)
    },

    // Text utils
    textCenter: {
      textAlign: 'center'
    },
    textWarning: {
      color: theme.palette.warning.main
    },
    textSuccess: {
      color: theme.palette.success.main
    },
    textTransformNone: {
      textTransform: 'none'
    },
    wordBreakBreakWord: {
      wordBreak: 'break-word'
    },

    // Display utils
    displayInline: {
      display: 'inline'
    }
  })
);