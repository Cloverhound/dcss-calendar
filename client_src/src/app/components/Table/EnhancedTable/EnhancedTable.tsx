import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import EnhancedTableToolbar from '../EnhancedTableToolbar/EnhancedTableToolBar'
import EnhancedTableHead from '../EnhancedTableHead/EnhancedTableHead';

import { connect } from 'react-redux'
import { getQueuesFromServer, submitDeleteQueueToServer } from '../../../actions/index'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


let counter = 0;

function createData(status, queueName, scheduleName, holidayName, promptStatus) {
  counter += 1;
  return { id: counter, status, queueName, scheduleName, holidayName, promptStatus };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => createStyles({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  button: {
    margin: theme.spacing.unit,
  },
});

interface IStateTable {
  data: any,
  order: any,
  orderBy: any,
  selected: any,
  page: any,
  rowsPerPage: any,
  checkedB: any,
}

interface IPropsTable {
  getQueuesFromServer: any,
  queues: any,
  deleteQueue:any
}

class EnhancedTable extends React.Component<WithStyles<typeof styles> & IPropsTable, IStateTable> {
  state = {
    order: 'asc',
    orderBy: 'queueName',
    selected: [],
    data: [
      createData('Open', 'Brooklyn', "Regular Hours", "Regular", "ON"),
      createData('Closing', 'Manhattan', "Regular Hours", "Regular", "ON"),
      createData('Closed', 'Queens', "Regular Hours", "Regular", "OFF"),
      createData('Holiday', 'Staten Island', "Regular Hours", "Regular", "OFF"),
      createData('Closing', 'Bronx', "Regular Hours", "Regular", "ON"),
    ],
    page: 0,
    rowsPerPage: 10,
    checkedB: false,
  };

  componentWillMount = () => {
    const { getQueuesFromServer } = this.props
    getQueuesFromServer()
  }

  handleEdit = () => {
    console.log("Handling Edit Queue");
  }

  handleDelete = (queueId) => {
    console.log("Handling Delete Queue");
    const { deleteQueue } = this.props;
    deleteQueue({ id: queueId })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeSwitch = (event) => {
    this.setState({ checkedB: event.target.checked });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => {
    const { queues } = this.props
    return queues.selected.id === id;
  }

  render() {
    const { classes, queues } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, queues.array.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={queues.length}
            />
            <TableBody>
              {stableSort(queues.array, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.queue.id);
                  let statusStyle = "";
                  switch (n.queue.status) {
                    case "Open":
                      statusStyle = "#01d901"
                      break;
                    case "Closed":
                      statusStyle = "#d90101"
                      break;
                    case "Holiday":
                      statusStyle = "#d90101"
                      break;
                    case "Closing":
                      statusStyle = "#FDDD08"
                      break;
                    default:
                      statusStyle = "#d90101"
                      break;
                  }
                  return (
                    <Tooltip
                      title="Select to edit"
                      placement={'right'}
                      enterDelay={300}
                    >
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                      >
                        <TableCell component="th" scope="row" padding="default">
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: statusStyle }}></div>
                            <div style={{ paddingLeft: "5px" }}>{n.queue.status}</div>
                          </div>

                        </TableCell>
                        <TableCell>{n.queue.name}</TableCell>
                        <TableCell>{n.schedule.name}</TableCell>
                        <TableCell>{n.holidayList.name}</TableCell>
                        <TableCell>
                          <Switch
                            // checked={true}
                            // onChange={this.handleChangeSwitch}
                            value="checkedB"
                            color="primary"
                          />
                          <Button  variant="text" color="primary" aria-label="Edit" className={classes.button}>
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className={classes.addButton}>
                            <Tooltip title="Edit">
                              <IconButton onClick={() => this.handleEdit()} aria-label="Edit">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton onClick={event => this.handleDelete(n.queue.id)} aria-label={"Delete"}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </div>
                      </TableCell>
                      </TableRow>
                    </Tooltip>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    queues: state.queuesReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getQueuesFromServer: () => dispatch(getQueuesFromServer()),
  deleteQueue: (obj) => dispatch(submitDeleteQueueToServer(obj)),
  // addSelectedQueue: (obj) => dispatch(addSelectedQueue(obj)),
  // clearSelectedQueue: () => dispatch(clearSelectedQueue()),
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnhancedTable));