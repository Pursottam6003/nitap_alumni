import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import Preview from './Preview';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/material';
const columns = [
  { field: 'id', headerName: 'Sno', sortable: true, width: 40, },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'discipline', headerName: 'Department', width: 200 },
  { field: 'gradYear', headerName: 'Graduation Year', width: 120 },
  { field: 'current_org', headerName: 'Current Organization', width: 200 },
  { field: 'current_desg', headerName: 'Current Designation', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 120 },
  { field: 'city', headerName: 'Location', width: 100 },
];

let rows = []
export default function Admin() {
  const [list, setList] = React.useState([]);
  const [headings, setHeadings] = React.useState([]);

  const fetchAlumni = async () => {
    try {
      const res = await axios.get('/alumni')
      setList(res.data.map((row, index) => {
        return { ...row, id: index + 1 }
      }));
    }
    catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    if (list[0]) {
      console.log(list);
      let headings = []
      Object.keys(list[0]).forEach(key => {
        headings.push({
          id: key,
          label: key
        })
      })
      setHeadings(headings);
    }
  }, [list])
  React.useEffect(() => {
    fetchAlumni();
  }, [])
  return (
    <Container maxWidth="xl">
      <DataGrid
        rows={list}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 20]}
        checkboxSelection
      />
      <Stack direction="row" spacing={2}>
        <Button color="secondary">Update</Button>
        <Button variant="contained" color="success">
          Save Changes
        </Button>
        <Button variant="outlined" color="error">
          Delete
        </Button>
      </Stack>
    </Container>
  );
}