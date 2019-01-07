import * as React from 'react'
import { connect } from 'react-redux'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteAlert from '../Modal/DeleteAlert'

import CalendarTable from '../CalendarTable/CalendarTable'
import { getHolidayListsFromServer, submitDeleteHolidayListToServer, handleCloseMessage, handleDeleteHolidayListClicked, handleDeleteHolidayListCancel } from '../../actions'

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
  handleCloseMessage: any,
  handleDeleteHolidayListClicked:any,
  handleDeleteHolidayListCancel: any
}
 
class HolidayLists extends React.Component<WithStyles<typeof styles> & IProps> {

  createTableData = () => {
    console.log('Creating table data')
    const {holidayLists} = this.props;
    return holidayLists.map((holidayList, index) => {
      return {id: holidayList.id, Name: holidayList.name}
    })
  }

  handleGetHolidayLists = () => {
    console.log('Getting holiday lists')
    const { getHolidayLists } = this.props
    getHolidayLists()
  }

  handleCloseMessage = () => {
    const { handleCloseMessage  } = this.props
    handleCloseMessage()
  }

  handleDeleteHolidayListClicked = (id) => {
    const {handleDeleteHolidayListClicked} = this.props
    handleDeleteHolidayListClicked({id})
  }

  handleDeleteSHolidayList = () => {
    const {holidayListsReducer, deleteHolidayList} = this.props
    console.log('Handling delete holiday list', holidayListsReducer.holidayListToDeleteID)
    deleteHolidayList({id: holidayListsReducer.holidayListToDeleteID})
  }

  render() {
    const { classes, holidayListsReducer, handleDeleteHolidayListCancel } = this.props
    const { message, loading } = holidayListsReducer
    let data = this.createTableData()
    let columnNames = ['Name', 'Active', '']
    let table = <CalendarTable 
                    data={data} 
                    basePath={"holiday_lists"} 
                    populateTable={this.handleGetHolidayLists} 
                    orderBy={"Name"} 
                    columnNames={columnNames}
                    title={"Holiday Lists"}
                    addButtonText={"Add Holiday List"}
                    handleDelete={this.handleDeleteHolidayListClicked}
                />

    return (
      <div>
        <CalendarSnackbar
          handleClose = {this.handleCloseMessage}
          hideDuration = {4000}
          message = {message} 
        />
        <DeleteAlert 
          entity={"Holiday List"} 
          open={holidayListsReducer.holidayListToDeleteID} 
          handleCancel={handleDeleteHolidayListCancel} 
          handleProceed={this.handleDeleteSHolidayList}
        />
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
  handleCloseMessage: () => (dispatch(handleCloseMessage())),
  handleDeleteHolidayListClicked: (obj) => (dispatch(handleDeleteHolidayListClicked(obj))),
  handleDeleteHolidayListCancel: (obj) => (dispatch(handleDeleteHolidayListCancel(obj)))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HolidayLists));
