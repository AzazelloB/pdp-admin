import {
  Box,
  Button,
  MenuItem,
  TextField,
} from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Formik, Form,
} from 'formik';
import { useQueryClient } from 'react-query';

import { AssignTemplateData, useAssignTemplate, useTemplates } from 'api/pdpForms';
import { useModalContext } from 'context/ModalContext';

import Modal from 'ui/Modal';

import Select from 'components/Form/FormFields/Select';
import Autocomplete from 'components/Form/FormFields/Autocomplete';
import Field from 'components/Form/Field';
import DatePicker from 'components/Form/FormFields/DatePicker';
import { useUsers } from 'api/user';

const AssignForm: React.FC = () => {
  const intl = useIntl();

  const { setOpen } = useModalContext();

  const queryClient = useQueryClient();
  const { mutateAsync } = useAssignTemplate();

  const { data: templates } = useTemplates();
  const { data: users } = useUsers();

  const templateOptions = templates?.map(({ id, name }) => ({
    value: id,
    label: name,
  })) || [];
  const userOptions = users?.map(({ uid, displayName }) => ({
    value: uid,
    label: displayName,
  })) || [];

  const handleSubmit = async (values: AssignTemplateData) => {
    await mutateAsync({
      data: values,
    });

    setOpen(false);
    queryClient.invalidateQueries('getPDPForms');
  };

  return (
    <Formik
      initialValues={{
        templateId: '',
        userId: '',
        from: null,
        to: null,
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field
          as={Select}
          name="templateId"
          fullWidth
          label={intl.formatMessage({
            defaultMessage: 'Template',
          })}
          variant="filled"
          sx={{
            mt: 1,
            mb: 0.5,
          }}
        >
          {templateOptions.map(({ value, label }) => (
            <MenuItem key={value} value={value}>{label}</MenuItem>
          ))}
        </Field>

        <Autocomplete
          name="userId"
          options={userOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label={intl.formatMessage({
                defaultMessage: 'Assign to',
              })}
              margin="dense"
              variant="filled"
            />
          )}
        />

        <Box mt={1}>
          <DatePicker
            name="from"
            label={intl.formatMessage({
              defaultMessage: 'From',
            })}
            sx={{
              mr: 1,
            }}
          />

          <DatePicker
            name="to"
            label={intl.formatMessage({
              defaultMessage: 'To',
            })}
          />
        </Box>

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

export default AssignForm;
