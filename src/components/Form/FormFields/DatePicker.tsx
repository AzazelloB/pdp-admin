import { useField } from 'formik';
import { DatePicker as DatePickerUI } from '@mui/x-date-pickers/DatePicker';

interface DatePickerProps extends React.ComponentProps<typeof DatePickerUI> {
  name: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ name, ...props }) => {
  const [{ onChange, ...rest }] = useField(name);

  const handleChange = (value: any) => {
    onChange({
      target: {
        name,
        value: value.toISOString(),
      },
    });
  };

  return (
    <DatePickerUI
      {...props}
      {...rest}
      onChange={handleChange}
    />
  );
};

export default DatePicker;
