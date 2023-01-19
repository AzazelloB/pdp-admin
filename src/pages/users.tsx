import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { getUserRoleList, setUserRole } from 'utils/functions';
import { ROLES } from 'constants/roles';

import CreateNewModal from 'components/Users/CreateNewModal';

interface User {
  email: string;
  role: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getUserRoleList();

    const data = await response.json();

    setUsers(data.result as User[]);
  };

  const handleChange = (email: string) => async (e: SelectChangeEvent) => {
    const role = e.target.value;

    const response = await setUserRole({
      email,
      role,
    });

    const data = await response.json();
    const updatedUser = data.result as User;

    setUsers((prev) => prev.map((user) => (user.email === updatedUser.email ? updatedUser : user)));
  };

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

                  <TableCell align="right">
                    <Select
                      variant="standard"
                      value={user.role}
                      onChange={handleChange(user.email)}
                    >
                      {Object.values(ROLES).map((role) => (
                        <MenuItem key={role} value={role}>{role}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
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
