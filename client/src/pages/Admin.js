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
  { field: 'id', headerName: 'Sno', width: 40 },
  { field: 'fullname', headerName: 'Name', width: 160 },
  { field: 'department', headerName: 'Department', width: 200 },
  { field: 'gradYear', headerName: 'Graduation Year', width: 120 },
  { field: 'current_org', headerName: 'Current Organization', width: 200 },
  { field: 'current_desg', headerName: 'Current Designation', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 120 },
  { field: 'location', headerName: 'Location', width: 100 }
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];
const rows = [
  { id: 1, fullname: 'Snow leaopartd', department: 'Computer Sciencce and Engineering', gradYear: '2024', current_org: 'google', current_desg: 'Software Engineer', email: 'rahulsah@google', phone: '70394958229', location: 'Banglore' },
  { id: 2, fullname: 'Lann leaopartdister', department: 'Computer Sciencce and Engineering', gradYear: '2024', current_org: 'google', current_desg: 'Software Engineer', email: 'rahulsah@google', phone: '70394958229', location: 'Banglore' },
  { id: 3, fullname: 'Lann leaopartdister', department: 'Computer Sciencce and Engineering', gradYear: '2024', current_org: 'google', current_desg: 'Software Engineer', email: 'rahulsah@google', phone: '70394958229', location: 'Banglore' },
  { id: 4, fullname: 'Star leaopartdk', department: 'Computer Sciencce and Engineering', gradYear: '2024', current_org: 'google', current_desg: 'Software Engineer', email: 'rahulsah@google', phone: '70394958229', location: 'Banglore' },
  { id: 5, fullname: 'Targ leaopartdaryen', department: 'Computer Sciencce and Engineering', gradYear: '2024', current_org: 'google', current_desg: 'Software Engineer', email: 'rahulsah@google', phone: '70394958229', location: 'Banglore' },
  { id: 6, fullname: 'Meli leaopartdsandre', department: 'Computer Sciencce and Engineering', gradYear: '2024', current_org: 'google', current_desg: 'Software Engineer', email: 'rahulsah@google', phone: '70394958229', location: 'Banglore' },
  { id: 7, fullname: 'Clif leaopartdford', department: 'Computer Sciencce and Engineering', gradYear: '2024', current_org: 'google', current_desg: 'Software Engineer', email: 'rahulsah@google', phone: '70394958229', location: 'Banglore' },
  { id: 8, fullname: 'Fran leaopartdces', department: 'Computer Sciencce and Engineering', gradYear: '2024', current_org: 'google', current_desg: 'Software Engineer', email: 'rahulsah@google', phone: '70394958229', location: 'Banglore' },
  { id: 9, fullname: 'Roxi leaopartde', department: 'Computer Sciencce and Engineering', gradYear: '2024', current_org: 'google', current_desg: 'Software Engineer', email: 'rahulsah@google', phone: '70394958229', location: 'Banglore' },
  { id: 10, fullname: 'Meli leaopartdsandre', department: 'Computer Sciencce and Engineering', gradYear: '2024', current_org: 'google', current_desg: 'Software Engineer', email: 'rahulsah@google', phone: '70394958229', location: 'Banglore' },
  { id: 11, fullname: 'Clif leaopartdford', department: 'Computer Sciencce and Engineering', gradYear: '2024', current_org: 'google', current_desg: 'Software Engineer', email: 'rahulsah@google', phone: '70394958229', location: 'Banglore' },
  { id: 12, fullname: 'Fran leaopartdces', department: 'Computer Sciencce and Engineering', gradYear: '2024', current_org: 'google', current_desg: 'Software Engineer', email: 'rahulsah@google', phone: '70394958229', location: 'Banglore' },
  { id: 13, fullname: 'Roxi leaopartde', department: 'Computer Sciencce and Engineering', gradYear: '2024', current_org: 'google', current_desg: 'Software Engineer', email: 'rahulsah@google', phone: '70394958229', location: 'Banglore' },
];
export default function Admin() {
  const [list, setList] = React.useState([]);
  const [headings, setHeadings] = React.useState([]);
  const fetchAlumni = async () => {
    try {
      const res = await axios.get('/alumni')
      setList(res.data);
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
        rows={rows}
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