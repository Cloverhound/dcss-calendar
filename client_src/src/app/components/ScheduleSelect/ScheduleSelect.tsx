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

import { connect } from 'react-redux';
import { updateChecked, deleteRow } from '../../actions/index';

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

interface IProps {
  scheduleSelect: any,
  updateChecked: any,
  id: any,
  deleteRow: any
}

class ScheduleSelect extends React.Component<WithStyles<typeof styles> & IProps> {

  handleChange = event => {
    // this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckChange = (id, day) => event => {
    const { updateChecked } = this.props
    updateChecked({ id, day, event: event.target.checked });
  };

  handleDelete = (event) => {
    const { deleteRow } = this.props;
    event.preventDefault()
    deleteRow({ id: this.props.id })
  }

  render() {
    const { classes, scheduleSelect, id } = this.props;
    // console.log("render",scheduleSelect)
    let row = scheduleSelect.selectRow.filter(obj => {
      return obj.id == id
    })

    let week = row[0].week
    let keys = Object.keys(week)

    let checkBox = keys.map(day => {
      return <FormControlLabel
        control={
          <Checkbox
            checked={week[day].checked}
            onChange={this.handleCheckChange(id, day)}
            value={week[day]}
            disabled={week[day].disabled}
          />
        }
        label={day[0].toUpperCase() + day.slice(1)}
      />
    })
    return (
      <div className={classes.root}>
        <Paper >
          <FormGroup row
            className={classes.formGroup}>
            {checkBox}
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
              value={scheduleSelect.initialOpen}
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
              value={scheduleSelect.initialClosed}
              onChange={this.handleChange}
            />
          </div>

        </Paper>
        {/* <button onClick={this.handleDelete}>DELETE</button> */}
        <div className={classes.addButton}>
          <Tooltip title="Delete">
            <IconButton onClick={this.handleDelete} aria-label="Delete Schedule">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
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
  updateChecked: (obj) => dispatch(updateChecked(obj)),
  deleteRow: (obj) => dispatch(deleteRow(obj)),
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScheduleSelect));