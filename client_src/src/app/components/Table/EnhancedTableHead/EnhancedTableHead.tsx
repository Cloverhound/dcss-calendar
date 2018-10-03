import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


const rows = [
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'queueName', numeric: false, disablePadding: false, label: 'Queue Name' },
  { id: 'scheduleName', numeric: false, disablePadding: false, label: 'Schedule Name' },
  { id: 'holidayName', numeric: false, disablePadding: false, label: 'Holiday Name' },
  { id: 'promptStatus', numeric: false, disablePadding: false, label: 'Prompt Status' },
  { id: 'edit', numeric: false, disablePadding: false, label: '' },
];


interface IStateTableHead {
  // mobileOpen: any,
}

interface IPropsTableHead {
  onRequestSort: any,
  onSelectAllClick: any,
  order: any,
  orderBy: any,
  numSelected: any,
  rowCount: any,
}


class EnhancedTableHead extends React.Component<IPropsTableHead, IStateTableHead>{
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
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

export default EnhancedTableHead;