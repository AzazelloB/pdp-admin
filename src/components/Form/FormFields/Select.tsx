import { useField } from 'formik';
import SelectUI from '@mui/material/Select';

interface SelectProps extends React.ComponentProps<typeof SelectUI> {
  name: string;
}

const Select: React.FC<SelectProps> = ({ name, ...props }) => {
  const [field] = useField(name);

  return (
    <SelectUI
      {...field}
      fullWidth
      variant="filled"
      {...props}
    />
  );
};

export default Select;
