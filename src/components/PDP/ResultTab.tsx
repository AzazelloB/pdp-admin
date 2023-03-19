import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, MenuItem } from '@mui/material';

import { PDPForm, useDuplicatePDPForm, useUpdatePDPForm } from 'api/pdpForms';
import { GRADE } from 'constants/grade';

import VerticalTabs from 'ui/VerticalTabs';

import Field from 'components/Form/Field';
import Textarea from 'components/Form/FormFields/Textarea';
import Select from 'components/Form/FormFields/Select';

interface ResultTabProps {
  form: PDPForm;
}

const ResultTab: React.FC<ResultTabProps> = ({
  form,
}) => {
  const intl = useIntl();
  const { formId } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutateAsync: updatePDPForm } = useUpdatePDPForm();
  const { mutateAsync: duplicatePDPForm } = useDuplicatePDPForm();

  const handleDuplicate = async () => {
    await duplicatePDPForm({
      pathParams: {
        id: formId!,
      },
    });

    queryClient.invalidateQueries('getPDPForms');
    navigate('/pdp');
  };

  const handleClose = async () => {
    await updatePDPForm({
      pathParams: {
        id: formId!,
      },
      data: {
        archived: true,
      },
    });

    queryClient.invalidateQueries('getPDPForms');
    navigate('/pdp');
  };

  return (
    <VerticalTabs.Tab
      id="result"
      label={intl.formatMessage({
        defaultMessage: 'Result',
      })}
    >
      <Box
        display="grid"
        gridTemplateColumns="max-content 1fr"
        alignItems="center"
        gap={4}
      >
        <Box>
          <FormattedMessage
            defaultMessage="Feedback to user"
          />
        </Box>

        <Box>
          <Field
            as={Textarea}
            fullWidth
            name="feedback"
            label={intl.formatMessage({
              defaultMessage: 'Type feedback',
            })}
          />
        </Box>

        <Box>
          <FormattedMessage
            defaultMessage="New grade"
          />
        </Box>

        <Box>
          <Field
            as={Select}
            name="level"
            value={form.level}
            label={intl.formatMessage({
              defaultMessage: 'Grade',
            })}
          >
            {Object.values(GRADE).map((evaluation) => (
              <MenuItem
                key={evaluation}
                value={evaluation}
              >
                {evaluation}
              </MenuItem>
            ))}
          </Field>
        </Box>
      </Box>

      <Button
        type="button"
        size="large"
        variant="contained"
        sx={{
          mt: 4,
          mr: 2,
        }}
        onClick={handleDuplicate}
      >
        <FormattedMessage
          defaultMessage="Duplicate"
        />
      </Button>

      <Button
        type="button"
        size="large"
        variant="outlined"
        sx={{
          mt: 4,
        }}
        onClick={handleClose}
      >
        <FormattedMessage
          defaultMessage="Close"
        />
      </Button>
    </VerticalTabs.Tab>
  );
};

export default ResultTab;
