import * as React from 'react';
import CalendarTable from '../CalendarTable/CalendarTable'
import DeleteAlert from '../Modal/DeleteAlert'
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar';
import { connect } from 'react-redux'
import { getSchedulesFromServer, submitDeleteScheduleToServer, handleDeleteScheduleClicked, handleDeleteScheduleCancel, handleCloseMessage } from '../../actions'

interface IProps {
  schedules: any,
  getSchedules: any,
  history: any,
  submitDeleteScheduleToServer: any,
  schedulesReducer: any,
  scheduleReducer: any,
  handleDeleteScheduleClicked: any,
  handleDeleteScheduleCancel: any,
  handleCloseMessage: any
}

class Schedules extends React.Component<IProps> {

  createTableData = () => {
    const {schedulesReducer} = this.props;
    return schedulesReducer.schedules.map((schedule, index) => {
      return {id: schedule.id, Name: schedule.name}
    })
  }

  getSchedules = () => {
    console.log('Getting Schedules')
    const { getSchedules } = this.props;
    getSchedules()
  }

  handleDeleteScheduleClicked = (id) => {
    this.props.handleDeleteScheduleClicked({id})
  }

  handleDeleteSchedule = () => {
    const {schedulesReducer, submitDeleteScheduleToServer} = this.props
    console.log('Handling delete schedule', schedulesReducer.scheduleToDeleteID)
    submitDeleteScheduleToServer({id: schedulesReducer.scheduleToDeleteID})
  }

  handleCloseMessage = () => {
    const { handleCloseMessage  } = this.props
    handleCloseMessage()
  }

  showMessage = () => {
    const {schedulesReducer, scheduleReducer} = this.props
    if(schedulesReducer.message.content.length) {
      return schedulesReducer.message
    } else if (scheduleReducer.message.content.length) {
      return scheduleReducer.message
    }
  }

  render() {
    const {schedulesReducer, scheduleReducer, handleDeleteScheduleCancel} = this.props
    let data = this.createTableData()
    let columnNames = ['Name', 'Active', '']
    let message = this.showMessage()
    return (
      <div>
        <CalendarSnackbar
          handleClose = {this.handleCloseMessage}
          hideDuration = {4000}
          message = {message} 
         />
        <DeleteAlert 
          entity={"Schedule"} 
          open={schedulesReducer.scheduleToDeleteID} 
          handleCancel={handleDeleteScheduleCancel} 
          handleProceed={this.handleDeleteSchedule}
        />
        <CalendarTable 
            data={data} 
            basePath={"schedules"} 
            populateTable={this.getSchedules} 
            orderBy={"Name"}
            columnNames={columnNames}
            title={"Schedules"}
            addButtonText={"Add Schedule"}
            handleDelete={this.handleDeleteScheduleClicked}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    scheduleReducer: state.scheduleReducer,
    schedulesReducer: state.schedulesReducer
  }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  getSchedules: () => dispatch(getSchedulesFromServer()),
  submitDeleteScheduleToServer: (obj) => dispatch(submitDeleteScheduleToServer(obj)),
  handleDeleteScheduleClicked: (obj) => dispatch(handleDeleteScheduleClicked(obj)),
  handleDeleteScheduleCancel: () => dispatch(handleDeleteScheduleCancel()),
  handleCloseMessage: () => (dispatch(handleCloseMessage()))
})


export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
