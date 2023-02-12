import {
  Formik,
  Form as FormikForm,
  FormikValues,
  FormikHelpers,
} from 'formik';

import { PDPTemplate } from 'api/pdpForms';

import Input from 'components/Form/FormFields/Input';
import Field from 'components/Form/Field';
import { Box } from '@mui/material';

interface FormProps<T extends FormikValues> {
  template: PDPTemplate;
  initialValues: T;
  onSumbit: (values: T, formikHelpers: FormikHelpers<T>) => void;
}

const Form = <T extends FormikValues>({ template, initialValues, onSumbit }: FormProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSumbit}
    >
      <FormikForm>
        {template.tabs.map((tab) => (
          <div key={tab.name}>
            {tab.name}

            <Box
              display="grid"
              gridTemplateColumns="max-content auto"
              gap={6}
              alignItems="center"
            >
              {tab.categories.map((category) => (
                <>
                  <span>{category.name}</span>

                  <Box
                    display="flex"
                    justifyContent="space-around"
                  >
                    {category.skills.map((skill) => (
                      <Field
                        key={skill}
                        as={Input}
                        name={skill}
                        label={skill}
                      />
                    ))}
                  </Box>
                </>
              ))}
            </Box>
          </div>
        ))}
      </FormikForm>
    </Formik>
  );
};

export default Form;
