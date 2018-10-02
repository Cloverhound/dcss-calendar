import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';

const styles = theme => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '65px',
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
      cursor:'pointer'
    },
  },
  paper: {
    width: '300px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    marginTop: '30px',
    margin: theme.spacing.unit,
  },
});

class AddQueue extends React.Component<WithStyles<typeof styles>> {
  state = {
    queueName: '',
    scheduleName: '',
    holidayName: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.arrowContainer}>
            <ArrowBack className={classes.arrow}/>
          </div>
          <form className={classes.form}> 
            <FormControl>
              <Input
              value={this.state.queueName}
              onChange={this.handleChange}
              name="queueName"
              placeholder="Queue Name"
              autoFocus={true}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.scheduleName}
                onChange={this.handleChange}
                name="scheduleName"
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value="" disabled>
                  Placeholder
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Schedule Name</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.holidayName}
                onChange={this.handleChange}
                name="holidayName"
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value="" disabled>
                  Placeholder
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Holiday Name</FormHelperText>
            </FormControl>
            <Button variant="contained" color="primary" className={classes.button}>
              Save
            </Button>
          </form>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(AddQueue);