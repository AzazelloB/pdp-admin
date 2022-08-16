import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useState } from 'react';

import Modal from 'ui/Modal';

const templateOptions = [
  {
    value: 'template1',
    label: 'Template 1',
  },
  {
    value: 'template2',
    label: 'Template 2',
  },
];

const users = [
  {
    value: 'user1',
    label: 'User 1',
  },
  {
    value: 'user2',
    label: 'User 2',
  },
];

const CreateNewModal: React.FC = () => {
  const [template, setTemplate] = useState(templateOptions[0].value);

  const handleTemplateChange = (e: SelectChangeEvent) => {
    setTemplate(e.target.value as string);
  };

  return (
    <Modal>
      <Modal.Button as={Button} variant="contained">
        New
      </Modal.Button>

      <Modal.Content>
        <>
          <TextField fullWidth label="Title" margin="dense" variant="filled" />

          <TextField fullWidth label="Description" margin="dense" variant="filled" />

          <Select
            fullWidth
            label="Template"
            variant="filled"
            value={template}
            onChange={handleTemplateChange}
            sx={{
              mt: 1,
              mb: 0.5,
            }}
          >
            {templateOptions.map(({ value, label }) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))}
          </Select>

          <Autocomplete
            options={users}
            renderInput={(params) => (
              <TextField {...params} label="Assign to" margin="dense" variant="filled" />
            )}
          />

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
