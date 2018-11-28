import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import AddCircle from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';

import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


const toolbarStyles = theme => createStyles({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    // theme.palette.type === 'light'
    //   ? {
    //     color: theme.palette.secondary.main,
    //     backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    //   }
      {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

interface IPropsTableToolbar {
  numSelected: any,
  queues: any
}

class EnhancedTableToolbar extends React.Component<WithStyles<typeof toolbarStyles> & IPropsTableToolbar> {
  render() {
    const { numSelected, classes, queues } = this.props;
    return (
      <Toolbar
        // className={classNames(classes.root, {
        //   [classes.highlight]: queues.selected.id,
        // })}
      >
        <div className={classes.title}>
          {/* {queues.selected.name ? (
          <Typography color="inherit" variant="subheading">
              {queues.selected.name} selected
          </Typography>
          ) : ( */}
          <Typography variant="title" id="tableTitle">
            Queues
          </Typography>
            {/* )} */}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {/* {queues.selected.id ? (
            <Link to="/AddQueue">
              <Tooltip title="Edit">
                <IconButton aria-label="Edit">
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Link>
          ) : ( */}
            <Link to="/queues/new">
              <Tooltip title="New Queue">
                <IconButton aria-label="New Queue">
                  <AddCircle />
                </IconButton>
              </Tooltip>
            </Link>
            {/* )} */}
        </div>
      </Toolbar>
    );
  }
};

const mapStateToProps = state => {
  return {
    queues: state.queuesReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  // getQueuesFromServer: () => dispatch(getQueuesFromServer()),
  // addSelectedQueue: (obj) => dispatch(addSelectedQueue(obj)),
  // clearSelectedQueue: () => dispatch(clearSelectedQueue()),
})


export default connect(mapStateToProps, null)(withStyles(toolbarStyles)(EnhancedTableToolbar));
