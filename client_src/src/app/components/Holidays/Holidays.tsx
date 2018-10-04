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

import HolidaySelect from '../HolidaySelect/HolidaySelect';

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

class Holidays extends React.Component<WithStyles<typeof styles>> {
  state = {
    newScheduleName: '',
    scheduleName: '',
    days: ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun'],
    checkedMon: false,
    checkedTues: false,
    checkedWeds: false,
    checkedThurs: false,
    checkedFri: false,
    checkedSat: false,
    checkedSun: false,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const { days } = this.state;

    let day = days.map(el => {
      let stateName = `checked${el}`
      return <FormControlLabel
        control={
          <Checkbox
            checked={this.state[stateName]}
            onChange={this.handleCheckChange(`checked${el}`)}
            value={`checked${el}`}
          />
        }
        label={el}
      />
    })

    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form className={classes.form}>
            <Typography className={classes.title} variant="title">Holidays</Typography>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.scheduleName}
                onChange={this.handleChange}
                name="scheduleName"
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value="" disabled>
                  New Schedule
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              {/* <FormHelperText>Schedule Name</FormHelperText> */}
            </FormControl>

            <FormControl className={classes.formControl}>
              <Input
                value={this.state.newScheduleName}
                onChange={this.handleChange}
                name="newScheduleName"
                placeholder="Schedule Name"
                autoFocus={true}
              />
            </FormControl>

            <HolidaySelect />
            <HolidaySelect />

            <div className={classes.addIconContainer}>
              <Button variant="fab" color="secondary" aria-label="Add" className={classes.button}>
                <AddIcon />
              </Button>
            </div>
            <div className={classes.submitCancelContainer}>
              <Button variant="contained" color="primary" className={classes.button}>
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

export default withStyles(styles)(Holidays);