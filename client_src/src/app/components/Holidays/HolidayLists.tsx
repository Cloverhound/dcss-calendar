import * as React from 'react';
import { connect } from 'react-redux'

import CalendarTable from '../CalendarTable/CalendarTable'
import { requestGetHolidayLists } from '../../actions'


interface IProps {
  holidayLists: any,
  getHolidayLists: any
}

class HolidayLists extends React.Component<IProps> {

  addHolidayList = () => {
    console.log('Adding holiday list')
  }

  createTableData = () => {
    console.log('Creating table data', this.props)
    const {holidayLists} = this.props;
    return holidayLists.map((holidayList, index) => {
      return {id: index, name: holidayList.name}
    })
  }

  getHolidayLists = () => {
    console.log('Getting holiday lists')
    const { getHolidayLists } = this.props;
    getHolidayLists()
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
