import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import HolidayRow from './HolidayRow';
import { addHoliday, changeHolidayListName, requestUpdateHolidayListSubmit } from '../../actions';
import { getHolidayList } from '../../sagas/api';


const styles = theme => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    // marginTop: '65px',
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
  changeHolidayListName: any,
  addHoliday: any,
  holidayListReducer: any,
  requestUpdateHolidayListSubmit: any,
  match: any,
  getHolidayList: any
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
    const { requestUpdateHolidayListSubmit, holidayListReducer } = this.props;
    requestUpdateHolidayListSubmit(holidayListReducer)
  }

  componentWillMount () {
    const { id } = this.props.match.params
    const { getHolidayList } = this.props;
    getHolidayList({id})
  }

  render() {
    const { classes, holidayListReducer } = this.props;
    const { holidays, name } = holidayListReducer;

    console.log('rendering edit holiday list', holidays, name)
    let holidayComponents = holidays.map((holiday) => {
      return <HolidayRow name={holiday.name} date={holiday.date} index={holiday.index}/>
    })

    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form className={classes.form}>
            <Typography className={classes.title} variant="title">Edit Holiday List</Typography>

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
  requestUpdateHolidayListSubmit: (obj) => (dispatch(requestUpdateHolidayListSubmit(obj))),
  getHolidayList: (obj) => (dispatch(getHolidayList(obj)))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditHolidayList));

