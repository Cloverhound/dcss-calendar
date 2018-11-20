import * as React from 'react';
import { connect } from 'react-redux'

import CalendarTable from '../CalendarTable/CalendarTable'
import { requestGetHolidayLists, requestDeleteHolidayList } from '../../actions'


interface IProps {
  holidayLists: any,
  getHolidayLists: any,
  deleteHolidayList: any
}
 
class HolidayLists extends React.Component<IProps> {

  createTableData = () => {
    console.log('Creating table data', this.props)
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

  handleEditHolidayList = (holidayListId) => {
    console.log('Handling Edit Holiday List', holidayListId)
    window.location.href = '/holiday_lists/' + holidayListId + '/edit'
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
          addRowLink={"/holiday_lists/new"} 
          populateTable={this.handleGetHolidayLists} 
          orderBy={"name"} 
          columnNames={columnNames}
          title={"Holiday Lists"}
          addTitle={"Add Holiday List"}
          handleEdit={this.handleEditHolidayList}
          handleDelete={this.handleDeleteHolidayList}
          deleteButtonText={"Delete Holiday List"}
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
  getHolidayLists: () => dispatch(requestGetHolidayLists()),
  deleteHolidayList: (obj) => dispatch(requestDeleteHolidayList(obj))
})


export default connect(mapStateToProps, mapDispatchToProps)(HolidayLists);
