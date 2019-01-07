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
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { deleteSingleDateTimeRange, changeDateOfSingleDateTimeRange, changeStartOfSingleDateTimeRange, changeEndOfSingleDateTimeRange } from '../../actions/index';

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
    margin: theme.spacing.unit * 2
  },
  timeContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px'
  },
  date: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    marginBottom: '8px'
  }
});

interface IProps {
  deleteSingleDateTimeRange: any,
  changeStartOfSingleDateTimeRange: any,
  changeEndOfSingleDateTimeRange: any,
  changeDateOfSingleDateTimeRange: any,
  start: string,
  end: string,
  date: string,
  index: number
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

  handleDateChange = (event) =>  {
    const { changeDateOfSingleDateTimeRange, index } = this.props
    changeDateOfSingleDateTimeRange({ index, date: event.target.value})
  };

  handleDelete = (event) => {
    const { deleteSingleDateTimeRange, index } = this.props
    event.preventDefault()
    deleteSingleDateTimeRange({ index })
  }

  render() {
    const { classes } = this.props

    let dateComponent = <TextField
      type="date"
      value={this.props.date.split('T')[0]}
      onChange={this.handleDateChange}
      className={classes.date}
      InputLabelProps={{
        shrink: true,
    }} />

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
            <div className={classes.timeContainer}>
              <TimePicker
                showSecond={false}
                onChange={this.handleStartTimeChange}
                format={format}
                use12Hours
                placeholder={"Start Time"}
                value={startValue}
                allowEmpty={false}
              />
              <TimePicker
                showSecond={false}
                onChange={this.handleEndTimeChange}
                format={format}
                use12Hours
                placeholder={"End Time"}
                value={endValue}
                allowEmpty={false}
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
  changeDateOfSingleDateTimeRange: (obj) => dispatch(changeDateOfSingleDateTimeRange(obj))
})


export default connect(null, mapDispatchToProps)(withStyles(styles)(SingleDateTimeRange));