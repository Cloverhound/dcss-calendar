import * as React from 'react';
import EnhancedTable from '../Table/EnhancedTable/EnhancedTable';
import CalendarTable from '../CalendarTable/CalendarTable';

import { connect } from 'react-redux'
import { getQueuesFromServer, submitDeleteQueueToServer } from '../../actions'
interface IProps {
  queuesReducer: any,
  selected?: any,
  getQueuesFromServer: any,
  submitDeleteQueueToServer: any
}

class Queues extends React.Component<IProps> {

  componentWillMount = () => {
    this.getQueues()
  }

  createTableData = () => {
    console.log('Creating table data')
    const { queuesReducer } = this.props;

    return queuesReducer.array.map((el, index) => {
      return { 
      id: el.queue.id,
      'Status': el.queue.status,
      'Name': el.queue.name, 
      'Schedule Name': el.schedule.name,
      'Holiday Name': el.holidayList.name
      }
    })
  }

  getQueues = () => {
    console.log('Getting Queues');
    const { getQueuesFromServer } = this.props;
    getQueuesFromServer()
  }

  handleDeleteQueue = (id) => {
    console.log("Handling Delete Queue");
    const { submitDeleteQueueToServer } = this.props;
    submitDeleteQueueToServer({id})
  }

  render() {
    let data = this.createTableData();

    let columnNames = ['Status', 'Name', 'Schedule Name', 'Holiday Name', 'Prompt Status'];
    return (
      <div>
        {/* <EnhancedTable /> */}
        <CalendarTable 
          data={data} 
          basePath={"queues"} 
          populateTable={this.getQueues} 
          orderBy={"name"} 
          columnNames={columnNames}
          title={"Queues"}
          addButtonText={"Add Queue"}
          handleDelete={this.handleDeleteQueue}
        />
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
    submitDeleteQueueToServer: (obj) => dispatch(submitDeleteQueueToServer(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Queues)