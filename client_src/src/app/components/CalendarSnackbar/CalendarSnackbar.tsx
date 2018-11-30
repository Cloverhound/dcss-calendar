import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import CalendarSnackbarContent from './CalendarSnackBarContent/CalendarSnackbarContent'

interface IProps {
  handleClose: any,
  hideDuration: number,
  message: any //possible message.type values: success, error, warning, info
}

const styles = theme => createStyles({
  margin: {
    margin: theme.spacing.unit,
  },
});

class CalendarSnackbar extends React.Component<WithStyles<typeof styles> & IProps> {

  render() {
    const { classes, handleClose, message } = this.props;

    if(!message || !message.type) {
      return null
    }
   
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
              variant={message.type}
              message={message.content}
              className={classes.margin}
            />

      </Snackbar>
    )
  }
}


export default withStyles(styles)(CalendarSnackbar);