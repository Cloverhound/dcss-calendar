import * as React from 'react';
import CalendarTable from '../CalendarTable/CalendarTable';

import { connect } from 'react-redux'
import { getQueuesFromServer, submitDeleteQueueToServer } from '../../actions'
interface IProps {
  queuesReducer: any,
  getQueuesFromServer: any,
  submitDeleteQueueToServer: any
}

class Queues extends React.Component<IProps> {

  createTableData = () => {
    const { queuesReducer } = this.props;

    if(queuesReducer.queues.length == 0) {
      return []
    }

    return queuesReducer.queues.map((queue) => {
      return { 
        'id': queue.id,
        'Status': queue.status,
        'Name': queue.name, 
        'Schedule Name': queue.schedule.name,
        'Holiday Name': queue.holidayList.name,
        'Prompt Status': null
      }
    })
  }

  getQueues = () => {
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