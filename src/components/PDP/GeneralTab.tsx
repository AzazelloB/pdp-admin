import { FormattedMessage, useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { PDPForm } from 'api/pdpForms';
import { useDate } from 'hooks/useDate';
import { strong } from 'utils/intlFormatters';

import VerticalTabs from 'ui/VerticalTabs';

import Field from 'components/Form/Field';
import Input from 'components/Form/FormFields/Input';

interface GeneralTabProps {
  form: PDPForm;
}

const GeneralTab: React.FC<GeneralTabProps> = ({ form }) => {
  const intl = useIntl();
  const { formatDate } = useDate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    searchParams.set('tab', 'result');

    setSearchParams(searchParams);
  };

  return (
    <VerticalTabs.Tab
      id="general"
      label={intl.formatMessage({
        defaultMessage: 'General',
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
            defaultMessage="Current position"
          />
        </Box>

        <Box>
          {form.level}
        </Box>

        <Box>
          <FormattedMessage
            defaultMessage="Current project"
          />
        </Box>

        <Box>
          <Field
            as={Input}
            name="projectName"
            label={intl.formatMessage({
              defaultMessage: 'Project name',
            })}
          />
        </Box>

        <Box>
          <FormattedMessage
            defaultMessage="Project manager"
          />
        </Box>

        <Box
          display="grid"
          justifyContent="start"
          gap={2}
        >
          {form.projectManagerIds.map((id, i) => (
            <Field
              as={Input}
              key={id}
              name={`projectManagerIds[${i}]`}
              label={intl.formatMessage({
                defaultMessage: 'Manager name',
              })}
            />
          ))}
        </Box>

        <Box>
          <FormattedMessage
            defaultMessage="HR"
          />
        </Box>

        <Box
          display="grid"
          justifyContent="start"
          gap={2}
        >
          {form.hrIds.map((id, i) => (
            <Field
              as={Input}
              key={id}
              name={`hrIds[${i}]`}
              label={intl.formatMessage({
                defaultMessage: 'HR name',
              })}
            />
          ))}
        </Box>

        <Box>
          <FormattedMessage
            defaultMessage="Professtional review period"
          />
        </Box>

        <Box>
          <FormattedMessage
            defaultMessage="From <strong>{from}</strong> - To <strong>{to}</strong>"
            values={{
              from: formatDate(form.from),
              to: formatDate(form.to),
              strong,
            }}
          />
        </Box>
      </Box>

      {new Date() > new Date(form.to) && (
        <Button
          type="button"
          size="large"
          variant="contained"
          sx={{
            mt: 4,
          }}
          onClick={handleClick}
        >
          <FormattedMessage
            defaultMessage="Review"
          />
        </Button>
      )}
    </VerticalTabs.Tab>
  );
};

export default GeneralTab;
