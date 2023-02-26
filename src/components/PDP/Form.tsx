import { useIntl } from 'react-intl';
import {
  Formik,
  Form as FormikForm,
  FormikValues,
  FormikHelpers,
} from 'formik';
import { Box, Button, MenuItem } from '@mui/material';

import { PDPTemplate } from 'api/pdpForms';
import { EVALUATION } from 'constants/evaluation';

import VerticalTabs from 'ui/VerticalTabs/VerticalTabs';

import Field from 'components/Form/Field';
import Select from 'components/Form/FormFields/Select';

interface FormProps<T extends FormikValues> {
  template: PDPTemplate;
  initialValues: T;
  onSumbit: (values: T, formikHelpers: FormikHelpers<T>) => void;
}

const Form = <T extends FormikValues>({ template, initialValues, onSumbit }: FormProps<T>) => {
  const intl = useIntl();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSumbit}
    >
      <FormikForm>
        <VerticalTabs defaultActiveTabId={template.tabs[0].name}>
          {template.tabs.map((tab) => (
            <VerticalTabs.Tab
              key={tab.name}
              id={tab.name}
              label={tab.name}
            >
              {tab.categories.map((category) => (
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
                    gridTemplateColumns="max-content minmax(198px, auto)"
                    alignItems="center"
                    columnGap={6}
                    rowGap={2}
                  >
                    {category.skills.map((skill) => (
                      <>
                        <span>{skill}</span>

                        <Field
                          as={Select}
                          name={`${category.name}.${skill}`}
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
                      </>
                    ))}
                  </Box>
                </Box>
              ))}
            </VerticalTabs.Tab>
          ))}
        </VerticalTabs>

        <Button type="submit">Submit</Button>
      </FormikForm>
    </Formik>
  );
};

export default Form;
