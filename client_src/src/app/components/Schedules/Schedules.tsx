import * as React from 'react';
import CalendarTable from '../CalendarTable/CalendarTable'

import { connect } from 'react-redux'
import { getSchedulesFromServer, submitDeleteScheduleToServer } from '../../actions'

interface IProps {
  schedules: any,
  getSchedules: any,
  history: any,
  submitDeleteScheduleToServer: any
}

class Schedules extends React.Component<IProps> {

  createTableData = () => {
    const {schedules} = this.props;
    return schedules.map((schedule, index) => {
      return {id: schedule.id, name: schedule.name}
    })
  }

  getSchedules = () => {
    console.log('Getting Schedules')
    const { getSchedules } = this.props;
    getSchedules()
  }

  handleDeleteSchedule = (id) => {
    const { submitDeleteScheduleToServer } = this.props;
    submitDeleteScheduleToServer(id)
  }

  render() {
    let data = this.createTableData()
    let columnNames = ['name', 'active']
    return (
      <CalendarTable 
          data={data} 
          basePath={"schedules"} 
          populateTable={this.getSchedules} 
          orderBy={"name"} 
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
    schedules: state.schedulesReducer.schedules
  }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  getSchedules: () => dispatch(getSchedulesFromServer()),
  submitDeleteScheduleToServer: (obj) => dispatch(submitDeleteScheduleToServer(obj))
})


export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
