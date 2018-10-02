import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import createStyles from '@material-ui/core/styles/createStyles';

import { connect } from 'react-redux';
import { sendRouteComponent } from '../../actions/index'

import Queues from '../Queues/Queues';
import Schedules from '../Schedules/Schedules';
import Holidays from '../Holidays/Holidays';
import Prompts from '../Prompts/Prompts';
import AddQueue from '../AddQueue/AddQueue';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const drawerWidth: number = 240;

const styles = (theme) => createStyles({
  root: {
    flexGrow: 1,
    height: '100vh',
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    height: '100vh'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    width: '100%'
  }
});

interface IState {
  mobileOpen: any,
}

interface PermanentDrawerProps {
  children: any,
  theme: any,
  sendComponent: any
}

class PermanentDrawer extends React.Component<WithStyles<typeof styles> & PermanentDrawerProps, IState> {
  state: IState = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List><button onClick={() => this.props.sendComponent(AddQueue)}>AddQueue</button></List>
        <List><button onClick={() => this.props.sendComponent(Schedules)}>Schedules</button></List>
        <List><button onClick={() => this.props.sendComponent(Holidays)}>Holidays</button></List>
        <List><button onClick={() => this.props.sendComponent(Prompts)}>Prompts</button></List>
        <Divider />
        <List></List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              DCSS Calendar
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  sendComponent: (component) => dispatch(sendRouteComponent(component))
})

export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PermanentDrawer));

