import { useField } from 'formik';
import AutocompleteUI from '@mui/material/Autocomplete';

interface Option {
  value: number | string;
  label: string;
}

interface AutocompleteProps extends React.ComponentProps<typeof AutocompleteUI> {
  name: string;
  options: Option[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({ name, options, ...props }) => {
  // don't sends onChange
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ onChange, value, ...rest }, , { setValue }] = useField(name);

  const handleChange = (_: any, { value: newValue }: any) => {
    setValue(newValue);
  };

  return (
    <AutocompleteUI
      fullWidth
      {...props}
      {...rest}
      options={options}
      value={options.find((option) => option.value === value)?.label || null}
      onChange={handleChange}
    />
  );
};

export default Autocomplete;
