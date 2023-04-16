import { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';

import useDebounce from 'hooks/useDebounce';

interface AutoSaveProps {
  debounce: number;
}

const AutoSave: React.FC<AutoSaveProps> = ({ debounce }) => {
  const {
    values,
    submitForm,
    setSubmitting,
  } = useFormikContext();

  const debouncedValues = useDebounce(values, debounce);
  const prevValues = useRef<unknown | null>(debouncedValues);

  useEffect(() => {
    if (JSON.stringify(prevValues.current) === JSON.stringify(debouncedValues)) {
      return;
    }

    (async () => {
      setSubmitting(true);
      await submitForm();
      prevValues.current = debouncedValues;
      setSubmitting(false);
    })();
  }, [debouncedValues, submitForm, setSubmitting]);

  return null;
};

export default AutoSave;
