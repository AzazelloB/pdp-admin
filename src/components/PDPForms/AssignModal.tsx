import {
  Button,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import Modal from 'ui/Modal';

import AssignForm from './AssignForm';

const AssignModal: React.FC = () => {
  return (
    <Modal>
      <Modal.Button as={Button} variant="contained">
        <FormattedMessage
          defaultMessage="Assign"
        />
      </Modal.Button>

      <Modal.Content
        fullWidth
      >
        <AssignForm />
      </Modal.Content>
    </Modal>
  );
};

export default AssignModal;
