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
    justifyContent: 'space-between',
    marginTop: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
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
    alignItems: 'center',
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: theme.spacing.unit,
  },
  timeContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: "0 0 25px 0"
  }
});

class WeeklySelect extends React.Component<WithStyles<typeof styles>> {
  state = {
    holidayOrRange: "holiday",
    prefillHolidays: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const { holidayOrRange } = this.state;
    let dropType;

    if (holidayOrRange === "holiday") {
      dropType = <FormControl className={classes.formControl}>
        <Select
          value={this.state.prefillHolidays}
          onChange={this.handleChange}
          name="prefillHolidays"
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value={"christmas"}>Christmas</MenuItem>
          <MenuItem value={"festivus"}>Festivus</MenuItem>
          <MenuItem value={"halloween"}>Halloween</MenuItem>
          <MenuItem value={"Presidents Day"}>Presidents Day</MenuItem>
        </Select>
        {/* <FormHelperText>Schedule Name</FormHelperText> */}
      </FormControl>
    } else if (holidayOrRange === "range") {
      dropType = <div>
        <FormControl className={classes.formControl}>
          <TextField
            id="date"
            label="Start"
            type="date"
            defaultValue="2018-01-01"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="date"
            label="End"
            type="date"
            defaultValue="2018-01-01"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </div>
    }

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <FormGroup row
            className={classes.formGroup}>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.holidayOrRange}
                onChange={this.handleChange}
                name="holidayOrRange"
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value={"holiday"}>Holiday</MenuItem>
                <MenuItem value={"range"}>Range</MenuItem>
              </Select>
              {/* <FormHelperText>Schedule Name</FormHelperText> */}
            </FormControl>
            {dropType}

          </FormGroup>
        </Paper>
        <div className={classes.addButton}>
          <Tooltip title="Delete Schedule">
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