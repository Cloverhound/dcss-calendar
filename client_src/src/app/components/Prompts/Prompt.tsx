import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import Save from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { connect } from 'react-redux';
import { submitUpdatePromptToServer, updateTargetFile, submitDeletePromptToServer, submitClearPromptToServer } from '../../actions'
import {
  Link
} from 'react-router-dom';
import { any } from 'prop-types';

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

interface IState {
  myRef: any,
  isIE: any
}

class Prompt extends React.Component<WithStyles<typeof styles> & IProps, IState> {

  constructor(props) {
   super(props)
    this.state = {
      isIE: false,
      myRef: React.createRef()
    }
 }

  
  componentWillMount = () => {
    this.isIE11()
  }

  isIE11() {
    var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
    var msie = ua.indexOf('MSIE '); // IE 10 or older
    var trident = ua.indexOf('Trident/'); //IE 11
    console.log("msie", msie)
    console.log("trident", trident)
    if (msie > 0 || trident > 0){
      this.setState({isIE: true})
    }
  }

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
    submitUpdatePromptToServer(formData) 
  }

  handleDelete = (e) => {
    e.preventDefault()
    const { submitDeletePromptToServer, id } = this.props
    submitDeletePromptToServer({id})
  }

  handleSubmitClear = (e) => {
    e.preventDefault()
    const { submitClearPromptToServer, id } = this.props
    submitClearPromptToServer({id})
  }

  handleBlob = () => {
    const { classes, language, name, file_path } = this.props;
    console.log(file_path);
    
    let blobObject = new Blob([`/${file_path}`])
    window.navigator.msSaveBlob(blobObject, `${name}`)
    // var blobObject = new Blob(["I scream. You scream. We all scream for ice cream."]);

    // window.navigator.msSaveBlob(blobObject, 'msSaveBlob_testFile.txt');
    // const fileReader = new FileReader
    //fileReader.readAsArrayBuffer(`/${file_path}`)
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
                    <Tooltip title="Upload">
                      <IconButton onClick={(e) => this.handleSubmitUpload(e)}>
                        <SvgIcon color="action">
                          <path d="M5,10h4v6h6v-6h4l-7-7L5,10z M5,18v2h14v-2H5z"/>
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
                  </div>
    } else {
      if(this.state.isIE) {
        inputShow = <div className={classes.optionalContainer}>
                      <Typography className={classes.title} variant="body1">{language}</Typography>
                      <div>
                        <a ref={this.state.myRef} href={`/${file_path}`} onClick={() => this.state.myRef.current.get(0).show().focus().click().hide()}>
                          <Tooltip title="Download">
                            <IconButton>
                              <Save color="action"/>
                            </IconButton>
                          </Tooltip>
                        </a>
                        <Tooltip title="Remove">
                          <IconButton onClick={(e) => this.handleSubmitClear(e)}>
                            <ClearIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
      } else {
      inputShow = <div className={classes.optionalContainer}>
                    <Typography className={classes.title} variant="body1">{language}</Typography>
                    <figure>
                      <figcaption>
                        <Typography variant="body1" color="inherit">
                          {name}
                        </Typography>
                      </figcaption>
                      <audio
                          controls
                          src={`/${file_path}`}>
                              Your browser does not support the
                              <code>audio</code> element.
                      </audio>
                    </figure>
                    <Tooltip title="Remove">
                      <IconButton onClick={(e) => this.handleSubmitClear(e)}>
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
      }
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