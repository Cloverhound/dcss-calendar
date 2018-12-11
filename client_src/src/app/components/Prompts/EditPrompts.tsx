import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ScheduleSelect from '../ScheduleSelect/ScheduleSelect';

import { connect } from 'react-redux';
import { addScheduleSelect, requestScheduleSubmit, updateNameField, getSchedulesFromServer, updateTimeRanges, resetTimeRanges, submitUploadPromptToServer } from '../../actions'
import {
  BrowserRouter as Router,
  Route,
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
  scheduleReducer: any,
  addScheduleSelect: any,
  requestScheduleSubmit: any,
  updateNameField: any,
  getSchedulesFromServer: any,
  updateTimeRanges: any,
  resetTimeRanges: any,
  click: any,
  submitUploadPromptToServer: any,
}

function TabContainer(props) {

  return (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <input 
        ref={'file-upload'}
        type='file'
      />
      <Button type='file'>
        {props.children}
      </Button>
    </div>
  );
}

class EditPrompts extends React.Component<WithStyles<typeof styles> & IProps> {
  state = {
    value: 0,
    filePath: ''
  }

  componentWillMount = () => {
    const { getSchedulesFromServer, resetTimeRanges } = this.props;
    getSchedulesFromServer()
    resetTimeRanges()
  }

  handleNameInput = event => {
    const { updateNameField } = this.props;
    updateNameField({ name: event.target.value })
  };

  handleAddScheduleSelect = () => {
    const { addScheduleSelect } = this.props
    addScheduleSelect()
  }

  handleFormSubmit = () => {
    const { requestScheduleSubmit, scheduleReducer } = this.props;
    requestScheduleSubmit(scheduleReducer)
  }

  handleChange = (e) => {
    console.log("CLICKED!", e);
  }

  handleInputChange = (e) => {
    this.setState({ filePath: e.target.value });
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  handleSubmitUpload = (e) => {
    e.preventDefault()
    const { submitUploadPromptToServer } = this.props;
    const { filePath } = this.state;

    submitUploadPromptToServer({path: filePath})
  }

  render() {
    const { classes, scheduleReducer } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form className={classes.form}>
            <Typography className={classes.title} variant="title">Edit Prompts</Typography>

            {/* <div className={classes.inputContainer}>
              <FormControl className={classes.formControl}>
                <Input
                  value={this.props.scheduleReducer.name}
                  onChange={this.handleNameInput}
                  name="newScheduleName"
                  placeholder="Queue Name"
                  autoFocus={true}
                />
              </FormControl>
            </div> */}
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
            
            {/*
            <div className={classes.addIconContainer}>
              <Button onClick={this.handleAddScheduleSelect} variant="fab" color="secondary" aria-label="Add" className={classes.button}>
                <AddIcon />
              </Button>
            </div>
          */}


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
    scheduleReducer: state.scheduleReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addScheduleSelect: () => (dispatch(addScheduleSelect())),
  requestScheduleSubmit: (obj) => (dispatch(requestScheduleSubmit(obj))),
  updateNameField: (obj) => (dispatch(updateNameField(obj))),
  getSchedulesFromServer: () => (dispatch(getSchedulesFromServer())),
  updateTimeRanges: (obj) => (dispatch(updateTimeRanges(obj))),
  resetTimeRanges: () => (dispatch(resetTimeRanges())),
  submitUploadPromptToServer: (obj) => (dispatch(submitUploadPromptToServer(obj)))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditPrompts));