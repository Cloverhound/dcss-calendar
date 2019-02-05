import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import EditIcon from '@material-ui/icons/Edit';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import CalendarTableHead from '../CalendarTableHead/CalendarTableHead';
import CalendarTableToolbar from '../CalendarTableToolbar/CalendarTableToolBar';

import {submitOptionalPromptsToggle, getPromptsWithQueueIdFromServer, submitLcsaToggle} from '../../actions'
import { connect } from 'react-redux'
import { Redirect, Link, withRouter } from 'react-router-dom';

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
  statusContainer: {
    display: "flex", 
    alignItems: "center"
  },
  statusColor: {
    width: "10px", 
    height: "10px", 
    borderRadius: "50%"
  },
  statusText: {
    paddingLeft: "5px"
  },
  button: {
    margin: theme.spacing.unit,
  }
});

interface IStateTable {
  order: any,
  orderBy: any,
  selected: any,
  page: any,
  rowsPerPage: any,
  toEdit: boolean,
  id: any,
}

interface IPropsTable {
  data: any,
  columnNames: any,
  populateTable: any,
  handleDelete: any,
  basePath: string,
  title: string,
  addButtonText: string,
  orderBy: string,
  handleOptionalPromptsToggle: any,
  submitOptionalPromptsToggle: any,
  getPromptsWithQueueIdFromServer: any,
  submitLcsaToggle: any,
  history: any
}

class CalendarTable extends React.Component<WithStyles<typeof styles> & IPropsTable, IStateTable> {
  state = {
    order: 'asc',
    orderBy: this.props.orderBy,
    selected: [],
    page: 0,
    rowsPerPage: 10,
    toEdit: false,
    id: null,
  };

  componentWillMount = () => {
    const { populateTable } = this.props
    populateTable()
  }

  handleEdit = (id) => {
    this.setState({ id, toEdit: true})
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

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleGetPromptsWithQueueIdFromServer = (obj) => {
    const { getPromptsWithQueueIdFromServer } = this.props
    getPromptsWithQueueIdFromServer(obj)
  }
  
  statusColor = (status) => {
    const { classes } = this.props;
    let statusStyle = "";
      switch (status.status) {
        case "open":
          statusStyle = "#01d901"
          break;
        case "closed":
          statusStyle = "#d90101"
          break;
        case "holiday":
          statusStyle = "#d90101"
          break;
        case "closing":
          statusStyle = "#FDDD08"
          break;
        default:
          statusStyle = "#d90101"
          break;
      }
      return <TableCell component="th" scope="row" padding="default">
              <Tooltip title={status.message} placement="right">
                <div className={classes.statusContainer}>
                  <div className={classes.statusColor}style={{ backgroundColor: statusStyle }}></div>
                  <div className={classes.statusText}>{status.status}</div>
                </div>
              </Tooltip>
            </TableCell>
  }

  promptsEdit = (id) => {
    const { classes, history } = this.props;
    return  <TableCell>
                <Button onClick={() => this.handleGetPromptsWithQueueIdFromServer({id, history, nav: true})} variant="text" color="primary" aria-label="Edit" className={classes.button}>
                  Edit
                </Button>
            </TableCell>
  }

  optionalPromptToggle = (id, bool) => {
    return  <TableCell>
              <Switch
                checked={bool}
                onChange={() => this.handleOptionalPromptsToggle(id, bool)}
                value={bool}
                color="primary"
              />
            </TableCell>
  }

  lcsaToggle = (id, bool) => {
    return  <TableCell>
              <Switch
                checked={bool}
                onChange={() => this.handleLcsaToggle(id, bool)}
                value={bool}
                color="primary"
              />
            </TableCell>
  }

  handleOptionalPromptsToggle = (id, bool) => {
    const { submitOptionalPromptsToggle } = this.props
    submitOptionalPromptsToggle({id, bool})
  } 

  handleLcsaToggle = (id, bool) => {
    const { submitLcsaToggle } = this.props
    submitLcsaToggle({id, bool})
  } 

  deleteTableCell = (id) => {
    const { classes, handleDelete, basePath } = this.props;
    if(basePath === "lcsas") {
      return <TableCell>
          <div className={classes.addButton}>
            <Tooltip title="Delete">
              <IconButton onClick={event => handleDelete(id)} aria-label={"Delete"}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
      </TableCell>
    } else {
      return <TableCell>
          <div className={classes.addButton}>
            <Tooltip title="Edit">
              <IconButton onClick={() => this.handleEdit(id)} aria-label="Edit">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={event => handleDelete(id)} aria-label={"Delete"}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
      </TableCell>
    }
  }

  render() {
    const { classes, data, columnNames, basePath, title, addButtonText, handleDelete } = this.props;
    const { order, orderBy, selected, rowsPerPage, page, toEdit, id } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  
    if(toEdit === true) {
      return <Redirect to={`/${basePath}/${id}/edit`}/>
    }

    return (
      <Paper className={classes.root}>
        <CalendarTableToolbar 
          numSelected={selected.length} 
          basePath={basePath} 
          title={title} 
          addButtonText={addButtonText}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <CalendarTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              columnNames={columnNames}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  let tableCells: JSX.Element[] = []
                  for(var i = 0; i < columnNames.length; i++) {
                    let columnName = columnNames[i]
                    let tableCell = <TableCell>{row[columnName]}</TableCell>
                    if(columnName === 'Status') {
                      tableCell = this.statusColor(row["Status"])
                    } else if (columnName === 'Prompts') {
                      tableCell = this.promptsEdit(row.id)
                    } else if (columnName === 'Optional Prompts Toggle') {
                      tableCell = this.optionalPromptToggle(row.id, row["Optional Prompts Toggle"])
                    } else if (columnName === 'Toggle Closed') {
                      tableCell = this.lcsaToggle(row.id, row["Toggle Closed"])
                    } else if (columnName === '') {
                      tableCell = this.deleteTableCell(row.id)
                    }
                    tableCells.push(tableCell)
                  }

                  return (
                        <TableRow 
                          hover 
                          tabIndex={-1} 
                          key={index}>
                          {tableCells}
                        </TableRow>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitOptionalPromptsToggle: (obj) => dispatch(submitOptionalPromptsToggle(obj)),
    submitLcsaToggle: (obj) => dispatch(submitLcsaToggle(obj)),
    getPromptsWithQueueIdFromServer: (obj) => dispatch(getPromptsWithQueueIdFromServer(obj))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(CalendarTable)));