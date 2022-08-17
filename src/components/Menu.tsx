import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  IconButton,
  Menu as MuiMenu,
  MenuItem,
} from '@mui/material';

const Menu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const stopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopPropagation(e);
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onTouchStart={stopPropagation}
        onMouseDown={stopPropagation}
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onMouseDown={stopPropagation}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Create New</MenuItem>
        <MenuItem onClick={handleMenuClose}>Archive</MenuItem>
      </MuiMenu>
    </>
  );
};

export default Menu;
