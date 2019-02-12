import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IProps {
    open: boolean,
    handleCancel: any,
    handleProceed: any,
    entity: string,
    displayText: string
}

class ToggleAlert extends React.Component<IProps> {

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.displayText + this.props.entity + "?"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.props.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.handleProceed} color="primary" autoFocus>
              Proceed
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ToggleAlert;