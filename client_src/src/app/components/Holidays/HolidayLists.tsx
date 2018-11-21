import * as React from 'react';
import { connect } from 'react-redux'

import CalendarTable from '../CalendarTable/CalendarTable'
import { getHolidayListsFromServer, submitDeleteHolidayListToServer } from '../../actions'

interface IProps {
  holidayLists: any,
  getHolidayLists: any,
  deleteHolidayList: any
}
 
class HolidayLists extends React.Component<IProps> {

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

  render() {
    let data = this.createTableData()
    let columnNames = ['name', 'active']
    return (
      <CalendarTable 
          data={data} 
          basePath={"holiday_lists"} 
          populateTable={this.handleGetHolidayLists} 
          orderBy={"name"} 
          columnNames={columnNames}
          title={"Holiday Lists"}
          addButtonText={"Add Holiday List"}
          handleDelete={this.handleDeleteHolidayList}
      />
    )
  }

}

const mapStateToProps = state => {
  return {
    holidayLists: state.holidayListsReducer.holidayLists
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getHolidayLists: () => dispatch(getHolidayListsFromServer()),
  deleteHolidayList: (obj) => dispatch(submitDeleteHolidayListToServer(obj))
})


export default connect(mapStateToProps, mapDispatchToProps)(HolidayLists);
