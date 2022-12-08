import { useField } from 'formik';
import InputUI from '@mui/material/FilledInput';

interface InputProps extends React.ComponentProps<typeof InputUI> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...props }) => {
  const [field] = useField(name);

  return (
    <InputUI
      {...field}
      fullWidth
      {...props}
    />
  );
};

export default Input;
