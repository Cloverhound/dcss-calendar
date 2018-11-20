import * as React from 'react';
import { connect } from 'react-redux'

import CalendarTable from '../CalendarTable/CalendarTable'
import { requestGetHolidayLists } from '../../actions'


interface IProps {
  holidayLists: any,
  getHolidayLists: any
}

class HolidayLists extends React.Component<IProps> {

  createTableData = () => {
    console.log('Creating table data', this.props)
    const {holidayLists} = this.props;
    return holidayLists.map((holidayList, index) => {
      return {id: holidayList.id, name: holidayList.name}
    })
  }

  getHolidayLists = () => {
    console.log('Getting holiday lists')
    const { getHolidayLists } = this.props;
    getHolidayLists()
  }

  handleEditHolidayList = (holidayListId) => {
    console.log('Handling Edit Holiday List', holidayListId)
    window.location.href = '/holiday_lists/' + holidayListId + '/edit'
  }

  render() {
    let data = this.createTableData()
    let columnNames = ['name', 'active']
    return (
      <CalendarTable 
          data={data} 
          addRowLink={"/holiday_lists/new"} 
          populateTable={this.getHolidayLists} 
          orderBy={"name"} 
          columnNames={columnNames}
          title={"Holiday Lists"}
          addTitle={"Add Holiday List"}
          handleEdit={this.handleEditHolidayList}
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
  // addHolidayList: () => dispatch(addHolidayList()),
  getHolidayLists: () => dispatch(requestGetHolidayLists())
})


export default connect(mapStateToProps, mapDispatchToProps)(HolidayLists);
