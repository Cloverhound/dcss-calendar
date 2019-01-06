import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import CalendarSnackbar  from '../CalendarSnackbar/CalendarSnackbar';
import Prompt from './Prompt'
import { connect } from 'react-redux';
import { getPromptsFromServer, getPromptFromServer, getPromptsWithQueueIdFromServer, submitNewOfficePromptsToServer, submitDeletePromptRowsToServer, handleCloseMessage } from '../../actions'
import {
  Link
} from 'react-router-dom';

const styles = theme => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    // marginTop: '65px',
  },
  title: {
    margin: theme.spacing.unit,
  },
  subTitle: {
    margin: theme.spacing.unit,
  },
  uploadSection: {
    margin: '20px 0px',
  },
  uploadSection2: {
    margin: '20px 45px 20px 0px',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px',
    maxWidth: '850px',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 200,
  },
  optionalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: "100%"
  },
  paperWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '15px 0px'
  },
  optionalContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0px'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    margin: theme.spacing.unit,
  },
  addIconContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
  submitCancelContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '50px',
  },
  addButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
});

interface IProps {
  click: any,
  getPromptsFromServer: any,
  getPromptFromServer: any,
  getPromptsWithQueueIdFromServer: any,
  promptsReducer: any,
  match: any,
  submitNewOfficePromptsToServer: any,
  submitDeletePromptRowsToServer: any,
  handleCloseMessage: any
}

class EditPrompts extends React.Component<WithStyles<typeof styles> & IProps> {

  componentWillMount = () => {
    const { getPromptsWithQueueIdFromServer } = this.props;
    getPromptsWithQueueIdFromServer(JSON.parse(this.props.match.params.id))
  }

  handleSubmitNewOfficePrompts = () => {
    const { submitNewOfficePromptsToServer } = this.props;
    let queueId = JSON.parse(this.props.match.params.id)
    submitNewOfficePromptsToServer({queueId})
  }

  handleDeletePromptRows = (rows) => {
    const { submitDeletePromptRowsToServer } = this.props;
    const idEng = rows[0].props.id
    const idSpan = rows[1].props.id

    if(!rows[0].props.file_path && !rows[1].props.file_path && rows[0].props.index != 0){
      submitDeletePromptRowsToServer({queueId: rows[0].props.queueId, rows: {row1: idEng, row2: idSpan}})
    }
  }

  officeDirectionPrompts = () => {
    const { classes, promptsReducer, match } = this.props;
    const { office_directions } = promptsReducer;
    let queueId = JSON.parse(match.params.id);
    return office_directions.map(nestedArray => {
     let rows = nestedArray.map(prompt => {
        if(prompt.language === "English") {
          return <Prompt queueId={queueId} id={prompt.id} index={prompt.index} language={"English"} type={prompt.type} name={prompt.name} file_path={prompt.file_path}/>
        } else if (prompt.language === "Spanish") {
          return <Prompt queueId={queueId} id={prompt.id} index={prompt.index} language={"Spanish"} type={prompt.type} name={prompt.name} file_path={prompt.file_path}/>
        }
      })
      return  <div className={classes.paperWrapper}>
                <Paper className={classes.optionalWrapper}>
                  {rows}
                </Paper>
                <div className={classes.addButton}>
                <Tooltip title="Delete">
                  <IconButton onClick={() => this.handleDeletePromptRows(rows)} aria-label="Delete Prompt Row">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                </div>
              </div>
      
    })
  }

  handleCloseMessage = () => {
    const { handleCloseMessage  } = this.props
    handleCloseMessage()
  }

  render() {
    const { classes, promptsReducer, match } = this.props;
    const { optional_announcements_eng, optional_announcements_span, message } = promptsReducer;
    let queueId = JSON.parse(match.params.id);
    let office_directions = this.officeDirectionPrompts()
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form className={classes.form}>
            <Typography className={classes.title} variant="title">Edit Prompts</Typography>

            <CalendarSnackbar
              handleClose = {this.handleCloseMessage}
              hideDuration = {3000}
              message = {message} 
            />

            <div className={classes.uploadSection}>
              <Typography className={classes.subTitle} variant="subtitle1">Office Directions</Typography>
                {office_directions}
              <div className={classes.addIconContainer}>
            {/* {loading ? <CircularProgress className={classes.progress} /> : null} */}
                <Button onClick={this.handleSubmitNewOfficePrompts}variant="fab" color="secondary" aria-label="Add" className={classes.button}>
                  <AddIcon />
                </Button>
              </div>
            </div>
            <div className={classes.uploadSection2}>
            <Typography className={classes.subTitle} variant="subtitle1">Optional Introduction Announcements</Typography>
              <Paper className={classes.optionalWrapper}>
                <Prompt queueId={queueId} id={optional_announcements_eng.id} language={"English"} type={optional_announcements_eng.type} name={optional_announcements_eng.name} file_path={optional_announcements_eng.file_path}/>
                <Prompt queueId={queueId} id={optional_announcements_span.id} language={"Spanish"} type={optional_announcements_span.type} name={optional_announcements_span.name} file_path={optional_announcements_span.file_path}/>
              </Paper>
            </div>
            <div className={classes.submitCancelContainer}>
              <Link to="/">
                <Button variant="outlined" color="primary" className={classes.button}>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    promptsReducer: state.promptsReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPromptsFromServer: () => (dispatch(getPromptsFromServer())),
  getPromptFromServer: (obj) => (dispatch(getPromptFromServer(obj))),
  getPromptsWithQueueIdFromServer: (obj) => (dispatch(getPromptsWithQueueIdFromServer(obj))),
  submitNewOfficePromptsToServer: (obj) => (dispatch(submitNewOfficePromptsToServer(obj))),
  submitDeletePromptRowsToServer: (obj) => (dispatch(submitDeletePromptRowsToServer(obj))),
  handleCloseMessage: () => (dispatch(handleCloseMessage()))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditPrompts));
