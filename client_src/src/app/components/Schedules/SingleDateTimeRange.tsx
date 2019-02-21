require('rc-time-picker-ch/assets/index.css');
import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import TimePicker from 'rc-time-picker-ch';
import DatePicker from "react-datepicker";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { deleteSingleDateTimeRange, changeDateOfSingleDateTimeRange, changeStartOfSingleDateTimeRange, changeEndOfSingleDateTimeRange, changeCheckboxSingleDateTimeRange } from '../../actions/index';

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
    margin: theme.spacing.unit * 2
  },
  // timeContainer: {
  //   display: 'flex',
  //   marginTop: '10px'
  // },
  date: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    marginBottom: '8px'
  },
  dateInput: {
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    border: 'none',
    borderBottom: '1px solid #8D8D8D',
    margin: theme.spacing.unit,
    // marginTop: '21px'
  },
  calendar: {
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily
  },
  timeWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing.unit,
  }
});

interface IProps {
  deleteSingleDateTimeRange: any,
  changeStartOfSingleDateTimeRange: any,
  changeEndOfSingleDateTimeRange: any,
  changeDateOfSingleDateTimeRange: any,
  changeCheckboxSingleDateTimeRange: any,
  start: string,
  end: string,
  date: string,
  index: number,
  closed_all_day: boolean
}

class SingleDateTimeRange extends React.Component<WithStyles<typeof styles> & IProps> {

  handleStartTimeChange = (value) => {
    const { changeStartOfSingleDateTimeRange, index } = this.props
    changeStartOfSingleDateTimeRange({index, value: value.format(format) })
  }

  handleEndTimeChange = (value) => {
    const { changeEndOfSingleDateTimeRange, index } = this.props
    changeEndOfSingleDateTimeRange({index, value: value.format(format) })
  }

  handleDateChange = (value) =>  {
    const { changeDateOfSingleDateTimeRange, index } = this.props
    console.log("date single date time range", value)
    changeDateOfSingleDateTimeRange({ index, date: value})
  };

  handleCheckboxChange = (event) => {
    const { changeCheckboxSingleDateTimeRange, index } = this.props
    changeCheckboxSingleDateTimeRange({index, value: event.target.value})
  }

  handleDelete = (event) => {
    const { deleteSingleDateTimeRange, index } = this.props
    event.preventDefault()
    deleteSingleDateTimeRange({ index })
  }

  render() {
    const { classes, closed_all_day } = this.props

    let dateComponent = <DatePicker
      className={classes.dateInput}
      selected={this.props.date}
      placeholderText="mm / dd / yyyy"
      onChange={this.handleDateChange}
      calendarClassName={classes.calendar}
    />

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
            {dateComponent}
            <div className={classes.timeWrapper}>
              <div className={classes.timeContainer}>
                <Typography variant="body1" color="textSecondary" >
                  Start Time
                </Typography>
                <TimePicker
                  showSecond={false}
                  onChange={this.handleStartTimeChange}
                  format={format}
                  use12Hours
                  placeholder={"00:00"}
                  value={startValue}
                  allowEmpty={false}
                  popupStyle={{fontFamily: '"Roboto"', fontSize: '14px'}}
                  disabled={closed_all_day}
                />
              </div>
              <div className={classes.timeContainer}>
                <Typography variant="body1" color="textSecondary" >
                  End Time
                </Typography>
                <TimePicker
                  showSecond={false}
                  onChange={this.handleEndTimeChange}
                  format={format}
                  use12Hours
                  placeholder={"00:00"}
                  value={endValue}
                  allowEmpty={false}
                  popupStyle={{fontFamily: '"Roboto"', fontSize: '14px'}}
                  disabled={closed_all_day}
                />
              </div>
              <FormControlLabel
                control={
                <Switch
                  checked={closed_all_day}
                  onChange={this.handleCheckboxChange}
                  value={closed_all_day}
                />
                }
                label="Closed all day"
              />
            </div>
          </FormGroup>
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
  deleteSingleDateTimeRange: (obj) => dispatch(deleteSingleDateTimeRange(obj)),
  changeStartOfSingleDateTimeRange: (obj) => dispatch(changeStartOfSingleDateTimeRange(obj)),
  changeEndOfSingleDateTimeRange: (obj) => dispatch(changeEndOfSingleDateTimeRange(obj)),
  changeDateOfSingleDateTimeRange: (obj) => dispatch(changeDateOfSingleDateTimeRange(obj)),
  changeCheckboxSingleDateTimeRange: (obj) => dispatch(changeCheckboxSingleDateTimeRange(obj))
})


export default connect(null, mapDispatchToProps)(withStyles(styles)(SingleDateTimeRange));