import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar';
import SingleDateTimeRange from './SingleDateTimeRange';

import { connect } from 'react-redux';
import { addSingleDateTimeRange, submitUpdateScheduleToServer, submitNewScheduleToServer, changeScheduleName, getScheduleFromServer, handleCloseMessage } from '../../actions'
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
    justifyContent: 'flex-end',
    marginTop: '50px',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  }
});

interface IProps {
  scheduleReducer: any,
  addSingleDateTimeRange: any,
  submitUpdateScheduleToServer: any,
  submitNewScheduleToServer: any,
  changeScheduleName: any,
  getScheduleFromServer: any,
  match: any,
  handleCloseMessage: any,
  newOrUpdate: string
}


class RegularScheduleTab extends React.Component<WithStyles<typeof styles> & IProps> {
 

  handleAddSingleDateTimeRange = () => {
    const { addSingleDateTimeRange } = this.props
    addSingleDateTimeRange()
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
    const {singleDateTimeRanges, loading, message } = scheduleReducer
    
    let timeRangesComponent = []
    
    if( singleDateTimeRanges && singleDateTimeRanges.length > 0) {
        timeRangesComponent = singleDateTimeRanges.map((timeRange) => {
        return <SingleDateTimeRange 
          index={timeRange.index}
          start={timeRange.start}
          end={timeRange.end}
          date={timeRange.date}
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

            <div className={classes.selectContainer}>
              {timeRangesComponent}
            </div>

            <div className={classes.submitCancelContainer} style={{width: "100%", display: "inline-block"}}>
            <div className={classes.addIconContainer}>
                <Button style={{float: "right"}} onClick={this.handleAddSingleDateTimeRange} variant="fab" color="secondary" aria-label="Add" className={classes.button}>
                  <AddIcon />
                </Button>
            </div>
            <div>
                {loading ? <CircularProgress className={classes.progress} /> : null}
                <div className={classes.submitCancelContainer}>
                    <Button onClick={this.handleFormSubmit} variant="contained" color="primary" className={classes.button} style={{width: "90px"}} disabled={loading}>
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
  addSingleDateTimeRange: () => (dispatch(addSingleDateTimeRange())),
  submitUpdateScheduleToServer: (obj) => (dispatch(submitUpdateScheduleToServer({obj, history: ownProps.history}))),
  submitNewScheduleToServer: (obj) => (dispatch(submitNewScheduleToServer({obj, history: ownProps.history}))),
  changeScheduleName: (obj) => (dispatch(changeScheduleName(obj))),
  getScheduleFromServer: (obj) => (dispatch(getScheduleFromServer(obj))),
  handleCloseMessage: () => (dispatch(handleCloseMessage()))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(RegularScheduleTab));