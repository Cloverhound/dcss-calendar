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

import { connect } from 'react-redux';

import { submitNewQueueToServer, getSchedulesFromServer, getHolidayListsFromServer, handleAddQueueChange, submitUpdateQueueToServer } from '../../actions/index'

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
  }
});

interface IProps {
  scheduleReducer: any,
  submitNewQueueToServer: any,
  getSchedulesFromServer: any,
  handleAddQueueChange: any,
  newQueueReducer: any,
  queuesReducer: any,
  submitUpdateQueueToServer: any,
  getHolidayListsFromServer: any,
  holidayListsReducer: any
}

class AddQueue extends React.Component<WithStyles<typeof styles> & IProps> {
  state = {
    queueName: '',
    scheduleId: 0,
    holidayID: 0,
  };

  componentWillMount = () => {
    const { getSchedulesFromServer, getHolidayListsFromServer } = this.props;
    getSchedulesFromServer();
    getHolidayListsFromServer();
  }

  handleFormSubmit = () => {
    const { submitNewQueueToServer, newQueueReducer } = this.props;
      submitNewQueueToServer(newQueueReducer)
  }

  handleChange = event => {
    const { handleAddQueueChange } = this.props;
    handleAddQueueChange({ name: event.target.name, value: event.target.value })
  };

  render() {
    const { classes, scheduleReducer, newQueueReducer, holidayListsReducer } = this.props;

    let scheduleMenuItems = scheduleReducer.schedules.map(schedule => {
      return <MenuItem value={schedule.id}>{schedule.name}</MenuItem>
    })
    let holidayListMenuItems = holidayListsReducer.holidayLists.map(holiday => {
      return <MenuItem value={holiday.id}>{holiday.name}</MenuItem>
    })

    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form className={classes.form}>
            <Typography className={classes.title} variant="title">New Queue</Typography>
             <TextField
              label="Name"
              name="queueName"
              className={classes.textField}
              value={newQueueReducer.queueName}
              onChange={this.handleChange}
              margin="normal"
            />
            <FormControl className={classes.formControl}>
              <Select
                value={newQueueReducer.scheduleId}
                onChange={this.handleChange}
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
                value={newQueueReducer.holidayListId}
                onChange={this.handleChange}
                name="holidayListId"
                displayEmpty
                className={classes.selectEmpty}
              >
                {holidayListMenuItems}
              </Select>
              <FormHelperText>Holiday List Name</FormHelperText>
            </FormControl>
            <div className={classes.submitCancelContainer}>
              {/* <Link to="/"> */}
                <Button onClick={this.handleFormSubmit} variant="contained" color="primary" className={classes.button}>
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
    newQueueReducer: state.newQueueReducer,
    scheduleReducer: state.scheduleReducer,
    queuesReducer: state.queuesReducer,
    holidayListsReducer: state.holidayListsReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getSchedulesFromServer: () => (dispatch(getSchedulesFromServer())),
  getHolidayListsFromServer: () => dispatch(getHolidayListsFromServer()),
  submitNewQueueToServer: (obj) => (dispatch(submitNewQueueToServer(obj))),
  handleAddQueueChange: (obj) => (dispatch(handleAddQueueChange(obj))),
  submitUpdateQueueToServer: (obj) => (dispatch(submitUpdateQueueToServer(obj)))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddQueue));