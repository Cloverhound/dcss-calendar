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
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';
import { updateRoute } from '../../actions/index'

import Queues from '../Queues/Queues';
import NewQueue from '../NewQueue/NewQueue';
import EditQueue from '../EditQueue/EditQueue';
import Schedules from '../Schedules/Schedules';
import NewSchedule from '../Schedules/NewSchedule';
import EditSchedule from '../Schedules/EditSchedule';
import HolidayLists from '../Holidays/HolidayLists';
import NewHolidayList from '../Holidays/NewHolidayList';
import EditHolidayList from '../Holidays/EditHolidayList'
import EditPrompts from '../Prompts/EditPrompts';
import Lcsas from '../Lcsas/Lcsas';
import NewLcsa from '../NewLcsa/NewLcsa';

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from 'react-router-dom';
import { withRouter } from "react-router";

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
  sendComponent: any,
  location: any,
  updateRoute: any,
  routeComponent: any
}

class PermanentDrawer extends React.Component<WithStyles<typeof styles> & IProps, IState> {
  state: IState = {
    mobileOpen: false,
    selectedIndex: 0,
  };

  componentWillMount = () => {
    const {location: {pathname}, updateRoute} = this.props
    updateRoute({url: pathname})
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes, theme, routeComponent: {route} } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <MenuList>
          // @ts-ignore:disable-next-line
          <MenuItem component={Link} to="/" selected={route === '/'}>
            Counties
          </MenuItem>
          // @ts-ignore:disable-next-line
          <MenuItem component={Link} to="/schedules" selected={route === '/schedules'}>
            Schedules
          </MenuItem>
          // @ts-ignore:disable-next-line
          <MenuItem component={Link} to="/holiday_lists" selected={route === '/holiday_lists'}>
            Holidays
          </MenuItem>
          // @ts-ignore:disable-next-line
          <MenuItem component={Link} to="/lcsas" selected={route === '/lcsas'}>
            Lcsas
          </MenuItem>
        </MenuList>
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
                County Settings
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
            <Route exact path="/schedules" component={Schedules} />
            <Route exact path="/schedules/new" component={NewSchedule} />
            <Route exact path="/schedules/:id/edit" component={EditSchedule} />
            <Route exact path="/holiday_lists" component={HolidayLists} />
            <Route exact path="/queues" component={Queues} />
            <Route exact path="/prompts/:id/edit" component={EditPrompts} />
            <Route exact path="/queues/new" component={NewQueue} />
            <Route exact path="/queues/:id/edit" component={EditQueue} />
            <Route exact path="/holiday_lists/new" component={NewHolidayList} />
            <Route exact path="/holiday_lists/:id/edit" component={EditHolidayList} />
            <Route exact path="/lcsas" component={Lcsas} />
            <Route exact path="/lcsas/new" component={NewLcsa} />
          </main>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    routeComponent: state.routeComponent
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateRoute: (obj) => dispatch(updateRoute(obj))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PermanentDrawer)));

