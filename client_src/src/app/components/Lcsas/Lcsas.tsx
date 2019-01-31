import * as React from 'react';
import CalendarTable from '../CalendarTable/CalendarTable';
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar';
import { connect } from 'react-redux'
import DeleteAlert from '../Modal/DeleteAlert'
import { getLcsasFromServer, handleResetLcsa, handleCloseMessage, updateRoute, handleDeleteLcsaClicked, handleDeleteLcsaCancel, submitDeleteLcsaToServer } from '../../actions'

interface IProps {
  lcsasReducer: any,
  queueReducer: any,
  getLcsasFromServer: any,
  submitDeleteLcsaToServer: any,
  handleDeleteLcsaClicked: any,
  handleDeleteLcsaCancel: any,
  handleCloseMessage: any,
  handleResetLcsa: any,
  history: any,
  handleUpdateRoute: any
}

class Lcsas extends React.Component<IProps> {

  componentWillMount = () => {
    const {handleResetLcsa, handleUpdateRoute} = this.props;
    handleResetLcsa()
    handleUpdateRoute({url: '/lcsas'})
  }

  createTableData = () => {
    const { lcsasReducer } = this.props;

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

  handleDeleteLcsaClicked = (id) => {
    this.props.handleDeleteLcsaClicked({id})
  }

  handleDeleteLcsa = (id) => {
    console.log('Handling delete lcsa', this.props.lcsasReducer.lcsaToDeleteId)
    this.props.submitDeleteLcsaToServer({id: this.props.lcsasReducer.lcsaToDeleteId})
  }

  handleCloseMessage = () => {
    const { handleCloseMessage  } = this.props
    handleCloseMessage()
  }

  showMessage = () => {
    const {lcsasReducer, } = this.props
    if(lcsasReducer.message.content.length) {
      return lcsasReducer.message
    }
  }

  render() {
    let data = this.createTableData();
    let lcsasReducer = this.props.lcsasReducer
    let message = this.showMessage()
    let columnNames = ['Status', 'Lsca Id', 'Toggle', ''];
    return (
      <div>
        <CalendarSnackbar
          handleClose = {this.handleCloseMessage}
          hideDuration = {4000}
          message = {message} 
         /> 
        <DeleteAlert 
          entity={"Lcsa"} 
          open={lcsasReducer.lcsaToDeleteId} 
          handleCancel={this.props.handleDeleteLcsaCancel} 
          handleProceed={this.handleDeleteLcsa}
        />
        <CalendarTable 
          data={data} 
          basePath={"lcsas"} 
          populateTable={this.getQueues} 
          orderBy={"Name"} 
          columnNames={columnNames}
          title={"Lcsas"}
          addButtonText={"Add Lcsa"}
          handleDelete={this.handleDeleteLcsaClicked}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lcsasReducer: state.lcsasReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getLcsasFromServer: () => dispatch(getLcsasFromServer()),
    handleResetLcsa: () => (dispatch(handleResetLcsa())),
    handleCloseMessage: () => (dispatch(handleCloseMessage())),
    handleDeleteLcsaClicked: (obj) => dispatch(handleDeleteLcsaClicked(obj)),
    handleUpdateRoute: (obj) => (dispatch(updateRoute(obj))),
    handleDeleteLcsaCancel: () => dispatch(handleDeleteLcsaCancel()),
    submitDeleteLcsaToServer: (obj) => dispatch(submitDeleteLcsaToServer(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lcsas)
