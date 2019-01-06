import * as React from 'react';
import CalendarTable from '../CalendarTable/CalendarTable';

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getQueuesFromServer, submitDeleteQueueToServer, handleDeleteQueueClicked, handleDeleteCancel, handleCloseMessage } from '../../actions'
import DeleteAlert from '../Modal/DeleteAlert'
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar';
interface IProps {
  queuesReducer: any,
  getQueuesFromServer: any,
  submitDeleteQueueToServer: any,
  handleDeleteQueueClicked: any,
  handleDeleteCancel: any,
  handleCloseMessage: any
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
        'Prompt Status': null
      }
    })
  }

  getQueues = () => {
    this.props.getQueuesFromServer()
  }

  handleDeleteQueueClicked = (id) => {
    this.props.handleDeleteQueueClicked({id})
  }

  handleDeleteQueue = (id) => {
    console.log('Handling delete queue', this.props.queuesReducer.queueToDeleteID)
    this.props.submitDeleteQueueToServer({id: this.props.queuesReducer.queueToDeleteID})
  }

  handleCloseMessage = () => {
    const { handleCloseMessage  } = this.props
    handleCloseMessage()
  }

  render() {
    let data = this.createTableData();
    let queuesReducer = this.props.queuesReducer
    const { message } = queuesReducer;


    if(queuesReducer.reload) {
      location.reload()
    }

    let columnNames = ['Status', 'Name', 'County Code', 'Schedule Name', 'Holiday Name', 'Prompt Status', ''];
    console.log('Queue To Delete ID', queuesReducer.queueToDeleteID)
    return (
      <div>
        <CalendarSnackbar
          handleClose = {this.handleCloseMessage}
          hideDuration = {6000}
          message = {message} 
         />
        <DeleteAlert 
          entity={"Queue"} 
          open={queuesReducer.queueToDeleteID} 
          handleCancel={this.props.handleDeleteCancel} 
          handleProceed={this.handleDeleteQueue}
        />
        <CalendarTable 
          data={data} 
          basePath={"queues"} 
          populateTable={this.getQueues} 
          orderBy={"Name"} 
          columnNames={columnNames}
          title={"Counties"}
          addButtonText={"Add Queue"}
          handleDelete={this.handleDeleteQueueClicked}
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
    handleDeleteQueueClicked: (obj) => dispatch(handleDeleteQueueClicked(obj)),
    handleDeleteCancel: () => dispatch(handleDeleteCancel()),
    handleCloseMessage: () => (dispatch(handleCloseMessage()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Queues)