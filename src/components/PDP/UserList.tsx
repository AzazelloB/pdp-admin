import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export interface Option {
  value: string | number;
  label: string;
}

interface UserListProps {
  list: Option[];
  options: Option[];
  label: string;
  onAdd: (option: Option) => Promise<void> | void;
  onRemove: (option: Option) => Promise<void> | void;
}

const UserList: React.FC<UserListProps> = ({
  list,
  options,
  label,
  onAdd,
  onRemove,
}) => {
  const [newValue, setNewValue] = useState<Option | null>(null);

  const handleChange = async (_: any, value: Option | null) => {
    setNewValue(value);

    if (value) {
      await onAdd(value);
      setNewValue(null);
    }
  };

  const handleDelete = (option: Option) => async () => {
    onRemove(option);
  };

  return (
    <>
      {list.length ? (
        <Box mb={2}>
          {list.map((item) => (
            <Box
              key={item.value}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <span>{item.label}</span>

              <IconButton
                sx={{
                  ml: 4,
                }}
                onClick={handleDelete(item)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      ) : null}

      <Autocomplete
        options={options}
        value={newValue}
        onChange={handleChange}
        fullWidth
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label={label}
          />
        )}
      />
    </>
  );
};

export default UserList;
