import * as React from 'react';
import { connect } from 'react-redux'

import CalendarTable from '../CalendarTable/CalendarTable'
import { requestGetSchedules } from '../../actions'


interface IProps {
  schedules: any,
  getSchedules: any
}

class Schedules extends React.Component<IProps> {

  // Note: Can remove after React router is moved to Redux/ redux-saga
  componentDidMount = () => {
    this.getSchedules()
  }

  createTableData = () => {
    console.log('Creating table data')
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

  handleEditHolidayList = (holidayListId) => {
    console.log('Handling Edit Holiday List', holidayListId)
    // window.location.href = '/holiday_lists/' + holidayListId + '/edit'
  }

  render() {
    let data = this.createTableData()
    let columnNames = ['name', 'active']
    return (
      <CalendarTable 
          data={data} 
          addRowLink={"/schedule/new"} 
          populateTable={this.getSchedules} 
          orderBy={"name"} 
          columnNames={columnNames}
          title={"Schedules"}
          addTitle={"Add Schedule"}
          handleEdit={this.handleEditHolidayList}
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
  getSchedules: () => dispatch(requestGetSchedules())
})


export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
