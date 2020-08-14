import { makeStyles, createStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const useHeaderStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: grey[200],
      padding: theme.spacing(2),
      marginBottom: theme.spacing(4)
    },
    text: {
      textAlign: 'center',
      fontWeight: theme.typography.fontWeightBold,
      fontSize: 32
    }
  })
);

export const useFormStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 6),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2, 3)
      },
      alignItems: 'center',
      '& .MuiGrid-root': {
        padding: theme.spacing(3, 1),
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(2, 1)
        }
      }
    },
    cardActions: {
      padding: theme.spacing(3)
    }
  })
);

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

export const useTableStyles = makeStyles((theme) =>
  createStyles({
    container: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: grey[300]
    },
    root: {
      width: '100%',
      overflowX: 'auto'
    },
    table: {
      fontSize: 14
    },
    nameCell: {
      display: 'flex',
      alignItems: 'center'
    },
    bookName: {
      paddingLeft: theme.spacing(2),
      fontWeight: 'bold',
      fontSize: 14
    },
    bookTableFields: {
      fontSize: 14
    },
    avatarPrimary: {
      color: theme.palette.background.paper,
      backgroundColor: theme.palette.primary.main
    },
    disabledAvatar: {
      backgroundColor: theme.palette.grey[400]
    },
    tableRow: {
      '&:hover': {
        backgroundColor: '#F6F9FD',
        cursor: 'pointer'
      },
      '&:hover .check-box-container': {
        visibility: 'visible'
      }
    },
    toolbar: {
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      marginRight: theme.spacing(2)
    },
    disabledRow: {
      color: theme.palette.grey[400]
    },
    checkBoxCell: {
      paddingLeft: '0!important',
      paddingRight: '0!important'
    },
    nameCellSelectable: {
      paddingLeft: '0!important'
    },
    invisibleCheckbox: {
      visibility: 'hidden'
    }
  })
);

export const useButtonStyles = makeStyles((theme) =>
  createStyles({
    dangerButton: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText
    },
    greyButton: {
      backgroundColor: theme.palette.grey[700],
      color: theme.palette.common.white
    }
  })
);