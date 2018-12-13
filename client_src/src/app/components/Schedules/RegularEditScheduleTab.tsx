import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ScheduleSelect from './ScheduleSelect';

import { connect } from 'react-redux';
import { addRecurringTimeRange, submitUpdateScheduleToServer, changeScheduleName } from '../../actions'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const styles = theme => createStyles({
  form: {
    width: "50%",
    margin: "auto"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 200,
  },
  selectContainer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit,
  },
  addIconContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submitCancelContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

interface IProps {
  scheduleReducer: any,
  addRecurringTimeRange: any,
  requestScheduleEdit: any,
  changeScheduleName: any,
  match: any
}


class RegularEditScheduleTab extends React.Component<WithStyles<typeof styles> & IProps> {
 
  handleNameInput = event => {
    const { changeScheduleName } = this.props;
    changeScheduleName({ name: event.target.value })
  };

  handleAddScheduleSelect = () => {
    const { addRecurringTimeRange } = this.props
    addRecurringTimeRange()
  }

  handleFormSubmit = () => {
    const { requestScheduleEdit, scheduleReducer } = this.props;
    requestScheduleEdit(scheduleReducer)
  }

  render() {
    const { classes, scheduleReducer } = this.props;
    let timeRangesComponent = scheduleReducer.timeRanges.map((el) => {
      return <ScheduleSelect row={el} open={el.open} closed={el.closed}/>
    })

    return (
        <form style={{width: "50%", margin: "auto"}}>
            <FormControl className={classes.formControl}>
            <Input
                value={this.props.scheduleReducer.name}
                onChange={this.handleNameInput}
                name="newScheduleName"
                placeholder="Edit Name"
                autoFocus={true}
            />
            </FormControl>

            <div className={classes.selectContainer}>
              {timeRangesComponent}
            </div>

            <div className={classes.submitCancelContainer} style={{width: "70%", display: "inline-block"}}>
            <div className={classes.addIconContainer}>
                <Button style={{float: "right"}} onClick={this.handleAddScheduleSelect} variant="fab" color="secondary" aria-label="Add" className={classes.button}>
                <AddIcon />
                </Button>
            </div>
                <div>
                <div style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "40%"}}>
                    <Link to="/schedules">
                    <Button onClick={this.handleFormSubmit} variant="contained" color="primary" className={classes.button} style={{width: "90px"}}>
                        Save
                    </Button>
                    </Link>
                    <Link to="/schedules">
                    <Button variant="outlined" color="primary" className={classes.button}>
                        Cancel
                    </Button>
                    </Link>
                </div>
                </div>
            </div>
        </form>     
    )

  }
}

const mapStateToProps = state => {
  return {
    scheduleReducer: state.scheduleReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addRecurringTimeRange: () => (dispatch(addRecurringTimeRange())),
  submitUpdateScheduleToserver: (obj) => (dispatch(submitUpdateScheduleToServer(obj))),
  changeScheduleName: (obj) => (dispatch(changeScheduleName(obj)))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(RegularEditScheduleTab));