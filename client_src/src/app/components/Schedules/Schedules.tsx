import * as React from 'react';
import CalendarTable from '../CalendarTable/CalendarTable'
import DeleteAlert from '../Modal/DeleteAlert'
import { connect } from 'react-redux'
import { getSchedulesFromServer, submitDeleteScheduleToServer, handleDeleteScheduleClicked, handleDeleteScheduleCancel } from '../../actions'

interface IProps {
  schedules: any,
  getSchedules: any,
  history: any,
  submitDeleteScheduleToServer: any,
  schedulesReducer: any,
  handleDeleteScheduleClicked: any,
  handleDeleteScheduleCancel: any
}

class Schedules extends React.Component<IProps> {

  createTableData = () => {
    const {schedules} = this.props;
    return schedules.map((schedule, index) => {
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

  render() {
    const {schedulesReducer, handleDeleteScheduleCancel} = this.props
    let data = this.createTableData()
    let columnNames = ['Name', 'Active', '']
    return (
      <div>
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
    schedules: state.schedulesReducer.schedules,
    schedulesReducer: state.schedulesReducer
  }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  getSchedules: () => dispatch(getSchedulesFromServer()),
  submitDeleteScheduleToServer: (obj) => dispatch(submitDeleteScheduleToServer(obj)),
  handleDeleteScheduleClicked: (obj) => dispatch(handleDeleteScheduleClicked(obj)),
  handleDeleteScheduleCancel: () => dispatch(handleDeleteScheduleCancel())
})


export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
