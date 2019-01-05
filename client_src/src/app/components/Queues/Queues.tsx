import * as React from 'react';
import CalendarTable from '../CalendarTable/CalendarTable';
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getQueuesFromServer, submitDeleteQueueToServer, submitOptionalPromptsToggle, handleCloseMessage } from '../../actions'
interface IProps {
  queuesReducer: any,
  getQueuesFromServer: any,
  submitDeleteQueueToServer: any,
  submitOptionalPromptsToggle: any,
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
        'Prompts': null,
        'Optional Prompts Toggle': queue.optional_prompt_enabled
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

  handleOptionalPromptsToggle = (id, bool) => {
    const { submitOptionalPromptsToggle } = this.props
    submitOptionalPromptsToggle({id, bool})
  }

  handleCloseMessage = () => {
    const { handleCloseMessage  } = this.props
    handleCloseMessage()
  }
  

  render() {
    let {message} = this.props.queuesReducer;
    let data = this.createTableData();
    let columnNames = ['Status', 'Name', 'County Code', 'Schedule Name', 'Holiday Name', 'Prompts','Optional Prompts Toggle', ''];

    if(this.props.queuesReducer.reload) {
      location.reload()
    }

    return (
      <div>
        <CalendarSnackbar
                handleClose = {this.handleCloseMessage}
                hideDuration = {6000}
                message = {message} 
            />
        <CalendarTable 
          data={data} 
          basePath={"queues"} 
          populateTable={this.getQueues} 
          orderBy={"Name"} 
          columnNames={columnNames}
          title={"Counties"}
          addButtonText={"Add Queue"}
          handleDelete={this.handleDeleteQueue}
          handleOptionalPromptsToggle={this.handleOptionalPromptsToggle}
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
    submitOptionalPromptsToggle: (obj) => dispatch(submitOptionalPromptsToggle(obj)),
    handleCloseMessage: () => (dispatch(handleCloseMessage()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Queues)