import * as React from 'react'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import createStyles from '@material-ui/core/styles/createStyles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import RegularScheduleTab from './RegularScheduleTab'
import SpecialScheduleTab from './SpecialScheduleTab'
import {resetSchedule} from '../../actions'
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar';
import {handleCloseMessage} from '../../actions/index'
import Paper from '@material-ui/core/Paper';


const styles = theme => createStyles({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
});


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

interface IProps {
  resetSchedule: any,
  history: any,
  handleCloseMessage: any,
  scheduleReducer: any
}

class NewSchedule extends React.Component<WithStyles<typeof styles> & IProps > {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  componentWillMount () {
    this.props.resetSchedule()
  }

  handleCloseMessage = () => {
    const { handleCloseMessage  } = this.props
    handleCloseMessage()
  }

  render() {
    const { classes, history, scheduleReducer } = this.props;

    return (
      <div className={classes.root}>
        <CalendarSnackbar
          handleClose = {this.handleCloseMessage}
          hideDuration = {4000}
          message = {scheduleReducer.message} 
         />
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Regular" />
            <Tab label="Special" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <TabContainer><RegularScheduleTab newOrUpdate={'new'} history={history}/></TabContainer>}
        {this.state.value === 1 && <TabContainer><SpecialScheduleTab newOrUpdate={'new'} history={history}/></TabContainer>}  
          {/* </div>  */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    scheduleReducer: state.scheduleReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetSchedule: () => (dispatch(resetSchedule())),
  handleCloseMessage: () => (dispatch(handleCloseMessage()))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(NewSchedule))