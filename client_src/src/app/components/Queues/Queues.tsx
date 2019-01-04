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
        'County Code': queue.county_code,
        'Schedule Name': queue.schedule.name,
        'Holiday Name': queue.holidayList.name,
        'Prompts': null,
        'Optional Prompts Toggle': null
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

    let columnNames = ['Status', 'Name', 'County Code', 'Schedule Name', 'Holiday Name', 'Prompts','Optional Prompts Toggle', ''];
    return (
      <div>
        <CalendarTable 
          data={data} 
          basePath={"queues"} 
          populateTable={this.getQueues} 
          orderBy={"Name"} 
          columnNames={columnNames}
          title={"Counties"}
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