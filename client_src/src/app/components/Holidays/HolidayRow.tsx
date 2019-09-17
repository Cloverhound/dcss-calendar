import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { connect } from 'react-redux';
import { changeHolidayName, deleteHoliday, changeHolidayDate } from '../../actions';

const styles = theme => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
    borderRadius: '5px',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.unit
  },
  timeContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: "0 0 25px 0"
  },
  dateInput: {
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    border: 'none',
    borderBottom: '1px solid #8D8D8D'
  },
  calendar: {
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily
  }
});

interface IProps {
  index: number,
  name: string,
  date: string,
  changeHolidayName: any,
  changeHolidayDate: any,
  deleteHoliday: any
}

class HolidayRow extends React.Component<WithStyles<typeof styles> & IProps> {


  handleChangeHolidayName = event => {
    this.props.changeHolidayName({index: this.props.index, name: event.target.value})
  }

  handleChangeHolidayDate = event => {
    let isoString = event.toISOString().split("T")[0]
    this.props.changeHolidayDate({index: this.props.index, date: isoString})
  }

  handleDelete = event => {
    const { deleteHoliday, index } = this.props;
    event.preventDefault()
    deleteHoliday(index)
  }


  render() {
    const { classes, date } = this.props;
    let yearMonthDay = null
    if(date){
      yearMonthDay = date
    }
    let holidayDate = <DatePicker
      selected={yearMonthDay}
      placeholderText="mm / dd / yyyy"
      onChange={this.handleChangeHolidayDate}
      className={classes.dateInput}
      calendarClassName={classes.calendar}
    />

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <FormGroup row
            className={classes.formGroup}>
            {holidayDate}
          </FormGroup>
        </Paper>
        <div className={classes.addButton}>
          <Tooltip title="Delete">
            <IconButton onClick={this.handleDelete} aria-label="Delete Holiday">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeHolidayName: (obj) => (dispatch(changeHolidayName(obj))),
  changeHolidayDate: (obj) => (dispatch(changeHolidayDate(obj))),
  deleteHoliday: (obj) => (dispatch(deleteHoliday(obj)))
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(HolidayRow));

