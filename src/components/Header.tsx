import {
  AppBar,
  Container,
  Typography,
  Box,
} from '@mui/material';

const Header: React.FC = () => {
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
            width: 40,
            height: 40,
            backgroundColor: 'primary.dark',
            borderRadius: '50%',
            mr: 2,
          }}
          />
          <Typography>Header</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Box sx={{
            width: 40,
            height: 40,
            backgroundColor: 'primary.dark',
            borderRadius: '50%',
            mr: 2,
          }}
          />
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
