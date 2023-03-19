import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import useDebounce from 'hooks/useDebounce';

interface AutoSaveProps {
  debounce: number;
}

const AutoSave: React.FC<AutoSaveProps> = ({ debounce }) => {
  const {
    values,
    initialValues,
    submitForm,
    setSubmitting,
  } = useFormikContext();

  const debouncedValues = useDebounce(values, debounce);

  useEffect(() => {
    if (JSON.stringify(initialValues) === JSON.stringify(debouncedValues)) {
      return;
    }

    (async () => {
      setSubmitting(true);
      await submitForm();
      setSubmitting(false);
    })();
  }, [debouncedValues, initialValues, submitForm, setSubmitting]);

  return null;
};

export default AutoSave;
