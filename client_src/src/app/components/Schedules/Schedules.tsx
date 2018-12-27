import * as React from 'react';
import CalendarTable from '../CalendarTable/CalendarTable'

import { connect } from 'react-redux'
import { getSchedulesFromServer, requestScheduleDelete } from '../../actions'

interface IProps {
  schedules: any,
  getSchedules: any,
  history: any,
  requestScheduleDelete: any
}

class Schedules extends React.Component<IProps> {

  componentWillMount = () => {
    this.getSchedules()
  }

  createTableData = () => {
    console.log('Creating table data')
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

  handleDeleteSchedule = (id) => {
    const { requestScheduleDelete } = this.props;
    requestScheduleDelete(id)
  }

  render() {
    let data = this.createTableData()
    let columnNames = ['Name', 'Active']
    return (
      <CalendarTable 
          data={data} 
          basePath={"schedules"} 
          populateTable={this.getSchedules} 
          orderBy={"Name"} 
          columnNames={columnNames}
          title={"Schedules"}
          addButtonText={"Add Schedule"}
          handleDelete={this.handleDeleteSchedule}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    schedules: state.scheduleReducer.schedules
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getSchedules: () => dispatch(getSchedulesFromServer()),
  requestScheduleDelete: (obj) => dispatch(requestScheduleDelete(obj))
})


export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
