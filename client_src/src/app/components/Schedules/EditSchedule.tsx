import * as React from 'react'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import RegularEditScheduleTab from './RegularScheduleTab'


const styles = theme => createStyles({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    // display: 'flex',
    justifyContent: 'center',
    width: '100%',
  }
});


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class EditSchedule extends React.Component<WithStyles<typeof styles> > {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Regular" />
              <Tab label="Special" />
            </Tabs>
            
          </AppBar>

          {this.state.value === 0 && <TabContainer><RegularEditScheduleTab/></TabContainer>}
          {this.state.value === 1 && <TabContainer>Hello, World</TabContainer>}   
          </div> 
        </div>
      </div>
    )
  }
}


export default withStyles(styles, { withTheme: true })(EditSchedule)