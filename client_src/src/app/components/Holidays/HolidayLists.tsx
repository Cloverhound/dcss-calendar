import * as React from 'react'
import { connect } from 'react-redux'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
// import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar'
import CircularProgress from '@material-ui/core/CircularProgress'

import CalendarTable from '../CalendarTable/CalendarTable'
import { getHolidayListsFromServer, submitDeleteHolidayListToServer, handleCloseMessage } from '../../actions'

const styles = theme => createStyles({
  progress: {
    margin: theme.spacing.unit * 2,
  }
})

interface IProps {
  holidayLists: any,
  getHolidayLists: any,
  deleteHolidayList: any,
  holidayListsReducer: any,
  handleCloseMessage: any
}
 
class HolidayLists extends React.Component<WithStyles<typeof styles> & IProps> {

  createTableData = () => {
    console.log('Creating table data')
    const {holidayLists} = this.props;
    return holidayLists.map((holidayList, index) => {
      return {id: holidayList.id, name: holidayList.name}
    })
  }

  handleGetHolidayLists = () => {
    console.log('Getting holiday lists')
    const { getHolidayLists } = this.props
    getHolidayLists()
  }

  handleDeleteHolidayList = (holidayListId) => {
    console.log('Handling Delete Holiday List', holidayListId)
    const { deleteHolidayList } = this.props
    deleteHolidayList(holidayListId)
  }

  handleCloseMessage = () => {
    const { handleCloseMessage  } = this.props
    handleCloseMessage()
  }

  render() {
    const { classes, holidayListsReducer } = this.props
    const { message, loading } = holidayListsReducer
    let data = this.createTableData()
    let columnNames = ['name', 'active']
    let table = <CalendarTable 
                    data={data} 
                    basePath={"holiday_lists"} 
                    populateTable={this.handleGetHolidayLists} 
                    orderBy={"name"} 
                    columnNames={columnNames}
                    title={"Holiday Lists"}
                    addButtonText={"Add Holiday List"}
                    handleDelete={this.handleDeleteHolidayList}
                />

    return (
      <div>
        {/* <CalendarSnackbar
                handleClose = {this.handleCloseMessage}
                hideDuration = {6000}
                message = {message} 
              /> */}
        {loading ? <CircularProgress className={classes.progress} /> : table}
        
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    holidayLists: state.holidayListsReducer.holidayLists,
    holidayListsReducer: state.holidayListsReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getHolidayLists: () => dispatch(getHolidayListsFromServer()),
  deleteHolidayList: (obj) => dispatch(submitDeleteHolidayListToServer(obj)),
  handleCloseMessage: () => (dispatch(handleCloseMessage()))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HolidayLists));
