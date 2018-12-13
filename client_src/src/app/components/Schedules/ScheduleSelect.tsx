import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import { toggleRecurringDay, deleteRecurringTimeRange, changeStartEndTimeOfRecurringTimeRange } from '../../actions/index';


const styles = theme => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
    borderRadius: '5px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    width: 200,
  },
  addButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '10px',
  },
  timeContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: "0 0 25px 0"
  }
});

interface IProps {
  scheduleSelect: any,
  toggleRecurringDay: any,
  row: any,
  index: any,
  deleteRecurringTimeRange: any,
  changeStartEndTimeOfRecurringTimeRange: any,
  start: any,
  end: any
}

class ScheduleSelect extends React.Component<WithStyles<typeof styles> & IProps> {

  handleStartEndTimeChange = (event) => {
    const { changeStartEndTimeOfRecurringTimeRange, row } = this.props
    changeStartEndTimeOfRecurringTimeRange({row, name: event.target.name, value: event.target.value })
  }

  handleCheckChange = (row, day) => event => {
    const { toggleRecurringDay } = this.props
    toggleRecurringDay({ row, day, event: event.target.checked });
  };

  handleDelete = (event) => {
    const { deleteRecurringTimeRange, row } = this.props;
    event.preventDefault()
    deleteRecurringTimeRange({ row })
  }

  render() {
    const { classes, row, start, end } = this.props;
    let week = row.week
    let keys = Object.keys(week)

    let checkBox = keys.map(day => {
      return <FormControlLabel
        control={
          <Checkbox
            checked={week[day].checked}
            onChange={this.handleCheckChange(row, day)}
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
              label="Start"
              type="time"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              name="start"
              value={start}
              onChange={this.handleStartEndTimeChange}
            />
            <TextField
              id="time"
              label="Closed"
              type="time"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              name="closed"
              value={closed}
              onChange={this.handleStartEndTimeChange}
            />
          </div>

        </Paper>
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
  toggleRecurringDay: (obj) => dispatch(toggleRecurringDay(obj)),
  deleteRecurringTimeRange: (obj) => dispatch(deleteRecurringTimeRange(obj)),
  changeStartEndTimeOfRecurringTimeRange: (obj) => dispatch(changeStartEndTimeOfRecurringTimeRange(obj))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScheduleSelect));