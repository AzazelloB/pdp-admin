import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  AppBar,
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';

import { useUser } from 'hooks/useUser';
import { logout, signInWithGooglePopup } from 'utils/auth';
import { ROLES } from 'constants/roles';

const Header: React.FC = () => {
  const user = useUser();

  const [userRole, setUserRole] = useState<ROLES | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then((token) => {
        setUserRole(token.claims.role);
      });
    }
  }, [user]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAnd = (callback: () => void) => () => {
    handleClose();

    callback();
  };

  return (
    <AppBar
      position="static"
      sx={{
        py: 1,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center">
          <Box sx={{
            width: 50,
            height: 50,
            backgroundColor: 'primary.dark',
            borderRadius: '50%',
            mr: 2,
          }}
          />
          <Typography>PDP</Typography>

          <Box sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            ml: 4,
          }}
          >
            <Button
              href="/"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <FormattedMessage
                defaultMessage="Home"
              />
            </Button>

            <Button
              href="/pdp"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <FormattedMessage
                defaultMessage="Forms"
              />
            </Button>

            <Button
              href="/users"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <FormattedMessage
                defaultMessage="Users"
              />
            </Button>
          </Box>
        </Box>

        {user ? (
          <>
            <Box display="flex" alignItems="center">
              <List
                component="nav"
              >
                <ListItem
                  button
                  color="inherit"
                  onClick={handleMenu}
                >
                  <Avatar src={user.photoURL || undefined} />

                  <Box ml={2} display="flex" flexDirection="column">
                    <Box>
                      {user.displayName}
                    </Box>
                    <Box>
                      {userRole}
                    </Box>
                  </Box>
                </ListItem>
              </List>
            </Box>

            <Menu
              anchorEl={anchorEl}
              sx={{ mt: '45px' }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem color="inherit" onClick={handleCloseAnd(logout)}>
                <FormattedMessage
                  defaultMessage="Sign-Out"
                />
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={signInWithGooglePopup}>
            <FormattedMessage
              defaultMessage="Sign-In"
            />
          </Button>
        )}
      </Container>
    </AppBar>
  );
};

export default Header;
