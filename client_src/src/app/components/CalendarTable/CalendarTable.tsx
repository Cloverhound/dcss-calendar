import * as React from 'react';
import { connect } from 'react-redux'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import CalendarTableHead from './CalendarTableHead';
import CalendarTableToolbar from './CalendarTableToolbar';


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
});

interface IStateTable {
  order: any,
  orderBy: any,
  selected: any,
  page: any,
  rowsPerPage: any,
}

interface IPropsTable {
  data: any,
  columnNames: any,
  populateTable: any,
  addRowLink: string,
  orderBy: string,
  title: string,
  addTitle: string
}

class CalendarTable extends React.Component<WithStyles<typeof styles> & IPropsTable, IStateTable> {
  state = {
    order: 'asc',
    orderBy: this.props.orderBy,
    selected: [],
    page: 0,
    rowsPerPage: 10,
  };

  componentWillMount = () => {
    const { populateTable } = this.props
    populateTable()
  }

  handleEdit = () => {
    console.log("EDIT EDIT")
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


  render() {
    const { classes, data, columnNames, addRowLink, title, addTitle } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <CalendarTableToolbar numSelected={selected.length} addRowLink={addRowLink} title={title} addTitle={addTitle}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <CalendarTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              columnNames = {columnNames}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  
                  let tableCells: JSX.Element[] = []
                  for(var i = 0; i < columnNames.length; i++) {
                    let columnName = columnNames[i]
                    let tableCell = <TableCell>{row[columnName]}</TableCell>
                    tableCells.push(tableCell)
                  }
                  
                  return (
                    <Tooltip title="Select to edit" placement={'right'} enterDelay={300}>
                      
                      <TableRow hover tabIndex={-1} key={index}>
                        {tableCells}
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


export default connect()(withStyles(styles)(CalendarTable));