import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import CalendarSnackbarContent from './CalendarSnackbarContent'

interface IProps {
  handleClose: any,
  hideDuration: number,
  content: string
  variant: string //possible values: success, error, warning, info
}

const styles = theme => createStyles({
  margin: {
    margin: theme.spacing.unit,
  },
});

class CalendarSnackbar extends React.Component<WithStyles<typeof styles> & IProps> {

  render() {
    const { classes, variant, handleClose, content } = this.props;
    return (
      <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            autoHideDuration={this.props.hideDuration}
            onClose={this.props.handleClose}
            open = {true}
          >
            <CalendarSnackbarContent
              onClose={handleClose}
              variant={variant}
              message={content}
              className={classes.margin}
            />

      </Snackbar>
    )
  }
}


export default withStyles(styles)(CalendarSnackbar);