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
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const styles = theme => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
    // border: '1px solid black',
    borderRadius: '5px',
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
    width: '500px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    manWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    marginTop: '30px',
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  addButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '24px',
  },
  timeContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: "0 0 25px 0"
  }
});

class WeeklySelect extends React.Component<WithStyles<typeof styles>> {
  state = {
    days: ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun'],
    checkedMon: false,
    checkedTues: false,
    checkedWeds: false,
    checkedThurs: false,
    checkedFri: false,
    checkedSat: false,
    checkedSun: false,
    openTime: "07:00",
    closedTime: "19:00"
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
        <Paper >
          <FormGroup row
            className={classes.formGroup}>
            {day}

          </FormGroup>
          <div className={classes.timeContainer}>
            <TextField
              id="time"
              label="Open"
              type="time"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              name="openTime"
              value={this.state.openTime}
              onChange={this.handleChange}
            />
            <TextField
              id="time"
              label="Closed"
              type="time"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              name="closedTime"
              value={this.state.closedTime}
              onChange={this.handleChange}
            />
          </div>

        </Paper>
        <div className={classes.addButton}>
          <Tooltip title="Delete">
            <IconButton aria-label="Delete Schedule">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(WeeklySelect);