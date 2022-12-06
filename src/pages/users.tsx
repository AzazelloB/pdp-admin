import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CreateNewModal from 'components/Users/CreateNewModal';

interface User {
  email: string;
  role: string;
}

const users: User[] = [
  {
    email: 'zxc',
    role: 'zxc',
  },
  {
    email: 'zxc1',
    role: 'zxc',
  },
  {
    email: 'zxc2',
    role: 'zxc',
  },
  {
    email: 'zxc3',
    role: 'zxc',
  },
];

const UsersPage: React.FC = () => {
  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <CreateNewModal />
      </Box>

      <Container maxWidth="sm">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>

                <TableCell align="right">Role</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.email}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>

                  <TableCell align="right">{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default UsersPage;
