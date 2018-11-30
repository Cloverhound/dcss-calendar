import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircle from '@material-ui/icons/AddCircle';
import { Redirect } from 'react-router-dom';

import {
  Link
} from 'react-router-dom';


const toolbarStyles = theme => createStyles({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight: {
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

interface IStateTableToolbar {
  toNew: boolean
}

interface IPropsTableToolbar {
  numSelected: any,
  basePath: string,
  title: string,
  addButtonText: string
}

class CalendarTableToolbar extends React.Component<WithStyles<typeof toolbarStyles> & IPropsTableToolbar, IStateTableToolbar> {
  state = {
    toNew: false
  }

  handleAddClick = () => {
    this.setState({ toNew: true})
  }
   
  render() {
    const { classes, basePath, title, addButtonText } = this.props;
    const { toNew } = this.state;

    if(toNew === true) {
      return <Redirect to={`/${basePath}/new`}/>
    }

    return (
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="title" id="tableTitle">
            {title}
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
            <Tooltip title={addButtonText}>
              <IconButton onClick={this.handleAddClick} aria-label={addButtonText}>
                <AddCircle />
              </IconButton>
            </Tooltip>
        </div>
      </Toolbar>
    );
  }
};




export default withStyles(toolbarStyles)(CalendarTableToolbar);
