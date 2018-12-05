import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ScheduleSelect from '../ScheduleSelect/ScheduleSelect';

import { connect } from 'react-redux';
import { addScheduleSelect, requestScheduleSubmit, updateNameField, getSchedulesFromServer, updateTimeRanges, resetTimeRanges } from '../../actions'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const styles = theme => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    // marginTop: '65px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit,
  },
  arrowContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    backgroundColor: '#3f51b5;',
    borderRadius: "5px 5px 0 0"
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
    maxWidth: '850px',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 200,
  },
  selectContainer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  addIconContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
  submitCancelContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '50px',
  }
});

interface IProps {
  scheduleReducer: any,
  addScheduleSelect: any,
  requestScheduleSubmit: any,
  updateNameField: any,
  getSchedulesFromServer: any,
  updateTimeRanges: any,
  resetTimeRanges: any
}

class NewSchedule extends React.Component<WithStyles<typeof styles> & IProps> {

  componentWillMount = () => {
    const { getSchedulesFromServer, resetTimeRanges } = this.props;
    getSchedulesFromServer()
    resetTimeRanges()
  }

  handleNameInput = event => {
    const { updateNameField } = this.props;
    updateNameField({ name: event.target.value })
  };

  handleAddScheduleSelect = () => {
    const { addScheduleSelect } = this.props
    addScheduleSelect()
  }

  handleFormSubmit = () => {
    const { requestScheduleSubmit, scheduleReducer } = this.props;
    requestScheduleSubmit(scheduleReducer)
  }

  render() {
    const { classes, scheduleReducer } = this.props;
    let timeRangesComponent = scheduleReducer.timeRanges.map((el, i) => {
      return <ScheduleSelect row={el} open={el.open} closed={el.closed}/>
    })

    let menuItem = scheduleReducer.schedules.map(schedule => {
      return <MenuItem value={schedule.id}>{schedule.name}</MenuItem>
    })
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form className={classes.form}>
            <Typography className={classes.title} variant="title">Schedule</Typography>
            <div className={classes.inputContainer}>

              <FormControl className={classes.formControl}>
                <Input
                  value={this.props.scheduleReducer.name}
                  onChange={this.handleNameInput}
                  name="newScheduleName"
                  placeholder="Add Name"
                  autoFocus={true}
                />
              </FormControl>
            </div>

            <div className={classes.selectContainer}>
              {timeRangesComponent}
            </div>

            <div className={classes.addIconContainer}>
              <Button onClick={this.handleAddScheduleSelect} variant="fab" color="secondary" aria-label="Add" className={classes.button}>
                <AddIcon />
              </Button>
            </div>
            <div className={classes.submitCancelContainer}>
              <Button onClick={this.handleFormSubmit} variant="contained" color="primary" className={classes.button}>
                Submit
              </Button>
              <Link to="/schedules">
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
    scheduleReducer: state.scheduleReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addScheduleSelect: () => (dispatch(addScheduleSelect())),
    requestScheduleSubmit: (obj) => (dispatch(requestScheduleSubmit({...obj, history: ownProps.history}))),
    updateNameField: (obj) => (dispatch(updateNameField(obj))),
    getSchedulesFromServer: () => (dispatch(getSchedulesFromServer())),
    updateTimeRanges: (obj) => (dispatch(updateTimeRanges(obj))),
    resetTimeRanges: () => (dispatch(resetTimeRanges()))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewSchedule));