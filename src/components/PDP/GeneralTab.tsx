import { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useField } from 'formik';
import { useSearchParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { useUsers, useUsersByIdentifier } from 'api/user';
import { PDPForm } from 'api/pdpForms';
import { useDate } from 'hooks/useDate';
import { strong } from 'utils/intlFormatters';

import VerticalTabs from 'ui/VerticalTabs';

import Field from 'components/Form/Field';
import Input from 'components/Form/FormFields/Input';
import UserList, { Option } from './UserList';

interface GeneralTabProps {
  form: PDPForm;
}

const GeneralTab: React.FC<GeneralTabProps> = ({ form }) => {
  const intl = useIntl();
  const { formatDate } = useDate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [{ value: PMValue }, , { setValue: setPMValue }] = useField<string[]>('projectManagerIds');
  const [{ value: HRValue }, , { setValue: setHRValue }] = useField<string[]>('hrIds');

  const { data: usersData } = useUsers();
  const { data: PMData } = useUsersByIdentifier({
    params: {
      ids: form.projectManagerIds,
    },
  });
  const { data: HRData } = useUsersByIdentifier({
    params: {
      ids: form.hrIds,
    },
  });

  const usersOptions = useMemo(() => usersData?.map((user) => ({
    value: user.uid,
    label: user.email,
  })) || [], [usersData]);

  const PMList = useMemo(() => PMData?.map((user) => ({
    value: user.uid,
    label: user.displayName,
  })) || [], [PMData]);

  const HRList = useMemo(() => HRData?.map((user) => ({
    value: user.uid,
    label: user.displayName,
  })) || [], [HRData]);

  const handleClick = () => {
    searchParams.set('tab', 'result');

    setSearchParams(searchParams);
  };

  const handleAddPM = (option: Option) => {
    setPMValue([
      ...PMValue,
      option.value as string,
    ]);
  };

  const handleRemovePM = (option: Option) => {
    const index = PMValue.indexOf(option.value as string);

    setPMValue([
      ...PMValue.slice(0, index),
      ...PMValue.slice(index + 1),
    ]);
  };

  const handleAddHR = (option: Option) => {
    setHRValue([
      ...HRValue,
      option.value as string,
    ]);
  };

  const handleRemoveHR = (option: Option) => {
    const index = HRValue.indexOf(option.value as string);

    setHRValue([
      ...HRValue.slice(0, index),
      ...HRValue.slice(index + 1),
    ]);
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
        gridTemplateColumns="max-content max-content"
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
            fullWidth
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

        <Box>
          <UserList
            list={PMList}
            onAdd={handleAddPM}
            onRemove={handleRemovePM}
            options={usersOptions}
            label={intl.formatMessage({
              defaultMessage: 'Manager name',
            })}
          />
        </Box>

        <Box>
          <FormattedMessage
            defaultMessage="HR"
          />
        </Box>

        <Box>
          <UserList
            list={HRList}
            onAdd={handleAddHR}
            onRemove={handleRemoveHR}
            options={usersOptions}
            label={intl.formatMessage({
              defaultMessage: 'HR name',
            })}
          />
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
