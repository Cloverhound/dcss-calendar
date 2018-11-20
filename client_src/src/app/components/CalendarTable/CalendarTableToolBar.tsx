import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircle from '@material-ui/icons/AddCircle';

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

interface IPropsTableToolbar {
  numSelected: any,
  addRowLink: string,
  title: string,
  addTitle: string
}

class CalendarTableToolbar extends React.Component<WithStyles<typeof toolbarStyles> & IPropsTableToolbar> {
  render() {
    const { classes, addRowLink, title, addTitle } = this.props;
    return (
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="title" id="tableTitle">
            {title}
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Link to={addRowLink}>
            <Tooltip title={addTitle}>
              <IconButton aria-label={addTitle}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </Toolbar>
    );
  }
};




export default withStyles(toolbarStyles)(CalendarTableToolbar);
