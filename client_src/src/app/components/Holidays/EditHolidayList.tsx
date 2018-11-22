import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import green from '@material-ui/core/colors/green';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import CalendarSnackbar  from '../calendarSnackbar/calendarSnackBar'
import CircularProgress from '@material-ui/core/CircularProgress';

import HolidayRow from './HolidayRow';
import { addHoliday, changeHolidayListName, submitUpdateHolidayListToServer, getHolidayListFromServer, handleCloseMessage } from '../../actions';


const styles = theme => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    // marginTop: '65px',
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  title: {
    margin: theme.spacing.unit,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
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
  },
  progress: {
    margin: theme.spacing.unit * 2,
  }
});

interface IProps {
  changeHolidayListName: any,
  addHoliday: any,
  holidayListReducer: any,
  submitUpdateHolidayList: any,
  match: any,
  requestGetHolidayList: any,
  handleCloseMessage: any
}

class EditHolidayList extends React.Component<WithStyles<typeof styles> & IProps> {

  handleAddHoliday = () => {
    this.props.addHoliday()
  }

  handleChangeHolidayListName = event => {
    this.props.changeHolidayListName(event.target.value)
  }

  handleFormSubmit = () => {
    console.log('handling form submit')
    const { submitUpdateHolidayList, holidayListReducer } = this.props;
    submitUpdateHolidayList(holidayListReducer)
  }

  componentWillMount () {
    const { id } = this.props.match.params
    const { requestGetHolidayList } = this.props;
    requestGetHolidayList({id})
  }

  handleCloseMessage = () => {
    const { handleCloseMessage  } = this.props
    handleCloseMessage()
  }

  render() {
    const { classes, holidayListReducer } = this.props;
    const { holidays, name, message, loading } = holidayListReducer;

    let holidayComponents = holidays.map((holiday) => {
      return <HolidayRow name={holiday.name} date={holiday.date} index={holiday.index}/>
    })

    let snackbar 
    if(message && message.type == 'error') {
      snackbar = <CalendarSnackbar
                      handleClose = {this.handleCloseMessage}
                      hideDuration = {6000}
                      content = {message.content}
                      variant = {'error'} />
    }
    if(message && message.type == 'success') {
      snackbar = <CalendarSnackbar
                      handleClose = {this.handleCloseMessage}
                      hideDuration = {6000}
                      content = {message.content}
                      variant = {'success'} />
    }

    let progressIndicator
    if(loading) {
      progressIndicator = <CircularProgress className={classes.progress} />
    }

    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form className={classes.form}>
            <Typography className={classes.title} variant="title">Edit Holiday List</Typography>

            {snackbar}

            <TextField
              id="edit-holiday-list-name"
              label="Name"
              className={classes.textField}
              value={name}
              onChange={this.handleChangeHolidayListName}
              margin="normal"
            />
            

            <div className={classes.selectContainer}>
              {holidayComponents}
            </div>

            {progressIndicator}

            <div className={classes.addIconContainer}>
              <Button onClick={this.handleAddHoliday} variant="fab" color="secondary" aria-label="Add" className={classes.button}>
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
    holidayListReducer: state.holidayListReducer
  }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  addHoliday: () => (dispatch(addHoliday())),
  changeHolidayListName: (obj) => (dispatch(changeHolidayListName(obj))),
  submitUpdateHolidayList: (obj) => (dispatch(submitUpdateHolidayListToServer(obj))),
  requestGetHolidayList: (obj) => (dispatch(getHolidayListFromServer(obj))),
  handleCloseMessage: () => (dispatch(handleCloseMessage()))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditHolidayList));

