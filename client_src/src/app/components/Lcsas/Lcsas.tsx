import * as React from 'react';
import CalendarTable from '../CalendarTable/CalendarTable';
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar';
import { connect } from 'react-redux'
import DeleteAlert from '../Modal/DeleteAlert'
import ToggleAlert from '../Modal/ToggleAlert'
import { getLcsasFromServer, handleResetLcsa, handleCloseMessage, updateRoute, handleDeleteLcsaClicked, handleToggleLcsaBcpActiveClicked, handleToggleLcsaBcpActiveCancel, submitLcsaToggle, handleDeleteLcsaCancel, submitDeleteLcsaToServer } from '../../actions'

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
  handleUpdateRoute: any,
  handleToggleLcsaBcpActiveClicked: any,
  handleToggleLcsaBcpActiveCancel: any,
  submitLcsaToggle: any
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
        'Lcsa Name': lcsa.lcsa_name,
        'Status': lcsa.lcsa_enabled ? {status:"closed", message:"lcsa toggled closed"} : {status: "open", message: "lcsa toggled open"},
        'Lcsa Id': lcsa.lcsa_id,
        'BCP Active': lcsa.lcsa_enabled
      }
    })
  }

  getQueues = () => {
    this.props.getLcsasFromServer()
  }

  handleDeleteLcsaClicked = (id) => {
    this.props.handleDeleteLcsaClicked({id})
  }

  handleToggleLcsaBcpActiveClicked = (id, bool) => {
    this.props.handleToggleLcsaBcpActiveClicked({id, bool})
  }

  handleLcsaToggle = () => {
    const { submitLcsaToggle, lcsasReducer } = this.props
    console.log('lcsa toggle bool', lcsasReducer.lcsaToggleBcpActiveObj.bool)
    submitLcsaToggle({id: lcsasReducer.lcsaToggleBcpActiveObj.id, bool: lcsasReducer.lcsaToggleBcpActiveObj.bool})
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
    const { lcsasReducer } = this.props
    if(lcsasReducer.message.content.length) {
      return lcsasReducer.message
    }
  }

  render() {
    let {lcsasReducer} = this.props
    let data = this.createTableData();
    let message = this.showMessage()
    let columnNames = ['Status', 'Lcsa Name', 'Lcsa Id', 'BCP Active', ''];
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
        <ToggleAlert 
          entity={`Lcsa Id ${lcsasReducer.lcsaToggleBcpActiveObj.id}`} 
          open={lcsasReducer.lcsaToggleBcpActiveObj.id} 
          handleCancel={this.props.handleToggleLcsaBcpActiveCancel} 
          handleProceed={this.handleLcsaToggle}
        />
        <CalendarTable 
          data={data} 
          basePath={"lcsas"} 
          populateTable={this.getQueues} 
          orderBy={"Lcsa Id"} 
          columnNames={columnNames}
          title={"Lcsa Ids"}
          addButtonText={"Add Lcsa"}
          handleDelete={this.handleDeleteLcsaClicked}
          handleToggle={this.handleToggleLcsaBcpActiveClicked}
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
    handleToggleLcsaBcpActiveClicked: (obj) => dispatch(handleToggleLcsaBcpActiveClicked(obj)),
    handleToggleLcsaBcpActiveCancel: (obj) => dispatch(handleToggleLcsaBcpActiveCancel(obj)),
    submitLcsaToggle: (obj) => dispatch(submitLcsaToggle(obj)),
    handleDeleteLcsaClicked: (obj) => dispatch(handleDeleteLcsaClicked(obj)),
    handleUpdateRoute: (obj) => (dispatch(updateRoute(obj))),
    handleDeleteLcsaCancel: () => dispatch(handleDeleteLcsaCancel()),
    submitDeleteLcsaToServer: (obj) => dispatch(submitDeleteLcsaToServer(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lcsas)
