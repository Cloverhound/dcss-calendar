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

import { submitNewLcsaToServer, changeLcsa, handleCloseMessage } from '../../actions/index'

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
  submitNewLcsaToServer: any,
  getSchedulesFromServer: any,
  changeLcsa: any,
  lcsasReducer: any,
  queuesReducer: any,
  getHolidayListsFromServer: any,
  holidayListsReducer: any,
  resetQueueState: any,
  handleCloseMessage: any
}

class NewLcsa extends React.Component<WithStyles<typeof styles> & IProps> {

  handleSubmitNewLcsa = () => {
    const { submitNewLcsaToServer, lcsasReducer } = this.props;
    submitNewLcsaToServer(lcsasReducer)
  }

  handleChangeLcsa = event => {
    const { changeLcsa } = this.props;
    changeLcsa({ name: event.target.name, value: event.target.value })
  }

  handleCloseMessage = () => {
    const { handleCloseMessage  } = this.props
    handleCloseMessage()
  }

  render() {
    const { classes, lcsasReducer } = this.props
    const { message, loading } = lcsasReducer;

    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form className={classes.form}> 

            <CalendarSnackbar
                handleClose = {this.handleCloseMessage}
                hideDuration = {6000}
                message = {message} 
            />

            <Typography className={classes.title} variant="title">New Lcsa</Typography>
             <TextField
              label="Lcsa Id"
              name="lcsa_id"
              className={classes.textField}
              value={lcsasReducer.lcsa_id}
              onChange={this.handleChangeLcsa}
              margin="normal"
            />
            <div className={classes.submitCancelContainer}>
                {loading ? <CircularProgress className={classes.progress} /> : null}
                <Button onClick={this.handleSubmitNewLcsa} variant="contained" color="primary" className={classes.button}>
                  Save
                </Button>
              <Link to="/lcsas">
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
    lcsasReducer: state.lcsasReducer,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitNewLcsaToServer: (obj) => (dispatch(submitNewLcsaToServer({...obj, history: ownProps.history}))),
    changeLcsa: (obj) => (dispatch(changeLcsa(obj))),
    handleCloseMessage: () => (dispatch(handleCloseMessage()))
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewLcsa));
