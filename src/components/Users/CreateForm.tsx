import { useNavigate } from 'react-router-dom';
import { FormikValues, Form, Formik } from 'formik';
import {
  MenuItem, Box, Button,
} from '@mui/material';

import { ROLES } from 'constants/roles';
import { useModalContext } from 'context/ModalContext';
import { addUserRole } from 'utils/functions';

import Modal from 'ui/Modal';

import Input from 'components/Form/FormFields/Input';
import Select from 'components/Form/FormFields/Select';

const CreateForm: React.FC = () => {
  const navigate = useNavigate();
  const { setOpen } = useModalContext();

  const handleSubmit = async (values: FormikValues) => {
    await addUserRole({
      email: values.email,
      role: values.role,
    });

    setOpen(false);
    // TODO invalidate query
    navigate(0);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        role: '',
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <Input
          name="email"
          type="email"
        />

        <Select
          name="role"
          sx={{
            mt: 1,
          }}
        >
          {Object.values(ROLES).map((role) => (
            <MenuItem key={role} value={role}>{role}</MenuItem>
          ))}
        </Select>

        <Modal.Actions>
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </Modal.Actions>
      </Form>
    </Formik>
  );
};

export default CreateForm;
