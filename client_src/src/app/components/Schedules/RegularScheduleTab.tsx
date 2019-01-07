import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RecurringTimeRange from './RecurringTimeRange';
import CircularProgress from '@material-ui/core/CircularProgress';
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar';

import { connect } from 'react-redux';
import { addRecurringTimeRange, submitUpdateScheduleToServer, submitNewScheduleToServer, changeScheduleName, getScheduleFromServer, handleCloseMessage } from '../../actions'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const styles = theme => createStyles({
  form: {
    width: "50%",
    margin: "auto"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 200,
  },
  selectContainer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
  addIconContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submitCancelContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '50px',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    width: 200,
  }
});

interface IProps {
  scheduleReducer: any,
  addRecurringTimeRange: any,
  submitUpdateScheduleToServer: any,
  submitNewScheduleToServer: any,
  changeScheduleName: any,
  getScheduleFromServer: any,
  match: any,
  handleCloseMessage: any,
  newOrUpdate: string
}


class RegularScheduleTab extends React.Component<WithStyles<typeof styles> & IProps> {
 
  handleNameInput = event => {
    const { changeScheduleName } = this.props;
    changeScheduleName({ name: event.target.value })
  };

  handleAddRecurringTimeRange = () => {
    const { addRecurringTimeRange } = this.props
    addRecurringTimeRange()
  }

  handleFormSubmit = () => {
    const { scheduleReducer } = this.props;
    if(this.props.newOrUpdate == 'new') {
      this.props.submitNewScheduleToServer(scheduleReducer)
    }
    else if(this.props.newOrUpdate == "update") {
      this.props.submitUpdateScheduleToServer(scheduleReducer)
    } else {
      console.log('NewOrUpdate prop is not recognized')
    }   
  }

  handleCloseMessage = () => {
    const { handleCloseMessage } = this.props
    handleCloseMessage()
  }

  render() {
    const { classes, scheduleReducer } = this.props;
    const {recurringTimeRanges, loading, message } = scheduleReducer
    
    let timeRangesComponent = []
    
    if( recurringTimeRanges && recurringTimeRanges.length > 0) {
      timeRangesComponent = recurringTimeRanges.map((timeRange) => {
        return <RecurringTimeRange 
          index={timeRange.index}
          start={timeRange.start}
          end={timeRange.end}
          mon_checked={timeRange.mon}
          tue_checked={timeRange.tue}
          wed_checked={timeRange.wed}
          thu_checked={timeRange.thu}
          fri_checked={timeRange.fri}
          sat_checked={timeRange.sat}
          sun_checked={timeRange.sun}
        />
      })
    }

    return (
      <form style={{ width: "50%", margin: "auto" }}>
        <CalendarSnackbar
          handleClose={this.handleCloseMessage}
          hideDuration={6000}
          message={message}
        />

        <FormControl className={classes.formControl}>
          <Input
            value={this.props.scheduleReducer.name}
            className={classes.textField}
            onChange={this.handleNameInput}
            name="newScheduleName"
            placeholder="Edit Name"
            autoFocus={true}
          />
        </FormControl>

        <div className={classes.selectContainer}>
          {timeRangesComponent}
        </div>

        <div className={classes.submitCancelContainer} style={{ width: "100%", display: "inline-block" }}>
          <div className={classes.addIconContainer}>
            <Button style={{ float: "right" }} onClick={this.handleAddRecurringTimeRange} variant="fab" color="secondary" aria-label="Add" className={classes.button}>
              <AddIcon />
            </Button>
          </div>
          <div>
            {loading ? <CircularProgress className={classes.progress} /> : null}
            <div className={classes.submitCancelContainer}>
              <Button onClick={this.handleFormSubmit} variant="contained" color="primary" className={classes.button} style={{ width: "90px" }} disabled={loading}>
                Save
              </Button>
              <Link to="/schedules">
                <Button variant="outlined" color="primary" className={classes.button}>
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>     
    )
  }
}

const mapStateToProps = state => {
  return {
    scheduleReducer: state.scheduleReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addRecurringTimeRange: () => (dispatch(addRecurringTimeRange())),
  submitUpdateScheduleToServer: (obj) => (dispatch(submitUpdateScheduleToServer({obj, history: ownProps.history}))),
  submitNewScheduleToServer: (obj) => (dispatch(submitNewScheduleToServer({obj, history: ownProps.history}))),
  changeScheduleName: (obj) => (dispatch(changeScheduleName(obj))),
  handleCloseMessage: () => (dispatch(handleCloseMessage()))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(RegularScheduleTab));