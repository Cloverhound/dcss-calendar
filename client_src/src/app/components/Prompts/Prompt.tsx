import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { submitUpdatePromptToServer, updateTargetFile, submitDeletePromptToServer, submitClearPromptToServer } from '../../actions'
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
  submitUpdatePromptToServer: any,
  submitDeletePromptToServer: any,
  submitClearPromptToServer: any,
  updateTargetFile: any,
  promptsReducer: any,
  language: any,
  type: any,
  queueId: any,
  id: any,
  promptObj: any,
  name: any,
  file_path: any,
  index: any
}

class Prompt extends React.PureComponent<WithStyles<typeof styles> & IProps> {

  handleInputChange = (e) => {
    const { updateTargetFile } = this.props
    updateTargetFile({ targetFile: e.target.files[0] })
  }

  handleSubmitUpload = (e) => {
    const { id } = this.props
    const { promptsReducer, submitUpdatePromptToServer } = this.props;
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', promptsReducer.targetFile);
    formData.append('id', id);
    formData.append('enabled', "false");

    submitUpdatePromptToServer(formData) 
  }

  handleDelete(e) {
    e.preventDefault()
    const { submitDeletePromptToServer, id } = this.props
    submitDeletePromptToServer({id})
  }

  handleSubmitClear(e) {
    e.preventDefault()
    const { submitClearPromptToServer, id } = this.props
    submitClearPromptToServer({id})
  }

  render() {
    const { classes, language, name, file_path } = this.props;
    let inputShow;
    if(!file_path) {
      inputShow = <div className={classes.optionalContainer}>
                    <Typography className={classes.title} variant="body1">{language}</Typography>
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
                    <Typography className={classes.title} variant="body1">{language}</Typography>
                    <figure>
                      <figcaption>{name}</figcaption>
                      <audio
                          controls
                          src={`/${file_path}`}>
                              Your browser does not support the
                              <code>audio</code> element.
                      </audio>
                    </figure>
                    <Button
                      className={classes.button}
                      type='file'
                      variant='outlined'
                      onClick={(e) => this.handleSubmitClear(e)}
                    >
                      Clear
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
  submitUpdatePromptToServer: (obj) => (dispatch(submitUpdatePromptToServer(obj))),
  updateTargetFile: (obj) => (dispatch(updateTargetFile(obj))),
  submitDeletePromptToServer: (obj) => (dispatch(submitDeletePromptToServer(obj))),
  submitClearPromptToServer: (obj) => (dispatch(submitClearPromptToServer(obj)))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Prompt));