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

import { ROLES } from 'constants/roles';

import CreateNewModal from 'components/Users/CreateNewModal';
import { useSetUserRole, useUserRoleList } from 'api/user';
import { useQueryClient } from 'react-query';

const UsersPage: React.FC = () => {
  const queriClient = useQueryClient();
  const {
    data,
    isLoading,
    isIdle,
    isError,
  } = useUserRoleList();
  const { mutateAsync: setUserRole } = useSetUserRole();

  if (isLoading || isIdle) {
    return (
      <>
        Loading..
      </>
    );
  }

  if (isError) {
    return (
      <>
        Error
      </>
    );
  }

  const handleChange = (email: string) => async (e: SelectChangeEvent) => {
    const role = e.target.value;

    await setUserRole({
      data: {
        email,
        role,
      },
    });

    queriClient.invalidateQueries('getUserRoleList');
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
              {data.map((user) => (
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
