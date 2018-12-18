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
import { toggleRecurringDay, deleteRecurringTimeRange, changeStartTimeOfRecurringTimeRange, changeEndTimeOfRecurringTimeRange } from '../../actions/index';


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
  toggleRecurringDay: any,
  deleteRecurringTimeRange: any,
  changeStartTimeOfRecurringTimeRange: any,
  changeEndTimeOfRecurringTimeRange: any,
  start: string,
  end: string,
  mon_checked: boolean,
  tue_checked: boolean,
  wed_checked: boolean,
  thu_checked: boolean,
  fri_checked: boolean,
  sat_checked: boolean,
  sun_checked: boolean,
  index: number

}

class RecurringTimeRange extends React.Component<WithStyles<typeof styles> & IProps> {

  handleStartTimeChange = (event) => {
    const { changeStartTimeOfRecurringTimeRange, index } = this.props
    changeStartTimeOfRecurringTimeRange({index, value: event.target.value })
  }

  handleEndTimeChange = (event) => {
    const { changeEndTimeOfRecurringTimeRange, index } = this.props
    changeEndTimeOfRecurringTimeRange({index, value: event.target.value })
  }

  handleCheckChange = (event) =>  {
    const { toggleRecurringDay, index } = this.props
    toggleRecurringDay({ index, day: event.target.value})
  };

  handleDelete = (event) => {
    const { deleteRecurringTimeRange, index } = this.props
    event.preventDefault()
    deleteRecurringTimeRange({ index })
  }

  render() {
    const { classes } = this.props
    let days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

    let checkBoxes = days.map(day => {
      return <FormControlLabel
        control={
          <Checkbox
            checked={this.props[day + '_checked']}
            onChange={this.handleCheckChange}
            value={day}
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
            {checkBoxes}
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
              value={this.props.start}
              onChange={this.handleStartTimeChange}
            />
            <TextField
              id="time"
              label="End"
              type="time"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              name="end"
              value={this.props.end}
              onChange={this.handleEndTimeChange}
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


const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleRecurringDay: (obj) => dispatch(toggleRecurringDay(obj)),
  deleteRecurringTimeRange: (obj) => dispatch(deleteRecurringTimeRange(obj)),
  changeStartTimeOfRecurringTimeRange: (obj) => dispatch(changeStartTimeOfRecurringTimeRange(obj)),
  changeEndTimeOfRecurringTimeRange: (obj) => dispatch(changeEndTimeOfRecurringTimeRange(obj))
})


export default connect(null, mapDispatchToProps)(withStyles(styles)(RecurringTimeRange));