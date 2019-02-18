import * as React from 'react';
import CalendarTable from '../CalendarTable/CalendarTable';
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar';
import DeleteAlert from '../Modal/DeleteAlert'
import ToggleAlert from '../Modal/ToggleAlert'
import { getQueuesFromServer, submitDeleteQueueToServer, handleDeleteQueueClicked, handleDeleteQueueCancel, handleCloseMessage, resetPrompts, updateRoute, handleToggleForceClosedClicked, handleToggleQueueForceClosedCancel, submitQueueForceCloseToggle, handleToggleOptionalPromptsClicked, handleToggleOptionalPromptsCancel, submitOptionalPromptsToggle} from '../../actions'
import { connect } from 'react-redux'

interface IProps {
  queuesReducer: any,
  queueReducer: any,
  getQueuesFromServer: any,
  submitDeleteQueueToServer: any,
  handleDeleteQueueClicked: any,
  handleDeleteQueueCancel: any,
  handleCloseMessage: any,
  handleResetPrompts: any,
  history: any,
  handleUpdateRoute: any,
  handleToggleForceClosedClicked: any,
  handleToggleQueueForceClosedCancel: any,
  submitQueueForceCloseToggle: any,
  handleToggleOptionalPromptsClicked: any,
  handleToggleOptionalPromptsCancel: any,
  submitOptionalPromptsToggle: any
}

class Queues extends React.Component<IProps> {

  componentWillMount = () => {
    const {handleResetPrompts, handleUpdateRoute} = this.props;
    handleResetPrompts()
    handleUpdateRoute({url: '/'})
  }

  createTableData = () => {
    const { queuesReducer } = this.props;

    if(queuesReducer.queues.length == 0) {
      return []
    }
    
    return queuesReducer.queues.map((queue) => {
      let status = queue.county_status.status
      let message = ""
      if (queue.force_closed) {
        message = 'forced - closed'
      } else if (status === "open") {
        message = 'schedule - open'
      } else if (status === "closed") {
        message = 'schedule - closed'
      } else if (status === "holiday") {
        message = 'holiday - closed'
      }
      return { 
        'id': queue.id,
        'Status': {status, message},
        'Name': queue.name,
        'County Code': queue.county_code,
        'Lcsa Name': queue.lcsa ? queue.lcsa.lcsa_name: "",
        'Schedule Name': queue.schedule ? queue.schedule.name : "",
        'Holiday Name': queue.holidayList ? queue.holidayList.name : "",
        'Prompts': null,
        'Optional Prompts Toggle': queue.optional_prompt_enabled,
        'Force Closed / Flush Q': queue.force_closed
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

  handleToggleForceClosedClicked = (id, name, bool) => {
    const {handleToggleForceClosedClicked} = this.props
    console.log("handle forced closed clicked");
    handleToggleForceClosedClicked({id, name, bool})
  }
  
  handleQueueForceCloseToggle = () => {
    const { submitQueueForceCloseToggle, queuesReducer } = this.props
    console.log('queue toggle force close bool', queuesReducer.queueToggleForceClosedObj.bool)
    submitQueueForceCloseToggle({id: queuesReducer.queueToggleForceClosedObj.id, bool: queuesReducer.queueToggleForceClosedObj.bool})
  } 
  
  handleOptionalPromptsToggleClicked = (id, name, bool) => {
    const {handleToggleOptionalPromptsClicked} = this.props
    console.log("handle toggle optional prompts clicked");
    handleToggleOptionalPromptsClicked({id, name, bool})
  }

  handleOptionalPromptsToggle = () => {
    const { submitOptionalPromptsToggle, queuesReducer } = this.props
    console.log("handleOptionalPromptsToggle clicked");
    
    submitOptionalPromptsToggle({id: queuesReducer.queueToggleOptionalPromptsObj.id, bool: queuesReducer.queueToggleOptionalPromptsObj.bool})
  } 


  showMessage = () => {
    const {queuesReducer, queueReducer} = this.props
    if(queuesReducer.message.content.length) {
      return queuesReducer.message
    } else if (queueReducer.message.content.length) {
      return queueReducer.message
    }
  }

  render() {
    const { queuesReducer, handleToggleQueueForceClosedCancel, handleToggleOptionalPromptsCancel} = this.props
    let data = this.createTableData();
    let message = this.showMessage()
    let columnNames = ['Status', 'Name', 'County Code', 'Lcsa Name', 'Schedule Name', 'Holiday Name', 'Prompts', 'Optional Prompts Toggle', 'Force Closed / Flush Q', ''];
    return (
      <div>
        <CalendarSnackbar
          handleClose = {this.handleCloseMessage}
          hideDuration = {4000}
          message = {message} 
         />
        <DeleteAlert 
          entity={"Queue"} 
          open={queuesReducer.queueToDeleteID} 
          handleCancel={this.props.handleDeleteQueueCancel} 
          handleProceed={this.handleDeleteQueue}
        />
        <ToggleAlert 
          displayText={"Toggle Force Close for "}
          entity={`${queuesReducer.queueToggleForceClosedObj.name}`} 
          open={queuesReducer.queueToggleForceClosedObj.id} 
          handleCancel={handleToggleQueueForceClosedCancel} 
          handleProceed={this.handleQueueForceCloseToggle}
        />
        <ToggleAlert 
          displayText={"Toggle Optional Prompts for "}
          entity={`${queuesReducer.queueToggleOptionalPromptsObj.name}`} 
          open={queuesReducer.queueToggleOptionalPromptsObj.id} 
          handleCancel={handleToggleOptionalPromptsCancel} 
          handleProceed={this.handleOptionalPromptsToggle}
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
          handleToggle={this.handleToggleForceClosedClicked}
          handleOptionalToggle={this.handleOptionalPromptsToggleClicked}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    queuesReducer: state.queuesReducer,
    queueReducer: state.queueReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getQueuesFromServer: () => dispatch(getQueuesFromServer()),
    submitDeleteQueueToServer: (obj) => dispatch(submitDeleteQueueToServer(obj)),
    handleDeleteQueueClicked: (obj) => dispatch(handleDeleteQueueClicked(obj)),
    handleDeleteQueueCancel: () => dispatch(handleDeleteQueueCancel()),
    handleCloseMessage: () => (dispatch(handleCloseMessage())),
    handleResetPrompts: () => (dispatch(resetPrompts())),
    handleUpdateRoute: (obj) => (dispatch(updateRoute(obj))),
    handleToggleForceClosedClicked: (obj) => (dispatch(handleToggleForceClosedClicked(obj))),
    handleToggleQueueForceClosedCancel: () => (dispatch(handleToggleQueueForceClosedCancel())),
    submitQueueForceCloseToggle: (obj) => (dispatch(submitQueueForceCloseToggle(obj))),
    handleToggleOptionalPromptsClicked: (obj) => (dispatch(handleToggleOptionalPromptsClicked(obj))),
    handleToggleOptionalPromptsCancel: () => (dispatch(handleToggleOptionalPromptsCancel())),
    submitOptionalPromptsToggle: (obj) => dispatch(submitOptionalPromptsToggle(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Queues)
