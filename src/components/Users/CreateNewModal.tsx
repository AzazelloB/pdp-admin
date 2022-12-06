import { useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import {
  collection,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import Modal from 'ui/Modal';
import { db } from 'utils/db';

const roleOptions = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'mentor',
    label: 'Mentor',
  },
];

const CreateNewModal: React.FC = () => {
  const [role, setRole] = useState('');

  const [data] = useCollection(collection(db, 'userRole'));

  const users = data?.docs.map((d) => d.data().email) || [];

  const handleTemplateChange = (e: SelectChangeEvent) => {
    setRole(e.target.value as string);
  };

  return (
    <Modal>
      <Modal.Button as={Button} variant="contained">
        New
      </Modal.Button>

      <Modal.Content fullWidth>
        <>
          <Autocomplete
            freeSolo
            options={users}
            renderInput={(params) => (
              <TextField {...params} label="Assign to" margin="dense" variant="filled" />
            )}
          />

          <Select
            fullWidth
            label="Role"
            variant="filled"
            value={role}
            onChange={handleTemplateChange}
            sx={{
              mt: 1,
              mb: 0.5,
            }}
          >
            {roleOptions.map(({ value, label }) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))}
          </Select>

          <Modal.Actions>
            {({ handleClose }) => (
              <Box display="flex" justifyContent="flex-end" mt={4}>
                <Button variant="contained" onClick={handleClose}>
                  Save
                </Button>
              </Box>
            )}
          </Modal.Actions>
        </>
      </Modal.Content>
    </Modal>
  );
};

export default CreateNewModal;
