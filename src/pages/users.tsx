import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getUsers, grantUserRole } from 'utils/functions';

import CreateNewModal from 'components/Users/CreateNewModal';

interface User {
  email: string;
  role: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getUsers();

      setUsers((response.data as any[]).map((user) => ({
        email: user.email,
        role: user?.customClaims?.role,
      })));
    })();
  }, []);

  const handleClick = (email: string) => () => {
    grantUserRole({
      email,
      role: 'admin',
    });
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

                <TableCell align="right">Grant admin</TableCell>
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

                  <TableCell align="right">
                    <Button
                      onClick={handleClick(user.email)}
                    >
                      make admin
                    </Button>
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
