import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackBar'
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';

import { getSchedulesFromServer, getHolidayListsFromServer, submitUpdateQueueToServer, getQueueFromServer, handleCloseMessage, changeQueue } from '../../actions/index'

import {
  Link
} from 'react-router-dom';

const styles = theme => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '65px',
  },
  title: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  arrow: {
    margin: '10px',
    fill: 'white',
    "&:hover": {
      cursor: 'pointer'
    },
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    marginTop: '30px',
    margin: theme.spacing.unit,
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
  queueReducer: any,
  queuesReducer: any,
  schedulesReducer: any,
  holidayListsReducer: any,
  getSchedulesFromServer: any,
  getHolidayListsFromServer: any,
  getQueueFromServer,
  submitUpdateQueueToServer: any,
  changeQueue,
  match: any,
  handleCloseMessage: any
}

class EditQueue extends React.Component<WithStyles<typeof styles> & IProps> {

  componentWillMount = () => {
    const { id } = this.props.match.params
    const { getSchedulesFromServer, getHolidayListsFromServer, getQueueFromServer } = this.props;
    getSchedulesFromServer();
    getHolidayListsFromServer();
    getQueueFromServer(id);
  }

  handleSubmitUpdateQueue = () => {
    const { submitUpdateQueueToServer, queueReducer } = this.props;
    let id = this.props.match.params
    submitUpdateQueueToServer(queueReducer)
  }

  handleChangeQueue = event => {
    const { changeQueue } = this.props;
    changeQueue({ name: event.target.name, value: event.target.value })
  }

  handleCloseMessage = () => {
    const { handleCloseMessage  } = this.props
    handleCloseMessage()
  }

  render() {
    const { classes, schedulesReducer, queueReducer, holidayListsReducer } = this.props;
    const { message, loading } = queueReducer;

    let scheduleMenuItems = schedulesReducer.schedules.map(schedule => {
      return <MenuItem value={schedule.id}>{schedule.name}</MenuItem>
    })
    let holidayListMenuItems = holidayListsReducer.holidayLists.map(holiday => {
      return <MenuItem value={holiday.id}>{holiday.name}</MenuItem>
    })

    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form className={classes.form}>
            <Typography className={classes.title} variant="title">Edit County</Typography>

              <CalendarSnackbar
                handleClose = {this.handleCloseMessage}
                hideDuration = {6000}
                message = {message} 
              />

             <TextField
              label="Name"
              name="queueName"
              className={classes.textField}
              value={queueReducer.queueName}
              onChange={this.handleChangeQueue}
              margin="normal"
            />
             <TextField
              label="County Code"
              name="county_code"
              className={classes.textField}
              value={queueReducer.county_code}
              onChange={this.handleChangeQueue}
              margin="normal"
            />
            <FormControl className={classes.formControl}>
              <Select
                value={queueReducer.scheduleId}
                onChange={this.handleChangeQueue}
                name="scheduleId"
                displayEmpty
                className={classes.selectEmpty}
              >
                {scheduleMenuItems}
              </Select>
              <FormHelperText>Schedule Name</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Select
                value={queueReducer.holidayListId}
                onChange={this.handleChangeQueue}
                name="holidayListId"
                displayEmpty
                className={classes.selectEmpty}
              >
                {holidayListMenuItems}
              </Select>
              <FormHelperText>Holiday List Name</FormHelperText>
            </FormControl>
            <div className={classes.submitCancelContainer}>
                {loading ? <CircularProgress className={classes.progress} /> : null}
              {/* <Link to="/"> */}
                <Button onClick={this.handleSubmitUpdateQueue} variant="contained" color="primary" className={classes.button}>
                  Save
                </Button>
              {/* </Link> */}
              <Link to="/">
                <Button variant="outlined" color="primary" className={classes.button}>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    queueReducer: state.queueReducer,
    schedulesReducer: state.schedulesReducer,
    queuesReducer: state.queuesReducer,
    holidayListsReducer: state.holidayListsReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getSchedulesFromServer: () => (dispatch(getSchedulesFromServer())),
  getHolidayListsFromServer: () => dispatch(getHolidayListsFromServer()),
  changeQueue: (obj) => (dispatch(changeQueue(obj))),
  submitUpdateQueueToServer: (obj) => (dispatch(submitUpdateQueueToServer({...obj, history: ownProps.history}))),
  getQueueFromServer: (obj) => (dispatch(getQueueFromServer(obj))),
  handleCloseMessage: () => (dispatch(handleCloseMessage()))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditQueue));