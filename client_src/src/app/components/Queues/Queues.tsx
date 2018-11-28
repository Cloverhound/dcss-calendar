import * as React from 'react';
import EnhancedTable from '../Table/EnhancedTable/EnhancedTable';
import CalendarTable from '../CalendarTable/CalendarTable';

import { connect } from 'react-redux'
import { getQueuesFromServer } from '../../actions'
interface IProps {
  queuesReducer: any,
  selected?: any,
  getQueuesFromServer: any,
}

class Queues extends React.Component<IProps> {

  componentWillMount = () => {
    this.getQueues()
  }

  createTableData = () => {
    console.log('Creating table data')
    const { queuesReducer } = this.props;
    // return queues.map((schedule, index) => {
    //   return {id: schedule.id, name: schedule.name}
    // })
  }

  getQueues = () => {
    console.log('Getting Queues');
    const { getQueuesFromServer } = this.props;
    getQueuesFromServer()
  }

  render() {
    let data = this.createTableData();
    let columnNames = ['name', 'active'];
    return (
      <div>
        <EnhancedTable />
        {/* <CalendarTable 
          data={data} 
          basePath={"schedules"} 
          populateTable={this.getQueues} 
          orderBy={"name"} 
          columnNames={columnNames}
          title={"Schedules"}
          addButtonText={"Add Schedule"}
          handleDelete={this.handleDeleteQueue}
        /> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    queuesReducer: state.queuesReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getQueuesFromServer: () => dispatch(getQueuesFromServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Queues)