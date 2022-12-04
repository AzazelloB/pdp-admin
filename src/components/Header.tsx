import { useState } from 'react';
import {
  AppBar,
  Container,
  Typography,
  Box,
  Button,
  MenuItem,
  Menu,
  IconButton,
  Avatar,
} from '@mui/material';

import { useUser } from 'hooks/useUser';
import { logout, signInWithGooglePopup } from 'utils/auth';

const Header: React.FC = () => {
  const user = useUser();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
          <Typography>Header</Typography>

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
              Home
            </Button>

            <Button
              href="/pdp"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Forms
            </Button>

            <Button
              href="/users"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Users
            </Button>
          </Box>
        </Box>

        {user ? (
          <>
            <Box display="flex" alignItems="center">
              <IconButton
                size="small"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={user.photoURL || undefined} />
              </IconButton>
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
              <MenuItem color="inherit" onClick={handleCloseAnd(logout)}>Sign-Out</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={signInWithGooglePopup}>Sign-In</Button>
        )}
      </Container>
    </AppBar>
  );
};

export default Header;
