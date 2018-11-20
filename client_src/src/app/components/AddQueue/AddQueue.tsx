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

import { connect } from 'react-redux';

import { requestAddQueueSubmit, requestGetSchedules, handleAddQueueChange, requestAddQueueUpdate } from '../../actions/index'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const styles = theme => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '65px',
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
    width: '300px',
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
});

interface IProps {
  scheduleReducer: any,
  requestAddQueueSubmit: any,
  requestGetSchedules: any,
  handleAddQueueChange: any,
  addQueueReducer: any,
  queuesReducer: any,
  requestAddQueueUpdate: any
}

class AddQueue extends React.Component<WithStyles<typeof styles> & IProps> {
  state = {
    queueName: '',
    scheduleId: 0,
    holidayID: 0,
  };

  componentWillMount = () => {
    const { requestGetSchedules, handleAddQueueChange, queuesReducer } = this.props;
    requestGetSchedules();

    if (queuesReducer.selected.name && queuesReducer.selected.scheduleId) {
      handleAddQueueChange({ name: "queueId", value: queuesReducer.selected.id })
      handleAddQueueChange({ name: "queueName", value: queuesReducer.selected.name })
      handleAddQueueChange({ name: "scheduleId", value: queuesReducer.selected.scheduleId })
    }
  }

  handleFormSubmit = () => {
    const { requestAddQueueSubmit, requestAddQueueUpdate, addQueueReducer } = this.props;
    if (addQueueReducer.queueId !== 0) {
      requestAddQueueUpdate({ queueId: addQueueReducer.queueId, scheduleId: addQueueReducer.scheduleId, queueName: addQueueReducer.queueName })
    } else {
      requestAddQueueSubmit({ scheduleId: addQueueReducer.scheduleId, queueName: addQueueReducer.queueName })
    }
  }

  handleChange = event => {
    const { handleAddQueueChange } = this.props;
    handleAddQueueChange({ name: event.target.name, value: event.target.value })
  };

  render() {
    const { classes, scheduleReducer, addQueueReducer, queuesReducer, handleAddQueueChange } = this.props;

    let menuItems = scheduleReducer.schedules.map(schedule => {
      return <MenuItem value={schedule.id}>{schedule.name}</MenuItem>
    })

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.arrowContainer}>
            <Link to="/">
              <ArrowBack className={classes.arrow} />
            </Link>
          </div>
          <form className={classes.form}>
            <FormControl>
              {/* <Input
                value={addQueueReducer.queueName}
                onChange={this.handleChange}
                name="queueName"
                placeholder="Queue Name"
                autoFocus={true}
              /> */}
            </FormControl>
            <FormControl className={classes.formControl}>
              <Select
                value={addQueueReducer.scheduleId}
                onChange={this.handleChange}
                name="scheduleId"
                displayEmpty
                className={classes.selectEmpty}
              >
                {menuItems}
              </Select>
              <FormHelperText>Schedule Name</FormHelperText>
            </FormControl>
            {/* <FormControl className={classes.formControl}>
              <Select
                value={this.state.holidayID}
                onChange={this.handleChange}
                name="holidayID"
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value="" disabled>
                  Placeholder
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Holiday Name</FormHelperText>
            </FormControl> */}
            <Link to="/">
              <Button onClick={this.handleFormSubmit} variant="contained" color="primary" className={classes.button}>
                Save
              </Button>
            </Link>
          </form>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    scheduleReducer: state.scheduleReducer,
    addQueueReducer: state.addQueueReducer,
    queuesReducer: state.queuesReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestGetSchedules: () => (dispatch(requestGetSchedules())),
  requestAddQueueSubmit: (obj) => (dispatch(requestAddQueueSubmit(obj))),
  handleAddQueueChange: (obj) => (dispatch(handleAddQueueChange(obj))),
  requestAddQueueUpdate: (obj) => (dispatch(requestAddQueueUpdate(obj)))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddQueue));