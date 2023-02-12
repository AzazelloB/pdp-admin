import { useQueryClient } from 'react-query';
import { FormattedMessage } from 'react-intl';
import { FormikValues, Form, Formik } from 'formik';
import {
  MenuItem, Box, Button,
} from '@mui/material';

import { useAddUserRole } from 'api/user';
import { ROLES } from 'constants/roles';
import { useModalContext } from 'context/ModalContext';

import Modal from 'ui/Modal';

import Input from 'components/Form/FormFields/Input';
import Select from 'components/Form/FormFields/Select';

const CreateForm: React.FC = () => {
  const { setOpen } = useModalContext();

  const queryClient = useQueryClient();
  const { mutateAsync: addUserRole } = useAddUserRole();

  const handleSubmit = async (values: FormikValues) => {
    await addUserRole({
      data: {
        email: values.email,
        role: values.role,
      },
    });

    setOpen(false);
    queryClient.invalidateQueries('getUserRoleList');
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
              <FormattedMessage
                defaultMessage="Save"
              />
            </Button>
          </Box>
        </Modal.Actions>
      </Form>
    </Formik>
  );
};

export default CreateForm;
