import {
  Formik,
  Form as FormikForm,
  FormikHelpers,
} from 'formik';

import { PDPForm } from 'api/pdpForms';

import VerticalTabs from 'ui/VerticalTabs';

import AutoSave from 'components/Form/AutoSave';
import DynamicTab from './DynamicTab';
import GeneralTab from './GeneralTab';
import ResultTab from './ResultTab';

interface FormProps {
  form: PDPForm;
  onSumbit: (values: PDPForm, formikHelpers: FormikHelpers<PDPForm>) => void;
}

const Form: React.FC<FormProps> = ({ form, onSumbit }) => {
  return (
    <Formik
      initialValues={form}
      onSubmit={onSumbit}
    >
      <FormikForm>
        <AutoSave debounce={500} />

        <VerticalTabs defaultActiveTabId={form.tabs[0].name}>
          <GeneralTab form={form} />

          {form.tabs.map((tab, tabIndex) => (
            <DynamicTab tab={tab} tabIndex={tabIndex} />
          ))}

          {new Date() > new Date(form.to) && (
            <ResultTab form={form} />
          )}
        </VerticalTabs>
      </FormikForm>
    </Formik>
  );
};

export default Form;
