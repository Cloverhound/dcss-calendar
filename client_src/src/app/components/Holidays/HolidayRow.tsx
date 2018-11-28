import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import { changeHolidayName, deleteHoliday, changeHolidayDate } from '../../actions';


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
    this.props.changeHolidayDate({index: this.props.index, date: event.target.value})
  }

  handleDelete = event => {
    const { deleteHoliday, index } = this.props;
    event.preventDefault()
    deleteHoliday(index)
  }


  render() {
    const { classes, name, date} = this.props;
    
    let nameDropDown = <FormControl className={classes.formControl}>
      <Select
        value={name} 
        onChange={this.handleChangeHolidayName}
        name="prefillHolidays"
        displayEmpty
        className={classes.selectEmpty}
      >
        <MenuItem value={"christmas"}>Christmas</MenuItem>
        <MenuItem value={"festivus"}>Festivus</MenuItem>
        <MenuItem value={"halloween"}>Halloween</MenuItem>
        <MenuItem value={"Presidents Day"}>Presidents Day</MenuItem>
      </Select>
      
    </FormControl>

    let holidayDate = <TextField
      id="holiday-date"
      type="date"
      value={date.split('T')[0]}
      onChange={this.handleChangeHolidayDate}
      className={classes.holidayDate}
      InputLabelProps={{
        shrink: true,
      }} />
    

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <FormGroup row
            className={classes.formGroup}>
  
              {nameDropDown}
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
    holidayClass: "holiday-date"
  },
  holidayDate: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    marginBottom: '8px'
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


const mapDispatchToProps = (dispatch, ownProps) => ({
  changeHolidayName: (obj) => (dispatch(changeHolidayName(obj))),
  changeHolidayDate: (obj) => (dispatch(changeHolidayDate(obj))),
  deleteHoliday: (obj) => (dispatch(deleteHoliday(obj)))
})



export default connect(null, mapDispatchToProps)(withStyles(styles)(HolidayRow));

