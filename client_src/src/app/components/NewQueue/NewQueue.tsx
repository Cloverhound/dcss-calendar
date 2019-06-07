import * as React from 'react';
import { Redirect } from 'react-router-dom';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';

import { submitNewQueueToServer, getSchedulesFromServer, getHolidayListsFromServer, getLcsasFromServer, changeQueue, resetQueueState, handleCloseMessage, submitNewQueueToServerFailed } from '../../actions/index'

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
  schedulesReducer: any,
  submitNewQueueToServer: any,
  getSchedulesFromServer: any,
  getLcsasFromServer: any,
  changeQueue: any,
  queueReducer: any,
  queuesReducer: any,
  getHolidayListsFromServer: any,
  holidayListsReducer: any,
  resetQueueState: any,
  handleCloseMessage: any,
  lcsasReducer: any,
  submitNewQueueToServerFailed: any
}

interface IState {
  ewtError: any
}

class NewQueue extends React.Component<WithStyles<typeof styles> & IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      ewtError: false
    }
  }

  componentWillMount = () => {
    const { getSchedulesFromServer, getHolidayListsFromServer, getLcsasFromServer, resetQueueState } = this.props;
    getSchedulesFromServer();
    getHolidayListsFromServer();
    getLcsasFromServer();
    resetQueueState()
  }

  handleSubmitNewQueue = () => {
    const { submitNewQueueToServer, queueReducer, submitNewQueueToServerFailed } = this.props;
    if ((queueReducer.ewt > 0 && queueReducer.ewt <= 3600) || queueReducer.ewt === '') {
      submitNewQueueToServer(queueReducer)
    } else {
      submitNewQueueToServerFailed({message: "EWT is required to be between 0 - 3600"})
    }
  }
  
  handleChangeQueue = event => {
    const {name, value} = event.target
    const { changeQueue } = this.props

    if (name === 'ewt' && value > 3600) {
      this.setState({ ewtError: true })
    } else if (name === 'ewt' && value < 3600){
      this.setState({ ewtError: false })
    }
    changeQueue({ name, value })
  }

  handleCloseMessage = () => {
    const { handleCloseMessage  } = this.props
    handleCloseMessage()
  }

  render() {
    const { classes, schedulesReducer, queueReducer, holidayListsReducer, lcsasReducer } = this.props;
    const { message, loading } = queueReducer;

    let scheduleMenuItems = schedulesReducer.schedules.map(schedule => {
      return <MenuItem value={schedule.id}>{schedule.name}</MenuItem>
    })
    let holidayListMenuItems = holidayListsReducer.holidayLists.map(holiday => {
      return <MenuItem value={holiday.id}>{holiday.name}</MenuItem>
    })
    let lcsaMenuItems = lcsasReducer.lcsas.map(lcsa => {
      return <MenuItem value={lcsa.id}>{lcsa.lcsa_name}</MenuItem>
    })
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form className={classes.form}> 
            <CalendarSnackbar
                handleClose = {this.handleCloseMessage}
                hideDuration = {6000}
                message = {message} 
            />
            <Typography className={classes.title} variant="title">New County</Typography>
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
              disabled={false}
            />
            <TextField
              label="EWT"
              name="ewt"
              className={classes.textField}
              value={queueReducer.ewt}
              onChange={this.handleChangeQueue}
              margin="normal"
              helperText = "0 - 3600 required"
              error={this.state.ewtError}
            />
            <FormControl className={classes.formControl}>
              <Select
                value={queueReducer.lcsaId}
                onChange={this.handleChangeQueue}
                name="lcsaId"
                displayEmpty
                className={classes.selectEmpty}
              >
                {lcsaMenuItems}
              </Select>
              <FormHelperText>Lcsa Name</FormHelperText>
            </FormControl>
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
              <Button onClick={this.handleSubmitNewQueue} variant="contained" color="primary" className={classes.button}>
                Save
              </Button>
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
    lcsasReducer: state.lcsasReducer,
    queuesReducer: state.queuesReducer,
    holidayListsReducer: state.holidayListsReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSchedulesFromServer: () => (dispatch(getSchedulesFromServer())),
    getHolidayListsFromServer: () => (dispatch(getHolidayListsFromServer())),
    getLcsasFromServer: () => (dispatch(getLcsasFromServer())),
    submitNewQueueToServer: (obj) => (dispatch(submitNewQueueToServer({...obj, history: ownProps.history}))),
    changeQueue: (obj) => (dispatch(changeQueue(obj))),
    resetQueueState: ()=> (dispatch(resetQueueState())),
    handleCloseMessage: () => (dispatch(handleCloseMessage())),
    submitNewQueueToServerFailed: (obj) => (dispatch(submitNewQueueToServerFailed(obj)))
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewQueue));
