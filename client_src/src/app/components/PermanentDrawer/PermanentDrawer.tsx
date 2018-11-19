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
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { connect } from 'react-redux';
import { sendRouteComponent } from '../../actions/index'

import Queues from '../Queues/Queues';
import Schedules from '../Schedules/Schedules';
import HolidayLists from '../Holidays/HolidayLists';
import NewHolidayList from '../Holidays/NewHolidayList';
import EditHolidayList from '../Holidays/EditHolidayList'
import Prompts from '../Prompts/Prompts';
import AddQueue from '../AddQueue/AddQueue';

import {
  BrowserRouter as Router,
  Route,
  NavLink
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
      zIndex: 1300,
      width: '100%',
      //width: `calc(100% - ${drawerWidth}px)`,
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
    width: '100%',
    overflowY: 'auto'
  },
  navLink: {
    textDecoration: 'none',
  },
});

interface IState {
  mobileOpen: any,
  selectedIndex: number
}

interface IProps {
  children: any,
  theme: any,
  sendComponent: any
}

class PermanentDrawer extends React.Component<WithStyles<typeof styles> & IProps, IState> {
  state: IState = {
    mobileOpen: false,
    selectedIndex: 0,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <NavLink className={classes.navLink} to="/">
          <ListItem
            button
            selected={this.state.selectedIndex === 0}
            onClick={event => this.handleListItemClick(event, 0)}>
            <ListItemText primary="Queues" />
          </ListItem>
        </NavLink>
        <NavLink className={classes.navLink} to="/Schedules">
          <ListItem
            button
            selected={this.state.selectedIndex === 1}
            onClick={event => this.handleListItemClick(event, 1)}>
            <ListItemText primary="Schedules" />
          </ListItem>
        </NavLink>
        <NavLink className={classes.navLink} to="/Holiday_Lists">
          <ListItem
            button
            selected={this.state.selectedIndex === 2}
            onClick={event => this.handleListItemClick(event, 2)}>
            <ListItemText primary="Holidays" />
          </ListItem>
        </NavLink>
        <NavLink className={classes.navLink} to="/Prompts">
          <ListItem
            button
            selected={this.state.selectedIndex === 3}
            onClick={event => this.handleListItemClick(event, 3)}>
            <ListItemText primary="Prompts" />
          </ListItem>
        </NavLink>
        <Divider />
        <List></List>
      </div>
    );

    return (
      <Router>
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
                Queue Settings
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
            <Route exact path="/" component={Queues} />
            <Route exact path="/Schedules" component={Schedules} />
            <Route exact path="/holiday_lists" component={HolidayLists} />
            <Route exact path="/Prompts" component={Prompts} />
            <Route exact path="/AddQueue" component={AddQueue} />
            <Route exact path="/holiday_lists/new" component={NewHolidayList} />
            <Route exact path="/holiday_lists/:id/edit" component={EditHolidayList} />
          </main>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  sendComponent: (component) => dispatch(sendRouteComponent(component))
})

export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PermanentDrawer));

