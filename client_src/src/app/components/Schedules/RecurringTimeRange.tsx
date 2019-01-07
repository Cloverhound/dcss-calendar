require('rc-time-picker-ch/assets/index.css');
import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import TimePicker from 'rc-time-picker-ch';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { toggleRecurringDay, deleteRecurringTimeRange, changeStartOfRecurringTimeRange, changeEndOfRecurringTimeRange } from '../../actions/index';

var moment = require('moment-timezone');

const format = 'h:mm a';

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
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

interface IProps {
  toggleRecurringDay: any,
  deleteRecurringTimeRange: any,
  changeStartOfRecurringTimeRange: any,
  changeEndOfRecurringTimeRange: any,
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

  handleStartTimeChange = (value) => {
    const { changeStartOfRecurringTimeRange, index } = this.props
    changeStartOfRecurringTimeRange({index, value: value.format(format) })
  }

  handleEndTimeChange = (value) => {
    const { changeEndOfRecurringTimeRange, index } = this.props
    changeEndOfRecurringTimeRange({index, value: value.format(format) })
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

    let startValue = moment(this.props.start, format)
    if(!startValue.isValid()) {
      startValue = null
    }

    let endValue = moment(this.props.end, format)
    if(!endValue.isValid()) {
      endValue = null
    }

    return (
      <div className={classes.root}>
        <Paper >
          <FormGroup row
            className={classes.formGroup}>
            {checkBoxes}
          </FormGroup>
          <div className={classes.timeContainer}>
            <TimePicker
              showSecond={false}
              onChange={this.handleStartTimeChange}
              format={format}
              use12Hours
              placeholder={"Start Time"}
              value={startValue}
              allowEmpty={false}
              popupStyle={{fontFamily: '"Roboto"'}}
            />
            <TimePicker
              showSecond={false}
              onChange={this.handleEndTimeChange}
              format={format}
              use12Hours
              placeholder={"End Time"}
              value={endValue}
              allowEmpty={false}
              popupStyle={{fontFamily: '"Roboto"'}}
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
  changeStartOfRecurringTimeRange: (obj) => dispatch(changeStartOfRecurringTimeRange(obj)),
  changeEndOfRecurringTimeRange: (obj) => dispatch(changeEndOfRecurringTimeRange(obj))
})


export default connect(null, mapDispatchToProps)(withStyles(styles)(RecurringTimeRange));