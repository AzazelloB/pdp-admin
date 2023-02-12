import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import { AsProp } from 'utils/asPropType';

interface FieldProps {
  label: string;
  helperText?: string;
}

const Field = <T extends React.ElementType>({
  as: Component,
  label,
  helperText,
  ...props
}: Required<Pick<AsProp<T, FieldProps>, 'as'>> & Omit<AsProp<T, FieldProps>, 'as'>) => {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>

      <Component {...props} />

      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default Field;
