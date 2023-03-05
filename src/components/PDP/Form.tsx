import { FormattedMessage, useIntl } from 'react-intl';
import {
  Formik,
  Form as FormikForm,
  FormikHelpers,
} from 'formik';
import { Box, Button, MenuItem } from '@mui/material';

import { PDPForm } from 'api/pdpForms';
import { EVALUATION } from 'constants/evaluation';

import VerticalTabs from 'ui/VerticalTabs/VerticalTabs';

import Field from 'components/Form/Field';
import Select from 'components/Form/FormFields/Select';

interface FormProps {
  form: PDPForm;
  onSumbit: (values: PDPForm, formikHelpers: FormikHelpers<PDPForm>) => void;
}

const Form: React.FC<FormProps> = ({ form, onSumbit }) => {
  const intl = useIntl();

  return (
    <Formik
      initialValues={form}
      onSubmit={onSumbit}
    >
      <FormikForm>
        <VerticalTabs defaultActiveTabId={form.tabs[0].name}>
          {form.tabs.map((tab, tabIndex) => (
            <VerticalTabs.Tab
              key={tab.name}
              id={tab.name}
              label={tab.name}
            >
              {tab.categories.map((category, categoryIndex) => (
                <Box
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
                  >
                    {category.skills.map((skill, skillIndex) => (
                      <>
                        <span>{skill.name}</span>

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

                        <div>
                          {skill.notes.map((note) => (
                            <div
                              key={note}
                            >
                              {note}
                            </div>
                          ))}
                        </div>
                      </>
                    ))}
                  </Box>
                </Box>
              ))}
            </VerticalTabs.Tab>
          ))}
        </VerticalTabs>

        <Box display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained">
            <FormattedMessage
              defaultMessage="Save"
            />
          </Button>
        </Box>
      </FormikForm>
    </Formik>
  );
};

export default Form;
