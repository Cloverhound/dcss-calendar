import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { submitUploadPromptToServer, updateTargetFile } from '../../actions'
import {
  Link
} from 'react-router-dom';

const styles = theme => createStyles({
  title: {
    margin: theme.spacing.unit,
  },
  optionalContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0px'
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    margin: theme.spacing.unit,
  }
});

interface IProps {
  submitUploadPromptToServer: any,
  updateTargetFile: any,
  promptsReducer: any,
  language: any,
  type: any,
  queueId: any,
  id: any,
  promptObj: any
}

class Prompt extends React.Component<WithStyles<typeof styles> & IProps> {

  handleInputChange = (e) => {
    const { updateTargetFile } = this.props
    updateTargetFile({ targetFile: e.target.files[0] })
  }

  handleSubmitUpload = (e) => {
    const { queueId, promptObj } = this.props
    const { promptsReducer, submitUploadPromptToServer } = this.props;
    e.preventDefault()
    const formData = new FormData();

    formData.append('file', promptsReducer.targetFile);
    formData.append('queueId', queueId);
    formData.append('language', promptObj.language);
    formData.append('type', promptObj.type);
    formData.append('enabled', "false");
    submitUploadPromptToServer(formData) 
  }

  render() {
    const { promptObj, classes } = this.props;
    let inputShow;
    if(!promptObj.id) {
      inputShow = <div className={classes.optionalContainer}>
                    <Typography className={classes.title} variant="body1">{promptObj.language}</Typography>
                    <input
                      ref={'optional-message-span'}
                      type='file'
                      onChange={(e) => this.handleInputChange(e)}
                    />
                    <Button
                      className={classes.button}
                      type='file'
                      variant='outlined'
                      onClick={(e) => this.handleSubmitUpload(e)}
                    >
                      Upload
                    </Button>
                  </div>
    } else {
      inputShow = <div className={classes.optionalContainer}>
                    <Typography className={classes.title} variant="body1">{promptObj.language}</Typography>
                    <Typography className={classes.title} variant="body1">{promptObj.name}</Typography>
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
                      Delete
                    </Button>
                  </div>
    }
   
    return (
      <div>
        {inputShow}
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
  submitUploadPromptToServer: (obj) => (dispatch(submitUploadPromptToServer(obj))),
  updateTargetFile: (obj) => (dispatch(updateTargetFile(obj)))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Prompt));