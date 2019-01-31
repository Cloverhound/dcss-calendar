import * as React from 'react';
import CalendarTable from '../CalendarTable/CalendarTable';
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar';
import { connect } from 'react-redux'
import DeleteAlert from '../Modal/DeleteAlert'
import { getLcsasFromServer, handleResetLcsa } from '../../actions'

interface IProps {
  lcsasReducer: any,
  queueReducer: any,
  getLcsasFromServer: any,
  submitDeleteQueueToServer: any,
  handleDeleteQueueClicked: any,
  handleDeleteQueueCancel: any,
  handleCloseMessage: any,
  handleResetLcsa: any,
  history: any,
  handleUpdateRoute: any
}

class Queues extends React.Component<IProps> {

  componentWillMount = () => {
    const {handleResetLcsa, handleUpdateRoute} = this.props;
    handleResetLcsa()
    // handleUpdateRoute({url: '/'})
  }

  createTableData = () => {
    const { lcsasReducer } = this.props;
    console.log("lcsasReducer", lcsasReducer);
    
    if(lcsasReducer.lcsas.length == 0) {
      return []
    }
    
    return lcsasReducer.lcsas.map((lcsa) => {
      return {
        'id': lcsa.id,
        'Lsca Id': lcsa.lcsa_id,
        'Status': lcsa.status
      }
    })
  }

  getQueues = () => {
    this.props.getLcsasFromServer()
  }

  handleDeleteQueueClicked = (id) => {
    // this.props.handleDeleteQueueClicked({id})
  }

  handleDeleteQueue = (id) => {
    // console.log('Handling delete queue', this.props.lcsasReducer.queueToDeleteID)
    // this.props.submitDeleteQueueToServer({id: this.props.lcsasReducer.queueToDeleteID})
  }

  handleCloseMessage = () => {
    const { handleCloseMessage  } = this.props
    handleCloseMessage()
  }

  showMessage = () => {
    // const {lcsasReducer, queueReducer} = this.props
    // if(lcsasReducer.message.content.length) {
    //   return lcsasReducer.message
    // } else if (queueReducer.message.content.length) {
    //   return queueReducer.message
    // }
  }

  render() {
    let data = this.createTableData();
    // let lcsasReducer = this.props.lcsasReducer
    // let message = this.showMessage()
    let columnNames = ['Status', 'Lsca Id', 'Toggle', ''];
    return (
      <div>
        {/* <CalendarSnackbar
          handleClose = {this.handleCloseMessage}
          hideDuration = {4000}
          message = {message} 
         />
        <DeleteAlert 
          entity={"Queue"} 
          open={lcsasReducer.queueToDeleteID} 
          handleCancel={this.props.handleDeleteQueueCancel} 
          handleProceed={this.handleDeleteQueue}
        /> */}
        <CalendarTable 
          data={data} 
          basePath={"lcsas"} 
          populateTable={this.getQueues} 
          orderBy={"Name"} 
          columnNames={columnNames}
          title={"Lcsas"}
          addButtonText={"Add Lcsa"}
          handleDelete={this.handleDeleteQueueClicked}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lcsasReducer: state.lcsasReducer,
    // queueReducer: state.queueReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getLcsasFromServer: () => dispatch(getLcsasFromServer()),
    handleResetLcsa: () => (dispatch(handleResetLcsa())),
    // submitDeleteQueueToServer: (obj) => dispatch(submitDeleteQueueToServer(obj)),
    // handleDeleteQueueClicked: (obj) => dispatch(handleDeleteQueueClicked(obj)),
    // handleDeleteQueueCancel: () => dispatch(handleDeleteQueueCancel()),
    // handleCloseMessage: () => (dispatch(handleCloseMessage())),
    // handleUpdateRoute: (obj) => (dispatch(updateRoute(obj)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Queues)
