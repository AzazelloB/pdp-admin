import {
  Button,
} from '@mui/material';

import Modal from 'ui/Modal';
import CreateForm from './CreateForm';

const CreateNewModal: React.FC = () => {
  return (
    <Modal>
      <Modal.Button as={Button} variant="contained">
        New
      </Modal.Button>

      <Modal.Content fullWidth>
        <CreateForm />
      </Modal.Content>
    </Modal>
  );
};

export default CreateNewModal;
