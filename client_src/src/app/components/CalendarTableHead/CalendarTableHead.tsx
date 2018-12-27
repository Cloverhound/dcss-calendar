import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';


interface IPropsTableHead {
  onRequestSort: any,
  order: any,
  orderBy: any,
  columnNames: any
}


class CalendarTableHead extends React.Component<IPropsTableHead>{
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, columnNames} = this.props;

    columnNames.push('') // For the delete column
    return (
      <TableHead>
        <TableRow>
          {columnNames.map(columnName => {
            return (
              <TableCell
                key={columnName}
                sortDirection={orderBy === columnName ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === columnName}
                    direction={order}
                    onClick={this.createSortHandler(columnName)}
                  >
                    {columnName}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default CalendarTableHead;