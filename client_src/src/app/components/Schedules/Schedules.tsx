import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';

import { connect } from 'react-redux';
import { addScheduleSelect, requestScheduleSubmit, updateNameField } from '../../actions/index'

import ScheduleSelect from '../ScheduleSelect/ScheduleSelect';

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
  scheduleSelect: any,
  addScheduleSelect: any,
  requestScheduleSubmit: any,
  updateNameField: any
}

class Schedules extends React.Component<WithStyles<typeof styles> & IProps> {

  handleNameInput = event => {
    const { updateNameField } = this.props;
    updateNameField({ name: event.target.value })
  };

  handleAddScheduleSelect = () => {
    const { addScheduleSelect } = this.props
    addScheduleSelect()
  }

  handleFormSubmit = () => {
    const { requestScheduleSubmit, scheduleSelect } = this.props;
    requestScheduleSubmit(scheduleSelect)
  }

  render() {
    const { classes, scheduleSelect } = this.props;

    let timeRangesComponent = scheduleSelect.timeRanges.map((el, i) => {

      return <ScheduleSelect row={el} />
    })
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form className={classes.form}>
            <Typography className={classes.title} variant="title">Schedule</Typography>
            <div className={classes.inputContainer}>
              <FormControl className={classes.formControl}>
                <Select
                  // value={this.state.name}
                  // onChange={this.handleChange}
                  name="scheduleName"
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  <MenuItem value="" disabled>
                    New Schedule
                  </MenuItem>
                  {/* <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
                {/* <FormHelperText>Schedule Name</FormHelperText> */}
              </FormControl>

              <FormControl className={classes.formControl}>
                <Input
                  value={this.props.scheduleSelect.name}
                  onChange={this.handleNameInput}
                  name="newScheduleName"
                  placeholder="Name"
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
              <Button variant="outlined" color="primary" className={classes.button}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    scheduleSelect: state.scheduleSelect
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addScheduleSelect: () => (dispatch(addScheduleSelect())),
  requestScheduleSubmit: (obj) => (dispatch(requestScheduleSubmit(obj))),
  updateNameField: (obj) => (dispatch(updateNameField(obj)))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Schedules));