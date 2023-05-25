import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  {id: 'slno.', label: 'S/no', minWidth: 70, align: 'right',},
  { id: 'name', label: 'Name', minWidth: 70 },
  { id: 'department', label: 'Department', minWidth: 70 },
  {id: 'graduationYear',label: 'Graduation\u00a0year',minWidth: 70,align: 'right',},
  { id: 'current', label: 'Current\u00a0organistaion\u00a0employed', minWidth: 70 },
  { id: 'currentDesignation', label: 'Current\u00a0Designatoin', minWidth: 70 },
  { id: 'Location', label: 'location', minWidth: 70 },
];

// function createData(id, name, department, gradYear, currentorg, designation, location) {

//   return { id, name, department, gradYear, currentorg, designation, location };
// }

const rows = [
 {'slno.': '1', fristname: 'Daknya', department :'CSE', graduationYear: '2024',current:'microsoft',  'currentDesignation': 'Managing director', Location : 'Banglore , US '},
 {'slno.': '2', name: 'chandrasheker', department :'CSE', graduationYear: '2024',current:'facebook',  'currentDesignation': ' react engineer', Location : 'Seattle,US'},
 {'slno.': '3', name: 'purushotam', department :'CSE', graduationYear: '2024' ,current:'Google' ,  'currentDesignation': 'SDE2', Location : 'Washington , US'},

];

export default function Admin() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', margin: '2rem auto' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {/* {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value} */}
                            {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
  console.log()
}