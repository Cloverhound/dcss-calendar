import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import AddCircle from '@material-ui/icons/AddCircle';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';


const toolbarStyles = theme => createStyles({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
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
}

class EnhancedTableToolbar extends React.Component<WithStyles<typeof toolbarStyles> & IPropsTableToolbar> {
  render() {
    const { numSelected, classes } = this.props;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
              {numSelected} selected
          </Typography>
          ) : (
          <Typography variant="title" id="tableTitle">
            Queues
          </Typography>
            )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Edit">
              <IconButton aria-label="Edit">
                <EditIcon />
              </IconButton>
            </Tooltip>
          ) : (
              <Tooltip title="Add Queue">
                <IconButton aria-label="Add Queue">
                  <AddCircle />
                </IconButton>
              </Tooltip>
            )}
        </div>
      </Toolbar>
    );
  }
};


export default withStyles(toolbarStyles)(EnhancedTableToolbar);