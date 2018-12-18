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
import { addRecurringTimeRange, submitUpdateScheduleToServer, changeScheduleName, getScheduleFromServer, handleCloseMessage } from '../../actions'
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
    margin: theme.spacing.unit,
  },
  addIconContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submitCancelContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  progress: {
    margin: theme.spacing.unit * 2,
  }
});

interface IProps {
  scheduleReducer: any,
  addRecurringTimeRange: any,
  requestScheduleEdit: any,
  changeScheduleName: any,
  getScheduleFromServer: any,
  match: any,
  handleCloseMessage: any
}


class RegularEditScheduleTab extends React.Component<WithStyles<typeof styles> & IProps> {
 
  handleNameInput = event => {
    const { changeScheduleName } = this.props;
    changeScheduleName({ name: event.target.value })
  };

  handleAddScheduleSelect = () => {
    const { addRecurringTimeRange } = this.props
    addRecurringTimeRange()
  }

  handleFormSubmit = () => {
    const { requestScheduleEdit, scheduleReducer } = this.props;
    requestScheduleEdit(scheduleReducer)
  }

  componentWillMount () {
    const { id } = this.props.match.params
    const { getScheduleFromServer } = this.props;
    getScheduleFromServer({id})
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
          end={timeRange.start}
          mon_checked={timeRange.week.mon.checked}
          tue_checked={timeRange.week.tues.checked}
          wed_checked={timeRange.week.weds.checked}
          thu_checked={timeRange.week.thurs.checked}
          fri_checked={timeRange.week.fri.checked}
          say_checked={timeRange.week.sat.checked}
          sun_checked={timeRange.week.sun.checked}
        />
      })
    }

    return (
        <form style={{width: "50%", margin: "auto"}}>

            <CalendarSnackbar
                  handleClose = {this.handleCloseMessage}
                  hideDuration = {6000}
                  message = {message} 
                />

            <FormControl className={classes.formControl}>
            <Input
                value={this.props.scheduleReducer.name}
                onChange={this.handleNameInput}
                name="newScheduleName"
                placeholder="Edit Name"
                autoFocus={true}
            />
            </FormControl>

            <div className={classes.selectContainer}>
              {timeRangesComponent}
            </div>

            <div className={classes.submitCancelContainer} style={{width: "100%", display: "inline-block"}}>
            <div className={classes.addIconContainer}>
                <Button style={{float: "right"}} onClick={this.handleAddScheduleSelect} variant="fab" color="secondary" aria-label="Add" className={classes.button}>
                <AddIcon />
                </Button>
            </div>
            <div>
                {loading ? <CircularProgress className={classes.progress} /> : null}
                <div style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "100%"}}>
                    <Link to="/schedules">
                    <Button onClick={this.handleFormSubmit} variant="contained" color="primary" className={classes.button} style={{width: "90px"}} disabled={loading}>
                        Save
                    </Button>
                    </Link>
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
  submitUpdateScheduleToserver: (obj) => (dispatch(submitUpdateScheduleToServer(obj))),
  changeScheduleName: (obj) => (dispatch(changeScheduleName(obj))),
  getScheduleFromServer: (obj) => (dispatch(getScheduleFromServer(obj))),
  handleCloseMessage: () => (dispatch(handleCloseMessage()))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(RegularEditScheduleTab));