import { useIntl } from 'react-intl';
import { Box, MenuItem } from '@mui/material';

import { Tab } from 'api/pdpForms';
import { EVALUATION } from 'constants/evaluation';
import { useUser } from 'hooks/useUser';

import VerticalTabs from 'ui/VerticalTabs';

import Field from 'components/Form/Field';
import Select from 'components/Form/FormFields/Select';

import Notes from './Notes';

interface DynamicTabProps {
  userId: string;
  tab: Tab;
  tabIndex: number;
}

const DynamicTab: React.FC<DynamicTabProps> = ({
  userId,
  tab,
  tabIndex,
}) => {
  const intl = useIntl();
  const user = useUser();

  return (
    <VerticalTabs.Tab
      key={tab.name}
      id={tab.name}
      label={tab.name}
    >
      {tab.categories.map((category, categoryIndex) => (
        <Box
          key={category.name}
          display="flex"
          flexGrow={1}
          p={2}
          mb={2}
          border={1}
          borderColor="divider"
        >
          <Box
            borderRight={1}
            borderColor="divider"
            pr={2}
            mr={2}
          >
            {category.name}
          </Box>

          <Box
            display="grid"
            gridTemplateColumns="max-content minmax(220px, auto) minmax(220px, auto) auto"
            alignItems="center"
            columnGap={6}
            rowGap={2}
            width="100%"
          >
            {category.skills.map((skill, skillIndex) => (
              <>
                <span>{skill.name}</span>

                {userId === user?.uid ? (
                  <Field
                    as={Select}
                    name={`tabs[${tabIndex}].categories[${categoryIndex}].skills[${skillIndex}].userEval`}
                    value={skill.userEval}
                    label={intl.formatMessage({
                      defaultMessage: 'Self evaluation',
                    })}
                  >
                    {Object.values(EVALUATION).map((evaluation) => (
                      <MenuItem
                        key={evaluation}
                        value={evaluation}
                      >
                        {evaluation}
                      </MenuItem>
                    ))}
                  </Field>
                ) : (
                  <div>{skill.userEval}</div>
                )}

                {userId !== user?.uid ? (
                  <Field
                    as={Select}
                    name={`tabs[${tabIndex}].categories[${categoryIndex}].skills[${skillIndex}].supervisorEval`}
                    value={skill.supervisorEval}
                    label={intl.formatMessage({
                      defaultMessage: 'Supervisor evaluation',
                    })}
                  >
                    {Object.values(EVALUATION).map((evaluation) => (
                      <MenuItem
                        key={evaluation}
                        value={evaluation}
                      >
                        {evaluation}
                      </MenuItem>
                    ))}
                  </Field>
                ) : (
                  <div>{skill.supervisorEval}</div>
                )}

                <div>
                  <Notes
                    tabIndex={tabIndex}
                    categoryIndex={categoryIndex}
                    skillIndex={skillIndex}
                    notes={skill.notes}
                  />
                </div>
              </>
            ))}
          </Box>
        </Box>
      ))}
    </VerticalTabs.Tab>
  );
};

export default DynamicTab;
