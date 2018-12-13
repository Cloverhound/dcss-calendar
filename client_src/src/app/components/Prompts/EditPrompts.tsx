import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { getPromptsFromServer, getPromptFromServer, submitUploadPromptToServer, getPromptsWithQueueIdFromServer, updateTargetFile } from '../../actions'
import {
  Link
} from 'react-router-dom';

const styles = theme => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    // marginTop: '65px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
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
  arrowContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    backgroundColor: '#3f51b5;',
    borderRadius: "5px 5px 0 0"
  },
  arrow: {
    margin: '10px',
    fill: 'white',
    "&:hover": {
      cursor: 'pointer'
    },
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
    flexDirection: 'column'
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
  tabs: {
    margin: "0px 0px 15px 0px"
  }
});

interface IProps {
  click: any,
  submitUploadPromptToServer: any,
  getPromptsFromServer: any,
  getPromptFromServer: any,
  getPromptsWithQueueIdFromServer: any,
  updateTargetFile: any,
  promptsReducer: any,
  match: any
}

class EditPrompts extends React.Component<WithStyles<typeof styles> & IProps> {

  componentWillMount = () => {
    const { getPromptsWithQueueIdFromServer } = this.props;
    getPromptsWithQueueIdFromServer(JSON.parse(this.props.match.params.id))
  }

  handleInputChange = (e) => {
    const { updateTargetFile } = this.props
    updateTargetFile({ targetFile: e.target.files[0] })
  }

  handleSubmitUpload = (e) => {
    e.preventDefault()
    const { promptsReducer, submitUploadPromptToServer } = this.props;
    const formData = new FormData();
    formData.append('file', promptsReducer.targetFile);

    submitUploadPromptToServer(formData)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form className={classes.form}>
            <Typography className={classes.title} variant="title">Edit Prompts</Typography>
            <div className={classes.uploadSection}>
              <Typography className={classes.subTitle} variant="subtitle1">Office Directions</Typography>
              <Paper className={classes.optionalWrapper}>
                <div className={classes.optionalContainer}>
                  <Typography className={classes.title} variant="body1">English</Typography>
                  <input 
                    ref={'optional-message-eng'}
                    type='file'
                    onChange={(e) => this.handleInputChange(e)}
                    accept="audio/*"
                  />
                  <Button
                    className={classes.button}
                    type='file'
                    variant='outlined'
                    onClick={(e) => this.handleSubmitUpload(e)}
                  >
                    Preview
                  </Button>
                  <Button
                    className={classes.button}
                    type='file'
                    variant='outlined'
                    onClick={(e) => this.handleSubmitUpload(e)}
                  >
                    Upload
                  </Button>
                  <Button
                    className={classes.button}
                    type='file'
                    variant='outlined'
                  >
                   Delete
                  </Button>
                </div>
                <div className={classes.optionalContainer}>
                  <Typography className={classes.title} variant="body1">Spanish</Typography>
                    <input 
                      ref={'optional-message-span'}
                      type='file'
                    />
                    <Button
                    className={classes.button}
                    type='file'
                    variant='outlined'
                  >
                    Preview
                  </Button>
                  <Button
                    className={classes.button}
                    type='file'
                    variant='outlined'
                  >
                    Upload
                  </Button>
                  <Button
                    className={classes.button}
                    type='file'
                    variant='outlined'
                  >
                   Delete
                  </Button>
                </div>
              </Paper>
            </div>

            <div className={classes.uploadSection}>
            <Typography className={classes.subTitle} variant="subtitle1">Optional Introduction Announcements</Typography>
              <Paper className={classes.optionalWrapper}>
                <div className={classes.optionalContainer}>
                  <Typography className={classes.title} variant="body1">English</Typography>
                  <input 
                    ref={'optional-message-eng'}
                    type='file'
                    onChange={(e) => this.handleInputChange(e)}
                  />
                   <Button
                    className={classes.button}
                    type='file'
                    variant='outlined'
                  >
                    Preview
                  </Button>
                  <Button
                    className={classes.button}
                    type='file'
                    variant='outlined'
                  >
                    Upload
                  </Button>
                  <Button
                    className={classes.button}
                    type='file'
                    variant='outlined'
                  >
                   Delete
                  </Button>
                </div>
                <div className={classes.optionalContainer}>
                  <Typography className={classes.title} variant="body1">Spanish</Typography>
                    <input 
                      ref={'optional-message-span'}
                      type='file'
                    />
                     <Button
                    className={classes.button}
                    type='file'
                    variant='outlined'
                  >
                    Preview
                  </Button>
                  <Button
                    className={classes.button}
                    type='file'
                    variant='outlined'
                  >
                    Upload
                  </Button>
                  <Button
                    className={classes.button}
                    type='file'
                    variant='outlined'
                  >
                   Delete
                  </Button>
                </div>
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
  submitUploadPromptToServer: (obj) => (dispatch(submitUploadPromptToServer(obj))),
  updateTargetFile: (obj) => (dispatch(updateTargetFile(obj)))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditPrompts));