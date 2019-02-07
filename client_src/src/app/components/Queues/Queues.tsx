import * as React from 'react';
import CalendarTable from '../CalendarTable/CalendarTable';
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar';
import { connect } from 'react-redux'
import DeleteAlert from '../Modal/DeleteAlert'
import { getQueuesFromServer, submitDeleteQueueToServer, handleDeleteQueueClicked, handleDeleteQueueCancel, handleCloseMessage, resetPrompts, updateRoute} from '../../actions'

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
  handleUpdateRoute: any
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
        if(status === "open") {
          message = 'scheduled - open'
        } else if (status === "closed") {
          message = 'scheduled - closed'
        } else if (status === "holiday") {
          message = 'holiday - closed'
      }
      return { 
        'id': queue.id,
        'Status': {status, message},
        'Name': queue.name,
        'County Code': queue.county_code,
        'Lcsa Id': queue.lcsaId,
        'Schedule Name': queue.schedule? queue.schedule.name : "",
        'Holiday Name': queue.holidayList ? queue.holidayList.name : "",
        'Prompts': null,
        'Optional Prompts Toggle': queue.optional_prompt_enabled
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

  showMessage = () => {
    const {queuesReducer, queueReducer} = this.props
    if(queuesReducer.message.content.length) {
      return queuesReducer.message
    } else if (queueReducer.message.content.length) {
      return queueReducer.message
    }
  }

  render() {
    let data = this.createTableData();
    let queuesReducer = this.props.queuesReducer
    let message = this.showMessage()
    let columnNames = ['Status', 'Name', 'County Code', 'Lcsa Id', 'Schedule Name', 'Holiday Name', 'Prompts', 'Optional Prompts Toggle', ''];
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
    handleUpdateRoute: (obj) => (dispatch(updateRoute(obj)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Queues)
